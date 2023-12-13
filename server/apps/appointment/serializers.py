from rest_framework import serializers
from .models import Doctor, Speciality, Comment, PatientMedicalHistory, Assurance, Appointment


class SpecialitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Speciality
        fields = '__all__'


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ['doctor_id', 'patient_id', 'treatment_experience', 'point']


class DoctorSerializer(serializers.ModelSerializer):
    speciality = serializers.SerializerMethodField()

    def get_speciality(self, obj):
        return SpecialitySerializer(obj.speciality.all(), many=True).data

    class Meta:
        model = Doctor
        fields = ['id', 'first_name', 'last_name', 'national_id', 'description', 'fees', 'medical_system_number',
                  'speciality', 'phone_no', 'birthdate', 'gender', 'comments']


class DoctorListSerializer(serializers.ModelSerializer):
    speciality = SpecialitySerializer(many=True)

    def get_speciality(self, obj):
        return SpecialitySerializer(obj.speciality.all(), many=True).data

    class Meta:
        model = Doctor
        fields = ['id', 'first_name', 'last_name', 'national_id', 'description', 'fees', 'medical_system_number',
                  'speciality', 'phone_no', 'birthdate', 'gender']


class MedicalHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = PatientMedicalHistory
        fields = '__all__'


class AppointmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointment
        fields = ['patient_id', 'doctor_id', 'date', 'description', 'status', 'type']


class AssuranceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Assurance
        fields = '__all__'
