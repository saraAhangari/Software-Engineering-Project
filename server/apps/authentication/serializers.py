from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from .models import Role

from apps.appointment.serializers import MedicalHistorySerializer, AppointmentDetailSerializer
from apps.appointment.models import Patient, User


# class PatientDetailSerializer(serializers.ModelSerializer):


class PatientSerializer(serializers.ModelSerializer):
    medical_history = MedicalHistorySerializer(required=False)
    appointments = AppointmentDetailSerializer(many=True, read_only=True, required=False)

    def get_medical_history(self, obj):
        return MedicalHistorySerializer(obj.medical_history.all()).data

    def validate_national_id(self, value):
        if Patient.objects.filter(national_id=value).exists():
            raise serializers.ValidationError('کد ملی وارد شده تکراری است.')

        return value

    # def to_representation(self, instance):
    #     representation = super().to_representation(instance)
    #
    #     appointments_data = representation.get('appointments', [])
    #     completed_appointments = [appt for appt in appointments_data if appt.get('status') == 'completed']
    #     representation['appointments'] = completed_appointments
    #
    #     return representation

    class Meta:
        model = Patient
        fields = ['id', 'first_name', 'last_name', 'national_id',
                  'phone_no', 'birthdate', 'assurance', 'gender',
                  'medical_history', 'appointments'
                  ]

        extra_kwargs = {
            'first_name': {
                'required': True,
                'error_messages': {
                    'required': 'نام وارد نشده است.',
                    'invalid': 'نام معتبر نیست.'
                }
            },
            'last_name': {
                'required': True,
                'error_messages': {
                    'required': 'نام خانوادگی وارد نشده است.',
                    'invalid': 'نام خانوادگی معتبر نیست.'
                }
            },
            'national_id': {
                'required': True,
                'error_messages': {
                    'required': 'کد ملی وارد نشده است.',
                    'invalid': 'کد ملی معتبر نیست.',
                    'min_length': 'کد ملی باید ۱۰ رقم باشد.',
                    'max_length': 'کد ملی باید ۱۰ رقم باشد.',
                    'unique': 'کد ملی باید یکتا باشد.'
                }
            },
            'phone_no': {
                'required': True,
                'error_messages': {
                    "required": 'شماره تلفن وارد نشده است.',
                    'invalid': 'شماره تلفن معتبر نیست.',
                    'min_length': 'شماره تلفن باید حداقل ۱۰ رقم باشد.',
                    'max_length': 'شماره تلفن باید حداکثر ۱۱ رقم باشد.',
                    'unique': 'شماره تلفن باید یکتا باشد.'
                }
            },
            'birthdate': {
                'required': True,
                'error_messages': {
                    "required": 'تاریخ تولد وارد نشده است.',
                    'invalid': 'تاریخ تولد معتبر نیست.',
                }
            },
            'assurance': {
                'required': True,
                'error_messages': {
                    'required': 'بیمه وارد نشده است.',
                    'invalid': 'بیمه معتبر نیست.',
                }
            },
            'gender': {
                'required': True,
                'error_messages': {
                    "required": 'جنسیت وارد نشده است.',
                    'invalid': 'جنسیت معتبر نیست.'
                }
            },


        }

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


class RegisterSerializer(PatientSerializer):
    otp = serializers.CharField(write_only=True)

    class Meta:
        model = Patient
        fields = PatientSerializer.Meta.fields + ['otp']


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
