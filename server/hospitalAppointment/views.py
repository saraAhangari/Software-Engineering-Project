from drf_spectacular.utils import extend_schema, OpenApiResponse
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from apps.authentication.permissions import IsDoctor, IsPatient, IsNotInBlackedList
from rest_framework.permissions import IsAuthenticated


@extend_schema(request=None, responses={
    200: OpenApiResponse(description='get message')
})
class Index(generics.CreateAPIView):
    permission_classes = (IsAuthenticated, IsNotInBlackedList,)

    def get(self, request):
        return Response({
            'ok': True,
            'description': 'rest api from SBH Company'
        })
