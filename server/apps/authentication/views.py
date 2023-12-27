from django.core.cache import cache
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status
from apps.appointment.models import User
from .models import Role
from .serializers import PatientSerializer, LoginSerializer, GetTokenSerializer, RoleSerializer
from .utils import send_otp
from rest_framework.permissions import IsAuthenticated
from .permissions import IsNotInBlackedList
from rest_framework import generics
from django.shortcuts import get_object_or_404
from drf_spectacular.utils import extend_schema, OpenApiResponse


@extend_schema(tags=['authentication'])
class PatientValidationView(generics.CreateAPIView):
    serializer_class = PatientSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        user_phone_no = serializer.data.get('phone_no')

        if cache.get(user_phone_no) is not None:
            ttl = cache.ttl(user_phone_no)
            return Response({
                'message': f'کد یکبار مصرف قبلا برای شما ارسال شده است. {ttl} ثانیه دیگر میتوانید دوباره امتحان کنید. ',
                'ttl': ttl}, status=status.HTTP_400_BAD_REQUEST)

        # send the otp and cache it in redis
        send_otp(user_phone_no)

        return Response({'message': 'کد یکبار مصرف ارسال شد.'}, status=status.HTTP_200_OK)


@extend_schema(tags=['authentication'])
class RegisterView(generics.CreateAPIView):
    serializer_class = PatientSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)

        user_otp = request.data.get('otp', None)
        valid_otp = cache.get(serializer.validated_data.get('phone_no'))

        if user_otp is None:
            return Response({'message': 'کد یکبار مصرف وارد نشده است.'}, status=status.HTTP_400_BAD_REQUEST)

        if valid_otp is None:
            return Response({'message': 'دوباره درخواست کد یکبار مصرف داشته باشید.'},
                            status=status.HTTP_400_BAD_REQUEST)
        try:
            if int(user_otp) != int(valid_otp):
                return Response({'message': 'کد وارد شده صحیح نمیباشد.'},
                                status=status.HTTP_400_BAD_REQUEST)
        except:
            return Response({'message': 'کد وارد شده باید عدد باشد.'},
                            status=status.HTTP_400_BAD_REQUEST)

        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)


@extend_schema(tags=['authentication'])
class LoginView(generics.CreateAPIView):
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)

        user_national_id = serializer.data.get('national_id')
        user = User.objects.get(national_id=user_national_id)

        if not send_otp(user.phone_no):
            return Response({'message': 'مشکلی پیش آمده. بعدا دوباره تلاش کنین.'}, status=status.HTTP_503_SERVICE_UNAVAILABLE)

        return Response({'message': 'کد یکبار مصرف ارسال شد.'}, status=status.HTTP_200_OK)


@extend_schema(tags=['authentication'])
class GetTokenView(generics.CreateAPIView):
    serializer_class = GetTokenSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)

        try:
            user_national_id = serializer.data.get('national_id')
            user_otp = int(serializer.data['otp'])
        except Exception as e:
            print(e)
            return Response({'message': 'قرمت کد وارد شده صحیح نیست.'}, status=status.HTTP_400_BAD_REQUEST)

        user = User.objects.filter(national_id=user_national_id).first()
        valid_otp = cache.get(user.phone_no)

        # TODO: create a class OTP and make functionality
        if valid_otp is None:
            return Response({'message': 'ایتدا ثبتنام کنید.'}, status=status.HTTP_400_BAD_REQUEST)

        if valid_otp != user_otp:
            return Response({'message': 'کد وارد شده صحیح نیست.'}, status=status.HTTP_400_BAD_REQUEST)

        response = Response()

        refresh = RefreshToken.for_user(user)
        access = str(refresh.access_token)

        response.set_cookie('Authorization', access)
        response.data = {
            'national_id': user_national_id,
            'refresh_token': str(refresh),
            'access_token': access
        }

        return response


@extend_schema(tags=['authentication'], request=None, responses={
    201: OpenApiResponse(description='با موفقیت خارج شدید.'),
    400: OpenApiResponse(description='ابتدا لاگین کنید.'),
})
class LogoutView(generics.CreateAPIView):
    permission_classes = (IsAuthenticated, IsNotInBlackedList,)

    def post(self, request, *args, **kwargs):
        try:
            token = request.headers['Authorization'].split(" ")[1]
            blocked = cache.get(token)
            if blocked is not None and blocked:
                return Response({
                    'message': 'ابتدا ثبتنام کنید.'
                }, status=status.HTTP_400_BAD_REQUEST)

            cache.set(token, True, 5 * 60)
            return Response({'message': 'با موفقیت خارج شدید.'}, status=status.HTTP_200_OK)

        except Exception as e:
            print(e)
            # Handle any exceptions that might occur during the logout process
            return Response({'detail': 'مشکلی پیش آمده.'},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@extend_schema(tags=['role'])
class RoleView(generics.CreateAPIView):
    serializer_class = RoleSerializer
    queryset = Role.objects.all()

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def get(self, request, pk=None):
        response = Response()
        serializer = self.serializer_class(self.queryset.all(), many=True)
        response.data = {'roles': serializer.data}
        if pk:
            serializer = self.serializer_class(get_object_or_404(self.queryset, id=pk))
            response.data = serializer.data

        return response

    def delete(self, request, pk=None, *args, **kwargs):
        get_object_or_404(self.queryset, id=pk).delete()

        return Response({'message': 'نقش با موفقیت حذف شد.'})

    def put(self, request, pk, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        new_name = serializer.data.get('name')
        role = get_object_or_404(self.queryset, id=pk)
        if role.name != new_name:
            role.name = new_name
        role.save()

        return Response({'message': 'نقش با موفقیت بروز شد.'}, status=status.HTTP_200_OK)
