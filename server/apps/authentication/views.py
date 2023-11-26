import datetime

from rest_framework.authtoken.models import Token
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from hospitalAppointment.settings import SECRET_KEY
from .serializers import UserSerializer
from .models import User
from .utils import generate_confirmation_number
from rest_framework_simplejwt.tokens import RefreshToken
from django.core.cache import cache


class RegisterView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)


class GetToken(APIView):
    def post(self, request):
        national_id = request.data['national_id']
        user_otp = int(request.data['otp'])

        user = User.objects.filter(national_id=national_id).first()
        if user is None:
            raise AuthenticationFailed('user not found')

        valid_otp = cache.get(user.phone_no)

        if valid_otp != user_otp:
            raise AuthenticationFailed('otp not correct')

        response = Response()

        refresh = RefreshToken.for_user(user)
        response.data = {
            'access_token': str(refresh.token),
            'refresh_token': str(refresh.access_token)
        }

        return response


class LogoutView(APIView):
    def post(self, request):
        response = Response()
        cookie = request.COOKIES.get('jwt_token')
        if cookie is None:
            response.data = {
                'ok': False,
                'message': 'login first'
            }
            return response

        response.delete_cookie('jwt_token')
        response.data = {
            'ok': True,
            'message': 'user logged out'
        }

        return response


class OtpGenerator(APIView):
    def post(self, request):
        national_id = request.data['national_id']
        if national_id is None:
            raise AuthenticationFailed('national_id not found')

        user = User.objects.filter(national_id=national_id).first()
        if user is None:
            raise AuthenticationFailed('user not found')

        confirmation_code = generate_confirmation_number()

        print(f'otp code is {confirmation_code}')  # TODO
        cache.set(user.phone_no, confirmation_code, 120)

        return Response({
            'ok': True,
            'message': 'otp sent to the user phone number'
        })
