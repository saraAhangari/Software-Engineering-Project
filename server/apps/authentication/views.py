import datetime

import jwt
import environ
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from .serializers import UserSerializer
from .models import User


class RegisterView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)


class LoginView(APIView):
    def post(self, request):
        email = request.data['email']
        password = request.data['password']

        user = User.objects.filter(email=email).first()
        if user is None:
            raise AuthenticationFailed('user not found')

        if not user.check_password(password):
            raise AuthenticationFailed('password not correct')

        payload = {
            'id': user.id,
            'role': user.role,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=48),
            'iat': datetime.datetime.utcnow()
        }

        env = environ.Env()
        token = jwt.encode(payload, env('SECRET_KEY'), algorithm='HS256')

        response = Response()

        response.data = {
            'ok': True,
            'token': token
        }

        response.set_cookie('jwt_token', token)

        return response
