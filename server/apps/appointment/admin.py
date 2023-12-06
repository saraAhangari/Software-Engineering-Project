from django.contrib import admin
from .models import Doctor, Speciality
from ..authentication.models import Role


class DoctorAdmin(admin.ModelAdmin):
    list_display = (
        'id', 'username', 'email', 'description', 'fees', 'medical_system_number', 'display_specialities')
    list_filter = ('speciality',)

    def display_specialities(self, obj):
        return ", ".join([speciality.name for speciality in obj.speciality.all()])

    display_specialities.short_description = 'Specialities'


class SpecialityAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')


admin.site.register(Speciality, SpecialityAdmin)
admin.site.register(Doctor, DoctorAdmin)
