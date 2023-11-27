import datetime

from rest_framework.authtoken.models import Token
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from hospitalAppointment.settings import SECRET_KEY
from apps.authentication.serializers import UserSerializer
from apps.authentication.models import User, Role
from apps.authentication.utils import generate_confirmation_number
from rest_framework_simplejwt.tokens import RefreshToken
from django.core.cache import cache
from .models import Assurance


class AssuranceView(APIView):
    def post(self, request):
        name = request.data['name']
        if name is None:
            return Response({
                'ok': False,
                'message': 'name not found'
            })

        obj = Assurance.objects.filter(name=name).first()
        if obj is not None:
            return Response({
                'ok': False,
                'message': 'duplicate name in database'
            })

        Assurance.objects.create(name=name).save()

        return Response({
            'ok': True,
            'message': 'assurance added'
        })

    def get(self, request):
        assurances = []
        for assurance in Assurance.objects.all():
            assurances.append({
                'id': assurance.id,
                'name': assurance.name
            })

        return Response({
            'assurances': assurances
        })

    def delete(self, request):
        pass






