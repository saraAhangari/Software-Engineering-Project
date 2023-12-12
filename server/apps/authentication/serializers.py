from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from .models import Role
from apps.appointment.models import Patient
from apps.appointment.serializers import MedicalHistorySerializer


class PatientSerializer(serializers.ModelSerializer):
    medical_history = MedicalHistorySerializer()

    def get_medical_history(self, obj):
        return MedicalHistorySerializer(obj.mediaclHistory.all()).data

    class Meta:
        model = Patient
        fields = ['id', 'first_name', 'last_name', 'national_id',
                  'phone_no', 'birthdate', 'assurance', 'gender',
                  'medical_history']

    def create(self, validated_data):
        patient = self.Meta.model(**validated_data)
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

        patient.save()
        return patient


class LoginSerializer(serializers.Serializer):
    national_id = serializers.CharField(max_length=10)

    def validate(self, data):
        national_id = data['national_id']

        if not national_id:
            raise serializers.ValidationError('national_id not provided')

        if len(national_id) != 10:
            raise serializers.ValidationError('national_id not valid pattern')

        if Patient.objects.filter(national_id=national_id).first() is None:
            raise serializers.ValidationError('login first')

        return data


class GetTokenSerializer(serializers.Serializer):
    national_id = serializers.CharField(max_length=10)
    otp = serializers.CharField(max_length=6)

    def validate(self, data):
        patient = Patient.objects.filter(national_id=data['national_id']).first()

        if not data['national_id']:
            raise serializers.ValidationError('national_id not provided')

        if not data['otp']:
            raise serializers.ValidationError('otp not provided')

        if patient is None:
            raise serializers.ValidationError('user not found')

        return data


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['id'] = user.id
        token['role'] = user.role.name

        return token
