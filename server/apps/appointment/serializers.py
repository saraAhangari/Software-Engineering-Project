from rest_framework import serializers
from .models import Doctor, Speciality, Comment, PatientMedicalHistory, Assurance, Appointment, Prescription, TimeSlice, \
    Medicine
from .utils import minutes_to_time, split_datetime


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
        fields = ['id', 'first_name', 'last_name', 'national_id', 'description', 'medical_system_number',
                  'speciality', 'phone_no', 'birthdate', 'gender']


class DoctorDetailSerializer(serializers.ModelSerializer):
    speciality = serializers.SerializerMethodField()

    def get_speciality(self, obj):
        return SpecialitySerializer(obj.speciality.all(), many=True).data

    class Meta:
        model = Doctor
        fields = ['id', 'first_name', 'last_name', 'national_id', 'description', 'medical_system_number',
                  'speciality', 'phone_no', 'birthdate', 'gender', 'comments']


class MedicalHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = PatientMedicalHistory
        fields = '__all__'


class MedicineSerializer(serializers.ModelSerializer):
    class Meta:
        model = Medicine
        fields = '__all__'


class PrescriptionDetailSerializer(serializers.ModelSerializer):
    medicines = serializers.ListField(child=MedicineSerializer())

    def get_medicines(self, obj):
        return MedicineSerializer(obj.medicines.all(), many=True).data

    class Meta:
        model = Prescription
        fields = '__all__'


class AppointmentDetailSerializer(serializers.ModelSerializer):
    prescription = PrescriptionDetailSerializer(read_only=True)
    appointment_time = serializers.SerializerMethodField()

    def get_appointment_time(self, obj):
        date = split_datetime(obj.appointment_time.date)[0]
        obj.appointment_time.date = date
        return TimeSliceSerializer(obj.appointment_time).data

    class Meta:
        model = Appointment
        fields = ['patient_id', 'doctor_id', 'description', 'status', 'type', 'prescription', 'appointment_time']


class AssuranceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Assurance
        fields = '__all__'


class DateTimeSliceSerializer(serializers.Serializer):
    start = serializers.DateTimeField(format='%Y-%m-%d %H:%M:%S')
    end = serializers.DateTimeField(format='%Y-%m-%d %H:%M:%S')


class TimeSliceListSerializer(serializers.Serializer):
    available_time_slices = serializers.ListField(child=DateTimeSliceSerializer())


class DateSerializer(serializers.Serializer):
    date = serializers.DateField(format='%Y-%m-%d')


class TimeSliceSerializer(serializers.ModelSerializer):
    start = serializers.SerializerMethodField()
    end = serializers.SerializerMethodField()

    def get_start(self, obj):
        return minutes_to_time(obj.start)

    def get_end(self, obj):
        return minutes_to_time(obj.end)

    class Meta:
        model = TimeSlice
        fields = ['date', 'start', 'end', 'status']


class AppointmentSerializer(serializers.ModelSerializer):
    status = serializers.CharField(default='reserved', allow_null=True)
    description = serializers.CharField(default='-', allow_null=True)
    type = serializers.CharField(default='face to face', allow_null=True)
    appointment_time = DateTimeSliceSerializer()

    class Meta:
        model = Appointment
        fields = ['doctor_id', 'status', 'description', 'type', 'appointment_time']
