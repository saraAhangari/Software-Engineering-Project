from django.http import Http404
from django.shortcuts import get_object_or_404
from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response

from .models import Assurance, Doctor, Comment, Patient
from django.db.models import Q
from rest_framework.generics import ListAPIView, RetrieveAPIView
from .serializers import DoctorSerializer, CommentSerializer, DoctorListSerializer
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


class CommentView(generics.CreateAPIView):
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        patient_id = request.user.id
        comments = Comment.objects.filter(patient_id=patient_id)
        serializer = CommentSerializer(comments, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

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


class PatientView(generics.UpdateAPIView):
    serializer_class = PatientSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):

        try:
            return self.request.user
        except Patient.DoesNotExist:
            return Response({
                'ok': False,
                'message': 'patient does not exist'
            })

    def patch(self, request, *args, **kwargs):
        instance = self.get_object()

        if instance:
            serializer = self.get_serializer(instance, data=request.data, partial=True)
            serializer.is_valid(raise_exception=True)
            self.perform_update(serializer)
            return Response(serializer.data, status=status.HTTP_200_OK)
