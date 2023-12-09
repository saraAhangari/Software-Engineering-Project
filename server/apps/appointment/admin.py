from django.contrib import admin
from import_export.admin import ImportExportModelAdmin

from .models import Doctor, Speciality, TimeSlice, Assurance, PatientMedicalHistory, Patient, Medicine, Appointment


@admin.register(Doctor)
class DoctorAdmin(admin.ModelAdmin):
    list_display = (
        'id', 'username', 'email', 'description', 'fees', 'slice', 'medical_system_number',
        'display_specialities',)
    list_filter = ('speciality',)

    def display_specialities(self, obj):
        return ", ".join([speciality.name for speciality in obj.speciality.all()])

    display_specialities.short_description = 'Specialities'

    search_fields = ('speciality', 'first_name', 'last_name')
    exclude = ('password', 'groups', 'last_login', 'is_active', 'date_joined', 'is_staff')
    list_per_page = 25

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


@admin.register(Assurance)
class AssuranceAdmin(ImportExportModelAdmin):
    list_display = ('id', 'name')
    list_filter = ('name',)

    class Meta:
        model = Assurance


@admin.register(PatientMedicalHistory)
class PatientMedicalHistoryAdmin(ImportExportModelAdmin):
    fields = ('height', 'weight', 'blood_group', 'blood_pressure')
    list_display = ('id', 'height', 'weight', 'blood_group', 'blood_pressure')
    search_fields = ('blood_group',)
    list_per_page = 25

    class Meta:
        model = PatientMedicalHistory


@admin.register(Patient)
class PatientAdmin(admin.ModelAdmin):
    list_display = ('id', 'username', 'first_name', 'last_name', 'assurance', 'medical_history')
    exclude = ('password', 'groups', 'last_login', 'is_active', 'date_joined', 'is_staff')
    list_per_page = 25

    class Meta:
        model = Patient


@admin.register(Medicine)
class MedicineAdmin(ImportExportModelAdmin):
    list_display = ('id', 'generic_name', 'infant_safe', 'price',)
    search_fields = ('generic_name',)

    class Meta:
        model = Medicine


@admin.register(Appointment)
class AppointmentAdmin(ImportExportModelAdmin):
    list_display = ('id', 'patient_id', 'doctor_id', 'date', 'description', 'status', 'type')
    search_fields = ('type', 'status')
    list_per_page = 25
    list_filter = ('type', 'status')

    class Meta:
        model = Appointment



