from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from .models import User, Role
from apps.appointment.models import Patient


class PatientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        fields = ['id', 'first_name', 'last_name', 'national_id',
                  'phone_no', 'birthdate', 'assurance', 'gender']

    def create(self, validated_data):
        patient = self.Meta.model(**validated_data)
        patient.role = Role.objects.filter(name='patient').first()
        patient.username = patient.national_id

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
