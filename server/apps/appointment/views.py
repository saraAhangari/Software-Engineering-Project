from datetime import datetime

from django.http import Http404
from django.shortcuts import get_object_or_404
from drf_spectacular.utils import extend_schema, OpenApiParameter
from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response

from .models import Assurance, Doctor, Comment, Patient, PatientMedicalHistory, Appointment, TimeSlice
from django.db.models import Q
from rest_framework.generics import ListAPIView, RetrieveAPIView

from .permissions import IsPermittedToComment
from .serializers import (DoctorSerializer, CommentSerializer, DoctorListSerializer, MedicalHistorySerializer,
                          AppointmentDetailSerializer, AssuranceSerializer, TimeSliceListSerializer,
                          AppointmentSerializer)
from ..authentication.permissions import IsNotInBlackedList, IsPatient, IsDoctor
from ..authentication.serializers import PatientSerializer
from .utils import split_datetime, time_to_minutes, minutes_to_time


@extend_schema(tags=['Assurance'])
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


class DoctorListView(ListAPIView):
    queryset = Doctor.objects.all()
    serializer_class = DoctorListSerializer

    def get(self, request, *args, **kwargs):
        query = request.GET.get('q', '')
        doctors = Doctor.objects.filter(
            Q(first_name__startswith=query) |
            Q(last_name__startswith=query) |
            Q(speciality__name__startswith=query)
        )

        pagination = self.pagination_class()
        paginated_set = pagination.paginate_queryset(doctors, request)

        serializer = DoctorListSerializer(paginated_set, many=True)
        return Response(serializer.data)


class DoctorDetailView(RetrieveAPIView):
    queryset = Doctor.objects.all()
    serializer_class = DoctorSerializer

    def get(self, request, *args, **kwargs):
        doctor_id = kwargs.get('doctor_id')

        try:
            doctor = get_object_or_404(Doctor, id=doctor_id)
            serializer = DoctorSerializer(doctor)
            return Response(serializer.data)
        except Http404:
            return Response({"error": "Doctor not found"}, status=status.HTTP_404_NOT_FOUND)


class AddCommentView(generics.CreateAPIView):
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticated, IsNotInBlackedList, IsPermittedToComment]

    def create(self, request, doctor_id, *args, **kwargs):
        try:
            doctor = Doctor.objects.get(pk=doctor_id)
        except Doctor.DoesNotExist:
            return Response({"error": "Doctor not found"}, status=status.HTTP_404_NOT_FOUND)

        request.data['patient_id'] = request.user.id
        request.data['doctor_id'] = doctor.id

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)

        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


class GetCommentView(generics.CreateAPIView):
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticated, IsNotInBlackedList]

    def get(self, request, *args, **kwargs):
        patient_id = request.user.id
        comments = Comment.objects.filter(patient_id=patient_id)
        serializer = CommentSerializer(comments, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


@extend_schema(tags=['Comment'], request=None, responses=None)
class CommentPermissionView(generics.CreateAPIView):
    permission_classes = [IsAuthenticated, IsNotInBlackedList, IsPermittedToComment, ]

    def get(self, request, *args, **kwargs):
        return Response({
            'ok': True,
            'description': 'patient has permission to comment'
        })


class PatientDetailView(generics.UpdateAPIView):
    queryset = Patient.objects.all()
    serializer_class = PatientSerializer
    permission_classes = [IsAuthenticated, IsNotInBlackedList]

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

        return Response({'ok': True, 'message': 'medical history saved'}, status=status.HTTP_201_CREATED)


class AppointmentDetailView(generics.RetrieveAPIView):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentDetailSerializer
    permission_classes = [IsAuthenticated, IsNotInBlackedList]

    def get(self, request, *args, **kwargs):
        appointments = Appointment.objects.filter(patient_id=request.user.id)
        serializer = AppointmentDetailSerializer(appointments, many=True)
        data = serializer.data

        # for appointment_data in data:
        #     date_time_str = appointment_data['date']
        #     date_time_obj = datetime.strptime(date_time_str, "%Y-%m-%dT%H:%M:%SZ")
        #
        #     appointment_data['date'] = date_time_obj.date().isoformat()
        #     appointment_data['time'] = date_time_obj.time().isoformat()
        #
        #     doctor_id = appointment_data['doctor_id']
        #     doctor = Doctor.objects.get(id=doctor_id)
        #     appointment_data['doctor_full_name'] = f"{doctor.first_name} {doctor.last_name}"

        return Response(data, status=status.HTTP_200_OK)


@extend_schema(tags=['timeSlice'])
class DoctorTimeSliceView(generics.CreateAPIView):
    serializer_class = TimeSliceListSerializer
    permission_classes = (IsAuthenticated, IsNotInBlackedList, IsDoctor)

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)

        available_time_slices = serializer.data.get('available_time_slices')

        for available_time_slice in available_time_slices:
            start_date, start_time = split_datetime(available_time_slice['start'])
            end_date, end_time = split_datetime(available_time_slice['end'])

            if start_date != end_date:
                # TODO
                return Response({'ok': False, 'message': 'start time and end time not equal'},
                                status=status.HTTP_400_BAD_REQUEST)

            doctor = Doctor.objects.get(user_ptr_id=request.user.id)
            TimeSlice.objects.get_or_create(doctor=doctor,
                                            date=start_date,
                                            start=time_to_minutes(start_time),
                                            end=time_to_minutes(end_time),
                                            status='available')

        return Response({'ok': True, 'message': 'saved successfully'})


@extend_schema(tags=['timeSlice'], responses=TimeSliceListSerializer, request=None)
class TimeSliceView(generics.CreateAPIView):

    @staticmethod
    def is_date_free(doctor: Doctor, requested_date: datetime, start, end):
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
        doctor = Doctor.objects.get(id=doctor_id)
        requested_date = request.GET.get('date')

        available_time_slices = []
        for minutes in range(0, 24 * 60, doctor.slice):
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


class AppointmentView(generics.CreateAPIView):
    serializer_class = AppointmentSerializer
    permission_classes = (IsAuthenticated, IsNotInBlackedList, IsPatient)

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)

        doctor = Doctor.objects.get(id=serializer.validated_data.get('doctor_id').id)
        start_date, start_time = split_datetime(serializer.validated_data.get('appointment_time').get('start'))
        end_date, end_time = split_datetime(serializer.validated_data.get('appointment_time').get('end'))

        if not TimeSliceView.is_date_free(doctor, start_date, time_to_minutes(start_time), time_to_minutes(end_time)):
            return Response({'ok': False, 'message': 'the requested time is full'})

        patient = Patient.objects.get(id=request.user.id)
        appointment_time = TimeSlice.objects.create(
            date=start_date,
            start=time_to_minutes(start_time),
            end=time_to_minutes(end_time),
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

        return Response(AppointmentDetailSerializer(appointment).data)
