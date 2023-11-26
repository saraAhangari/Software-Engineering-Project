from rest_framework import permissions
import jwt
from hospitalAppointment.settings import SECRET_KEY
from apps.authentication.models import Role


class IsDoctor(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.user.role.name == 'doctor':
            return True
        return False


class IsPatient(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.user.role.name == 'patient':
            return True
        return False
