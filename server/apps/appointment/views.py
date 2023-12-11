from django.http import Http404
from django.shortcuts import get_object_or_404
from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response

from .models import Assurance, Doctor, Comment, Patient
from django.db.models import Q
from rest_framework.generics import ListAPIView, RetrieveAPIView

from .permissions import IsPermittedToComment
from .serializers import DoctorSerializer, CommentSerializer, DoctorListSerializer
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
    serializer_class = PatientSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user.patient

    def partial_update(self, request, *args, **kwargs):
        partial_exclude_fields = ['phone_no', 'national_id']
        for field in partial_exclude_fields:
            if field in request.data:
                del request.data[field]

        return super().partial_update(request, *args, **kwargs)
