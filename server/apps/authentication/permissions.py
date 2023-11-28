from rest_framework import permissions
import jwt
from hospitalAppointment.settings import SECRET_KEY
from apps.authentication.models import Role
from django.core.cache import cache


class IsDoctor(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.user.role.name == 'doctor':
            return True
        return False


class IsNotInBlackedList(permissions.BasePermission):
    def has_permission(self, request, view):
        token = request.headers['Authorization'].split(" ")[1]

        # if not in blacklist
        if cache.get(token) is None:
            return True
        return False


class IsPatient(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.user.role.name == 'patient':
            return True
        return False
