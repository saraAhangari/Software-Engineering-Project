from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from .models import Role

from apps.appointment.serializers import MedicalHistorySerializer, AppointmentSerializer
from apps.appointment.models import Patient, User



class PatientSerializer(serializers.ModelSerializer):
    medical_history = MedicalHistorySerializer()
    appointments = AppointmentSerializer(many=True, read_only=True)

    def get_medical_history(self, obj):
        return MedicalHistorySerializer(obj.medical_history.all()).data

    def to_representation(self, instance):
        representation = super().to_representation(instance)

        appointments_data = representation.get('appointments', [])
        completed_appointments = [appt for appt in appointments_data if appt.get('status') == 'completed']
        representation['appointments'] = completed_appointments

        return representation

    class Meta:
        model = Patient
        fields = ['id', 'first_name', 'last_name', 'national_id',
                  'phone_no', 'birthdate', 'assurance', 'gender',
                  'medical_history', 'appointments'
                  ]

    def create(self, validated_data):
        validated_data.pop('medical_history', [])
        validated_data.pop('appointments', [])
        patient = Patient.objects.create(**validated_data)
        patient.role = Role.objects.filter(name='patient').first()
        patient.username = patient.national_id
        patient.save()

        return patient

    def update(self, patient, validated_data):
        validated_data.pop('phone_no', None)
        validated_data.pop('national_id', None)

        patient.first_name = validated_data.get('first_name', patient.first_name)
        patient.last_name = validated_data.get('last_name', patient.last_name)
        patient.birthdate = validated_data.get('birthdate', patient.birthdate)
        patient.assurance = validated_data.get('assurance', patient.assurance)
        patient.gender = validated_data.get('gender', patient.gender)

        medical_history_data = validated_data.get('medical_history', {})
        if medical_history_data:
            patient.medical_history.height = medical_history_data.get('height', patient.medical_history.height)
            patient.medical_history.weight = medical_history_data.get('weight', patient.medical_history.weight)
            patient.medical_history.blood_group = medical_history_data.get('blood_group',
                                                                           patient.medical_history.blood_group)
            patient.medical_history.blood_pressure = medical_history_data.get('blood_pressure',
                                                                              patient.medical_history.blood_pressure)
            patient.medical_history.save()

        representation = {
            'id': patient.id,
            'first_name': patient.first_name,
            'last_name': patient.last_name,
            'national_id': patient.national_id,
            'phone_no': patient.phone_no,
            'birthdate': patient.birthdate,
            'assurance': patient.assurance,
            'gender': patient.gender,
            'medical_history': MedicalHistorySerializer(patient.medical_history).data,
        }

        return representation


class LoginSerializer(serializers.Serializer):
    national_id = serializers.CharField(max_length=10)

    def validate(self, data):
        national_id = data['national_id']

        if not national_id:
            raise serializers.ValidationError('national_id not provided')

        if len(national_id) != 10:
            raise serializers.ValidationError('national_id not valid pattern')

        if User.objects.filter(national_id=national_id).first() is None:
            raise serializers.ValidationError('login first')

        return data

class GetTokenSerializer(serializers.Serializer):
    national_id = serializers.CharField(max_length=10)
    otp = serializers.CharField(max_length=6)

    def validate(self, data):
        user = User.objects.filter(national_id=data['national_id']).first()

        if not data['national_id']:
            raise serializers.ValidationError('national_id not provided')

        if not data['otp']:
            raise serializers.ValidationError('otp not provided')

        if user is None:
            raise serializers.ValidationError('user not found')

        return data


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['id'] = user.id
        token['role'] = user.role.name

        return token


class RoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Role
        fields = '__all__'
