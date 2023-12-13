from django.core.cache import cache
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status
from apps.appointment.models import Patient
from .models import Role
from .serializers import PatientSerializer, LoginSerializer, GetTokenSerializer, RoleSerializer
from .utils import send_otp
from rest_framework.permissions import IsAuthenticated
from .permissions import IsNotInBlackedList
from rest_framework import generics
from django.shortcuts import get_object_or_404
from drf_spectacular.utils import extend_schema, extend_schema_serializer, OpenApiResponse, OpenApiRequest


@extend_schema(tags=['Authentication'])
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
            }, status=400)

        # send the otp and cache it in redis
        send_otp(user_phone_no)

        return Response({
            'ok': True,
            'message': 'otp sent to the user'
        }, status=200)


@extend_schema(tags=['Authentication'])
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
            }, status=400)

        if valid_otp is None:
            return Response({
                'ok': False,
                'message': 'first call get otp function'
            }, status=400)

        if int(user_otp) != int(valid_otp):
            return Response({
                'ok': False,
                'message': 'otp is not correct'
            }, status=400)

        serializer.save()
        return Response(serializer.data)


@extend_schema(tags=['Authentication'])
class LoginView(generics.CreateAPIView):
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = Patient.objects.get(national_id=serializer.data['national_id'])

        if not send_otp(user.phone_no):
            return Response({
                'ok': False,
                'message': 'cant send otp'
            })

        return Response({
            'ok': True,
            'message': 'otp sent to the user'
        })


@extend_schema(tags=['Authentication'])
class GetTokenView(generics.CreateAPIView):
    serializer_class = GetTokenSerializer

    def post(self, request, *args, **kwargs):
        serializer = GetTokenSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        national_id = serializer.data['national_id']
        user_otp = int(serializer.data['otp'])

        patient = Patient.objects.filter(national_id=national_id).first()
        valid_otp = cache.get(patient.phone_no)

        if valid_otp is None:
            return Response({
                'ok': False,
                'message': 'login first'
            })

        if valid_otp != user_otp:
            return Response({
                'ok': False,
                'message': 'otp is not correct'
            })

        response = Response()

        refresh = RefreshToken.for_user(patient)
        access = str(refresh.access_token)

        response.data = {
            'refresh_token': str(refresh),
            'access_token': access
        }

        return response


@extend_schema(tags=['Authentication'], request=None, responses={
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

            cache.set(token, True, 5 * 24 * 60 * 60)
            return Response({
                'ok': True,
                'message': 'user logged out successfully'
            })

        except Exception as e:
            print(e)
            # Handle any exceptions that might occur during the logout process
            return Response({'detail': 'An error occurred during logout.'},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@extend_schema(tags=['Role'])
class RoleView(generics.CreateAPIView):
    serializer_class = RoleSerializer
    queryset = Role.objects.all()

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data)

    def get(self, request, pk=None):
        serializer = self.serializer_class(self.queryset.all(), many=True)
        if pk:
            serializer = self.serializer_class(get_object_or_404(self.queryset, id=pk))

        return Response(serializer.data)

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
