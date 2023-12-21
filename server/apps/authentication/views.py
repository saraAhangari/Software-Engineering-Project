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
        serializer = PatientSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user_phone_no = serializer.data.get('phone_no')

        if cache.get(user_phone_no) is not None:
            return Response({
                'ok': False,
                'message': 'otp has already been sent.'
            }, status=status.HTTP_400_BAD_REQUEST)

        # send the otp and cache it in redis
        send_otp(user_phone_no)

        return Response({
            'ok': True,
            'message': 'otp sent to the user'
        }, status=status.HTTP_200_OK)


@extend_schema(tags=['authentication'])
class RegisterView(generics.CreateAPIView):
    serializer_class = PatientSerializer

    def post(self, request, *args, **kwargs):
        serializer = PatientSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user_otp = request.data.get('otp')
        valid_otp = cache.get(request.data['phone_no'])

        print(user_otp, valid_otp)

        if user_otp is None:
            return Response({
                'ok': False,
                'message': 'otp not provided'
            }, status=status.HTTP_400_BAD_REQUEST)

        if valid_otp is None:
            return Response({
                'ok': False,
                'message': 'first call get otp function'
            }, status=status.HTTP_400_BAD_REQUEST)

        if int(user_otp) != int(valid_otp):
            return Response({
                'ok': False,
                'message': 'otp is not correct'
            }, status=status.HTTP_400_BAD_REQUEST)

        serializer.save()
        return Response(serializer.data)


@extend_schema(tags=['authentication'])
class LoginView(generics.CreateAPIView):
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user_national_id = serializer.data['national_id']
        user = User.objects.get(national_id=user_national_id)

        if not send_otp(user.phone_no):
            return Response({
                'ok': False,
                'message': 'cant send otp'
            }, status=status.HTTP_503_SERVICE_UNAVAILABLE)

        return Response({
            'ok': True,
            'message': 'otp sent to the user'
        }, status=status.HTTP_200_OK)


@extend_schema(tags=['authentication'])
class GetTokenView(generics.CreateAPIView):
    serializer_class = GetTokenSerializer

    def post(self, request, *args, **kwargs):
        serializer = GetTokenSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user_national_id = serializer.data['national_id']
        user_otp = int(serializer.data['otp'])

        user = User.objects.filter(national_id=user_national_id).first()
        valid_otp = cache.get(user.phone_no)

        if valid_otp is None:
            return Response({
                'ok': False,
                'message': 'login first'
            }, status=status.HTTP_400_BAD_REQUEST)

        if valid_otp != user_otp:
            return Response({
                'ok': False,
                'message': 'otp is not correct'
            }, status=status.HTTP_400_BAD_REQUEST)

        response = Response()

        refresh = RefreshToken.for_user(user)
        access = str(refresh.access_token)

        response.data = {
            'national_id': user_national_id,
            'refresh_token': str(refresh),
            'access_token': access
        }

        return response


@extend_schema(tags=['authentication'], request=None, responses={
    201: OpenApiResponse(description='user logged out successfully'),
    400: OpenApiResponse(description='login first'),
})
class LogoutView(generics.CreateAPIView):
    permission_classes = (IsAuthenticated, IsNotInBlackedList,)

    def post(self, request, *args, **kwargs):
        try:
            token = request.headers['Authorization'].split(" ")[1]
            blocked = cache.get(token)
            if blocked is not None and blocked:
                return Response({
                    'ok': False,
                    'message': 'login first'
                }, status=status.HTTP_400_BAD_REQUEST)

            cache.set(token, True, 5 * 60)
            return Response({
                'ok': True,
                'message': 'user logged out successfully'
            }, status=status.HTTP_200_OK)

        except Exception as e:
            print(e)
            # Handle any exceptions that might occur during the logout process
            return Response({'detail': 'An error occurred during logout.'},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@extend_schema(tags=['role'])
class RoleView(generics.CreateAPIView):
    serializer_class = RoleSerializer
    queryset = Role.objects.all()

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data)

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

        return Response({
            'ok': True,
            'message': 'role deleted'
        })

    def put(self, request, pk, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        role = get_object_or_404(self.queryset, id=pk)
        role.name = request.data.get('name')
        role.save()
        return Response({'ok': True, 'message': 'updated successfully'})
