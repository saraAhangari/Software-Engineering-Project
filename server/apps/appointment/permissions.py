from rest_framework import permissions

from apps.appointment.models import Appointment


class IsPermittedToComment(permissions.BasePermission):
    message = 'شما فقط میتوانید برای پزشکانی که یک نوبت تمام شده دارید کامنت بگذارید.'
    def has_permission(self,  request, view):
        doctor_id = view.kwargs.get('doctor_id')
        try:
            Appointment.objects.get(doctor_id=doctor_id, patient_id=request.user.id
                                    , status='completed')
            return True
        except Appointment.DoesNotExist:
            return False
