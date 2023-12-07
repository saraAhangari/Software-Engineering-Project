from rest_framework import serializers
from .models import Doctor, Speciality


class SpecialitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Speciality
        fields = '__all__'


class DoctorSerializer(serializers.ModelSerializer):
    speciality = serializers.SerializerMethodField()

    def get_speciality(self, obj):
        return SpecialitySerializer(obj.speciality.all(), many=True).data

    class Meta:
        model = Doctor
        fields = ['id', 'first_name', 'last_name', 'national_id', 'description', 'fees', 'medical_system_number',
                  'speciality',
                  'phone_no', 'birthdate', 'gender']
