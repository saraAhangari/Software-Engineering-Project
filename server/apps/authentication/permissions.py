from rest_framework import permissions
from rest_framework.exceptions import APIException
from django.core.cache import cache
from rest_framework import status


class GenericAPIException(APIException):
    status_code = status.HTTP_401_UNAUTHORIZED
    default_code = 'error'

    def __init__(self, detail, status_code=None):
        self.detail = detail
        if status_code is not None:
            self.status_code = status_code


class IsNotInBlackedList(permissions.BasePermission):

    def has_permission(self, request, view):
        token = request.headers['Authorization'].split(" ")[1]
        # if not in blacklist
        if cache.get(token) is None:
            return True
        raise GenericAPIException(detail='login first', status_code=status.HTTP_401_UNAUTHORIZED)


class IsPatient(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.user.role.name == 'patient':
            return True
        return False


class IsDoctor(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.user.role.name == 'doctor':
            return True
        return False
