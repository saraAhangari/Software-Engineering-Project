from django.http import Http404
from django.shortcuts import get_object_or_404
from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response

from .models import Assurance, Doctor, Comment, Patient, PatientMedicalHistory, Appointment
from django.db.models import Q
from rest_framework.generics import ListAPIView, RetrieveAPIView

from .permissions import IsPermittedToComment
from .serializers import DoctorSerializer, CommentSerializer, DoctorListSerializer, MedicalHistorySerializer, \
    AppointmentSerializer
from ..authentication.permissions import IsNotInBlackedList
from ..authentication.serializers import PatientSerializer


class AssuranceView(APIView):
    def post(self, request):
        name = request.data['name']
        if name is None:
            return Response({
                'ok': False,
                'message': 'name not found'
            })

        obj = Assurance.objects.filter(name=name).first()
        if obj is not None:
            return Response({
                'ok': False,
                'message': 'duplicate name in database'
            })

        Assurance.objects.create(name=name).save()

        return Response({
            'ok': True,
            'message': 'assurance added'
        })

    def get(self, request):
        assurances = []
        for assurance in Assurance.objects.all():
            assurances.append({
                'id': assurance.id,
                'name': assurance.name
            })

        return Response({
            'assurances': assurances
        })

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
    permission_classes = [IsAuthenticated, IsPermittedToComment, IsNotInBlackedList]

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


class CommentPermissionView(generics.CreateAPIView):
    permission_classes = [IsAuthenticated, IsPermittedToComment, IsNotInBlackedList]

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
        patient = Patient.objects.get(id=request.user.id)
        serializer = PatientSerializer(patient)
        return Response(serializer.data)


class MedicalHistoryView(generics.CreateAPIView):
    serializer_class = MedicalHistorySerializer
    permission_classes = [IsAuthenticated, IsNotInBlackedList]

    def post(self, request):
        user = Patient.objects.get(national_id=request.user.national_id)

        if user.role.name == "patient":
            height = request.data.get('height')
            weight = request.data.get('weight')
            blood_group = request.data.get('blood_group')
            blood_pressure = request.data.get('blood_pressure')

            medical_history = PatientMedicalHistory.objects.create(
                height=height,
                weight=weight,
                blood_group=blood_group,
                blood_pressure=blood_pressure,
            )

            user.medical_history = medical_history
            user.save()

            return Response({'message': 'Medical history added successfully'}, status=status.HTTP_201_CREATED)

        return Response({'message': 'Invalid user type'}, status=status.HTTP_400_BAD_REQUEST)


class AppointmentDetailView(generics.RetrieveAPIView):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer
    permission_classes = [IsAuthenticated, IsNotInBlackedList]

    def get(self, request):
        appointment = Appointment.objects.filter(patient_id=request.user.id).first()
        serializer = AppointmentSerializer(appointment)
        return Response(serializer.data)
