from django.contrib import admin
from import_export.admin import ImportExportModelAdmin

from .models import Doctor, Speciality, TimeSlice
from ..authentication.models import Role


@admin.register(Doctor)
class DoctorAdmin(admin.ModelAdmin):
    list_display = (
        'id', 'username', 'email', 'description', 'fees', 'slice', 'medical_system_number',
        'display_specialities',)
    list_filter = ('speciality', )

    def display_specialities(self, obj):
        return ", ".join([speciality.name for speciality in obj.speciality.all()])

    display_specialities.short_description = 'Specialities'

    search_fields = ('speciality', 'first_name', 'last_name')
    exclude = ('password', 'groups', 'last_login', 'is_active', 'date_joined', 'is_staff')

    class Meta:
        model = Doctor


@admin.register(Speciality)
class SpecialityAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')
    search_fields = ('id', 'name')

    class Meta:
        model = Speciality


@admin.register(TimeSlice)
class TimeSliceAdmin(ImportExportModelAdmin):
    list_display = ('id', 'date', 'start', 'end', 'status')
    list_filter = ('date', 'status')
    search_fields = ('date', 'start', 'end', 'status')

    class Meta:
        model = TimeSlice
