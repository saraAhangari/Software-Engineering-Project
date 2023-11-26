from rest_framework import permissions
import jwt
from hospitalAppointment.settings import SECRET_KEY
from apps.authentication.models import Role


class IsDoctor(permissions.BasePermission):
    def has_permission(self, request, view):
        try:
            cookie = request.COOKIES.get('jwt_token')
            payload = jwt.decode(cookie, SECRET_KEY, algorithms=["HS256"])

            if payload['role'] == 'doctor':
                return True
            return False
        except:
            return False


class IsPatient(permissions.BasePermission):
    def has_permission(self, request, view):
        try:
            cookie = request.COOKIES.get('jwt_token')
            payload = jwt.decode(cookie, SECRET_KEY, algorithms=["HS256"])

            if payload['role'] == 'patient':
                return True
            return False
        except:
            return False
