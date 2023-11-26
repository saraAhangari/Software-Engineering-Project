from django.contrib import admin

from apps.appointment.models import Doctor, Speciality
from apps.authentication.models import Role


# Register your models here.
class DoctorAdmin(admin.ModelAdmin):
    class Meta:
        model = Doctor
        list_display = ("first_name", "last_name", "speciality", "medical_system_number", "fees", "slice")
        list_filter = "_all_"


class SpecialityAdmin(admin.ModelAdmin):
    class Meta:
        model = Speciality
        list_display = [field.name for field in Speciality._meta.get_fields()]
        list_filter = [field.name for field in Speciality._meta.get_fields()]


class RoleAdmin(admin.ModelAdmin):
    class Meta:
        model = Role
        list_display = [field.name for field in Speciality._meta.get_fields()]
        list_filter = [field.name for field in Speciality._meta.get_fields()]


admin.site.register(Doctor)
admin.site.register(Speciality)
admin.site.register(Role)
