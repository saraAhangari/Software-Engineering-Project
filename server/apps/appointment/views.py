from datetime import datetime
from django.db import transaction
from django.http import Http404
from django.shortcuts import get_object_or_404
from drf_spectacular.utils import extend_schema, OpenApiParameter
from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .builder import DoctorQueryFilterBuilder
from .models import Assurance, Doctor, Comment, Patient, Appointment, TimeSlice, Prescription, Medicine
from rest_framework.generics import ListAPIView, RetrieveAPIView

from .permissions import IsPermittedToComment
from .serializers import (DoctorDetailSerializer, CommentSerializer, DoctorSerializer, MedicalHistorySerializer,
                          AppointmentDetailSerializer, TimeSliceListSerializer,
                          AppointmentSerializer, PrescriptionSerializer, MedicineSerializer,
                          DoctorRetrieveUpdateSerializer, CommentDetailSerializer)
from ..authentication.permissions import IsNotInBlackedList, IsPatient, IsDoctor
from ..authentication.serializers import PatientSerializer, AssuranceSerializer, PatientDetailSerializer
from .utils import time_to_minutes, minutes_to_time


@extend_schema(tags=['assurance'])
class AssuranceView(generics.CreateAPIView):
    serializer_class = AssuranceSerializer
    queryset = Assurance.objects.all()

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data)

    def get(self, request):
        assurances = self.serializer_class(self.queryset.all(), many=True)

        return Response(assurances.data)

    def delete(self, request):
        pass  # TODO


@extend_schema(tags=['doctor'], parameters=[
    OpenApiParameter(name='first_name', type=str, location=OpenApiParameter.QUERY, description='Filter doctors by '
                                                                                               'first name'),
    OpenApiParameter(name='last_name', type=str, location=OpenApiParameter.QUERY, description='Filter doctors by last '
                                                                                              'name'),
    OpenApiParameter(name='speciality_name', type=str, location=OpenApiParameter.QUERY, description='Filter doctors '
                                                                                                    'by speciality '
                                                                                                    'name'),
])
class DoctorListView(ListAPIView):
    queryset = Doctor.objects.all()
    serializer_class = DoctorSerializer

    def get(self, request, *args, **kwargs):
        query_builder = DoctorQueryFilterBuilder()

        first_name = request.GET.get('first_name', '')
        last_name = request.GET.get('last_name', '')
        speciality_name = request.GET.get('speciality_name', '')

        (query_builder.by_first_name(first_name)
         .by_last_name(last_name)
         .by_speciality_name(speciality_name))

        doctors = Doctor.objects.filter(query_builder.build())

        pagination = self.pagination_class()
        paginated_set = pagination.paginate_queryset(doctors, request)

        serializer = self.serializer_class(paginated_set, many=True)
        return Response(serializer.data)


@extend_schema(tags=['doctor'])
class DoctorDetailView(RetrieveAPIView):
    queryset = Doctor.objects.all()
    serializer_class = DoctorDetailSerializer

    def get(self, request, *args, **kwargs):
        doctor_id = kwargs.get('doctor_id')

        try:
            doctor = get_object_or_404(Doctor, id=doctor_id)
            serializer = self.serializer_class(doctor)
            return Response(serializer.data)
        except Http404:
            return Response({"error": "Doctor not found"}, status=status.HTTP_404_NOT_FOUND)


@extend_schema(tags=['comment'])
class AddCommentView(generics.CreateAPIView):
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticated, IsNotInBlackedList, IsPermittedToComment, IsPatient]

    def post(self, request, doctor_id, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)

        doctor = get_object_or_404(Doctor.objects.all(), id=doctor_id)

        comment = Comment.objects.create(
            patient_id=request.user.patient,
            doctor_id=doctor,
            treatment_experience=serializer.validated_data.get('treatment_experience'),
            point=serializer.validated_data.get('point')
        )
        comment.save()

        return Response(CommentSerializer(comment).data, status=status.HTTP_201_CREATED)


@extend_schema(tags=['comment'])
class GetDoctorCommentView(generics.CreateAPIView):
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticated, IsNotInBlackedList]

    def get(self, request, doctor_id, *args, **kwargs):
        comments = Comment.objects.get(doctor_id=doctor_id)
        serializer = self.serializer_class(comments)

        return Response(serializer.data)


@extend_schema(tags=['comment'])
class GetCommentView(generics.RetrieveAPIView):
    serializer_class = CommentDetailSerializer
    permission_classes = [IsAuthenticated, IsNotInBlackedList]

    def get(self, request, *args, **kwargs):
        patient_id = request.user.id
        comments = Comment.objects.filter(patient_id=patient_id)
        serializer = self.serializer_class(comments, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


@extend_schema(tags=['comment'], request=None, responses=None)
class CommentPermissionView(generics.RetrieveAPIView):
    permission_classes = [IsAuthenticated, IsNotInBlackedList, IsPermittedToComment, IsPatient]

    def get(self, request, *args, **kwargs):
        return Response({
            'description': 'patient has permission to comment'
        })


@extend_schema(tags=['patient'])
class PatientDetailView(generics.UpdateAPIView):
    queryset = Patient.objects.all()
    serializer_class = PatientSerializer
    permission_classes = [IsAuthenticated, IsNotInBlackedList, IsPatient]

    def get_object(self):
        return self.request.user.patient

    def partial_update(self, request, *args, **kwargs):
        patient = self.get_object()
        serializer = self.get_serializer(patient, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)

    def get(self, request):
        patient = self.get_object()
        serializer = self.serializer_class(patient)
        return Response(serializer.data)


@extend_schema(tags=['medicalHistory'])
class MedicalHistoryView(generics.CreateAPIView):
    serializer_class = MedicalHistorySerializer
    permission_classes = [IsAuthenticated, IsNotInBlackedList, IsPatient]

    def post(self, request, *args, **kwargs):
        user = Patient.objects.get(national_id=request.user.national_id)
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)

        medical_history = serializer.save()
        user.medical_history = medical_history
        user.save()

        return Response({'message': 'سوابق پزشکی ذخیره شد'}, status=status.HTTP_201_CREATED)


@extend_schema(tags=['appointment'])
class AppointmentDetailView(generics.RetrieveAPIView):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentDetailSerializer
    permission_classes = [IsAuthenticated, IsNotInBlackedList]

    def get(self, request, *args, **kwargs):
        appointments = Appointment.objects.filter(patient_id=request.user.id)
        serializer = AppointmentDetailSerializer(appointments, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)


@extend_schema(tags=['timeSlice'])
class DoctorTimeSliceView(generics.CreateAPIView):
    serializer_class = TimeSliceListSerializer
    permission_classes = (IsAuthenticated, IsNotInBlackedList, IsDoctor)

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)

        available_time_slices = serializer.data.get('available_time_slices')

        for available_time_slice in available_time_slices:
            date = available_time_slice['date']
            start = available_time_slice['start']
            end = available_time_slice['end']

            doctor = Doctor.objects.get(user_ptr_id=request.user.id)
            TimeSlice.objects.get_or_create(doctor=doctor,
                                            date=date,
                                            start=time_to_minutes(start),
                                            end=time_to_minutes(end),
                                            status='available')

        return Response(serializer.data, status=status.HTTP_201_CREATED)


@extend_schema(tags=['timeSlice'], responses=TimeSliceListSerializer, request=None)
class TimeSliceView(generics.CreateAPIView):
    @staticmethod
    def is_date_free(doctor: Doctor, requested_date, start, end):
        is_time_doctor_free = False
        is_time_appointment_free = True
        for av_time in doctor.available_time_slices.filter(date=requested_date):
            if start >= av_time.start and end <= av_time.end:
                is_time_doctor_free = True

        for appointment in Appointment.objects.filter(doctor_id=doctor.id,
                                                      appointment_time__date=requested_date):
            if (appointment.appointment_time.start <= start < appointment.appointment_time.end
                    or appointment.appointment_time.start < end <= appointment.appointment_time.end
                    or (appointment.appointment_time.start == start and appointment.appointment_time.end == end)):
                is_time_appointment_free = False

        if is_time_appointment_free and is_time_doctor_free:
            return True

    @extend_schema(parameters=[OpenApiParameter("date", type=datetime, style="form", explode=False, )])
    def get(self, request, doctor_id, *args, **kwargs):
        doctor = get_object_or_404(Doctor.objects.all(), id=doctor_id)
        requested_date = request.GET.get('date', datetime.today())

        available_time_slices = []
        for minutes in range(0, 24 * 60 - doctor.slice, doctor.slice):
            start = minutes
            end = minutes + doctor.slice

            if self.is_date_free(doctor, requested_date, start, end):
                available_time_slices.append({
                    'date': requested_date,
                    'start': minutes_to_time(start),
                    'end': minutes_to_time(end)
                })

        return Response({
            'available_time_slices': available_time_slices
        })


@extend_schema(tags=['appointment'])
class AppointmentPatientView(generics.CreateAPIView):
    serializer_class = AppointmentSerializer
    permission_classes = (IsAuthenticated, IsNotInBlackedList, IsPatient)

    @transaction.atomic
    def post(self, request, *args, **kwargs):
        try:
            serializer = self.serializer_class(data=request.data)
            serializer.is_valid(raise_exception=True)

            doctor = get_object_or_404(Doctor.objects.all(), id=serializer.validated_data.get('doctor_id').id)
            date = serializer.validated_data.get('appointment_time').get('date')
            start = serializer.validated_data.get('appointment_time').get('start')
            end = serializer.validated_data.get('appointment_time').get('end', time_to_minutes(start) + doctor.slice)

            # convert start, end to minutes
            start_minutes = time_to_minutes(start)
            end_minutes = time_to_minutes(end)

            # check start and end time
            if start_minutes + doctor.slice != end_minutes:
                return Response({'ok': False, 'message': 'time slice range not correct'},
                                status=status.HTTP_400_BAD_REQUEST)

            if not TimeSliceView.is_date_free(doctor, date, start_minutes, end_minutes):
                return Response({'ok': False, 'message': 'the requested time is full'})

            patient = get_object_or_404(Patient.objects.all(), id=request.user.id)
            appointment_time = TimeSlice.objects.create(
                date=date,
                start=start_minutes,
                end=end_minutes,
                status='unavailable',
                doctor_id=doctor.id
            )
            appointment_time.save()

            appointment = Appointment.objects.create(
                patient_id=patient,
                doctor_id=doctor,
                description=serializer.validated_data.get('description'),
                status=serializer.validated_data.get('status'),
                type=serializer.validated_data.get('type'),
                appointment_time=appointment_time
            )
            appointment.save()

            return Response(AppointmentDetailSerializer(appointment).data, status=status.HTTP_201_CREATED)

        except Exception as e:
            print(e)
            return Response({'ok': False, 'message': 'internal error'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def get(self, request, appointment_id=None, *args, **kwargs):
        serializer = AppointmentDetailSerializer(request.user.patient.appointments, many=True)
        if appointment_id:
            serializer = AppointmentDetailSerializer(get_object_or_404(request.user.patient.appointments,
                                                                       id=appointment_id))

        return Response(serializer.data)


@extend_schema(tags=['prescription'])
class PrescriptionDoctorView(generics.CreateAPIView):
    serializer_class = PrescriptionSerializer
    permission_classes = (IsAuthenticated, IsNotInBlackedList, IsDoctor)

    def post(self, request, appointment_id=None, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)

        appointment = get_object_or_404(Appointment.objects.all(), id=appointment_id,
                                        doctor_id__exact=request.user.id)

        existing_prescription = Prescription.objects.filter(appointment_id=appointment).first()

        if existing_prescription:
            return Response({"detail": "Prescription already exists for this appointment."},
                            status=status.HTTP_400_BAD_REQUEST)

        prescription = Prescription.objects.create(
            appointment_id=appointment,
            description=serializer.validated_data.get('description'),
            date=datetime.now()
        )
        prescription.medicines.set(serializer.validated_data.get('medicines', []))
        prescription.save()

        return Response(self.serializer_class(prescription).data, status=status.HTTP_201_CREATED)

    def get(self, request, appointment_id=None, *args, **kwargs):
        appointment = get_object_or_404(Appointment.objects.all(), id=appointment_id,
                                        doctor_id__exact=request.user.id)
        prescription = get_object_or_404(Prescription.objects.all(), appointment_id=appointment)

        return Response(PrescriptionSerializer(prescription).data)


@extend_schema(tags=['prescription'])
class PrescriptionPatientView(generics.RetrieveAPIView):
    serializer_class = PrescriptionSerializer
    permission_classes = (IsAuthenticated, IsNotInBlackedList, IsPatient)

    def get(self, request, appointment_id=None, *args, **kwargs):
        appointment = get_object_or_404(Appointment.objects.all(), id=appointment_id, patient_id__exact=request.user.id)
        prescription = get_object_or_404(Prescription.objects.all(), appointment_id=appointment, )
        date = prescription.date
        last_name = appointment.doctor_id.last_name

        prescription_data = self.serializer_class(prescription).data

        prescription_info = {
            'prescription': prescription_data,
            'date': date,
            "last_name":last_name
        }

        return Response(prescription_info, status=status.HTTP_200_OK)


@extend_schema(tags=['Medicine'])
class MedicineView(generics.CreateAPIView):
    serializer_class = MedicineSerializer

    def get(self, request, *args, **kwargs):
        serializer = self.serializer_class(Medicine.objects.all(), many=True)
        return Response({'medicines': serializer.data})


@extend_schema(tags=['doctor'])
class DoctorUpdateAPIView(generics.RetrieveUpdateAPIView):
    permission_classes = (IsAuthenticated, IsNotInBlackedList, IsDoctor)
    serializer_class = DoctorRetrieveUpdateSerializer

    def get_object(self):
        return self.request.user.doctor


@extend_schema(tags=['doctor'])
class DoctorCommentListView(generics.ListAPIView):
    permission_classes = (IsAuthenticated, IsNotInBlackedList, IsDoctor)
    serializer_class = CommentSerializer

    def get_queryset(self):
        doctor = self.request.user.doctor
        return Comment.objects.filter(doctor_id=doctor.id)


@extend_schema(tags=['doctor'])
class DoctorPrescriptionView(generics.RetrieveAPIView):
    permission_classes = (IsAuthenticated, IsNotInBlackedList, IsDoctor)
    serializer_class = PatientDetailSerializer

    def get_prescription_info(self, patient_info, prescription):

        prescription_serializer = PrescriptionSerializer(prescription) if prescription else None

        if prescription_serializer:
            patient_info.update({
                'date_prescribed': prescription.date,
                'prescription': prescription_serializer.data
            })

        return patient_info

    def get(self, request, appointment_id=None, *args, **kwargs):
        appointment = get_object_or_404(Appointment, id=appointment_id, doctor_id=request.user.id)
        patient = get_object_or_404(Patient, national_id=appointment.patient_id)
        patient_serializer = self.serializer_class(patient)
        patient_info = {
            'full_name': patient_serializer.get_full_name(patient),
            'birth_date': patient_serializer.data['birthdate'],
            'national_id': patient_serializer.data['national_id'],
            'doctor_last_name': self.request.user.doctor.last_name,
        }

        try:
            prescription = Prescription.objects.get(appointment_id=appointment)
        except Prescription.DoesNotExist:
            patient_info.update({
                'message': 'No prescription found for this appointment'
            })
            return Response(patient_info, status=status.HTTP_404_NOT_FOUND)

        patient_prescription_info = self.get_prescription_info(patient_info, prescription)
        return Response(patient_prescription_info, status=status.HTTP_200_OK)


@extend_schema(tags=['doctor'])
class DoctorAppointmentView(generics.ListAPIView):
    permission_classes = (IsAuthenticated, IsNotInBlackedList, IsDoctor)
    serializer_class = AppointmentDetailSerializer

    def get(self, request, *args, **kwargs):
        appointments = request.user.doctor.appointments.all()
        appointment_serializer = self.serializer_class(appointments, many=True)

        doctor_appointments_list = []

        for appointment_data in appointment_serializer.data:
            patient_id = appointment_data.get('patient_id')
            patient = Patient.objects.get(pk=patient_id)
            patient_serializer = PatientDetailSerializer(patient)

            appointment_details = {
                'date': appointment_data['appointment_time']['date'],
                'clock': appointment_data['appointment_time']['start'],
                'patient_name': patient_serializer.get_full_name(patient),
                'status': appointment_data['status'],
            }

            doctor_appointments_list.append(appointment_details)

        return Response(doctor_appointments_list, status=status.HTTP_200_OK)


@extend_schema(tags=['medicalHistory'])
class DoctorMedicalRecordView(generics.CreateAPIView):
    permission_classes = (IsAuthenticated, IsNotInBlackedList, IsDoctor)
    serializer_class = PatientDetailSerializer

    def get(self, request, patient_name, *args, **kwargs):
        dummy = 'salam'
        first_name, last_name = patient_name.split(' ', 1)
        patient = Patient.objects.get(first_name=first_name, last_name=last_name)
        return Response(self.serializer_class(patient).data, status=status.HTTP_200_OK)
