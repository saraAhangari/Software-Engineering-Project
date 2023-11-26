from rest_framework.views import APIView
from rest_framework.response import Response
from apps.authentication.permissions import IsDoctor, IsPatient
from rest_framework.permissions import IsAuthenticated
class Index(APIView):
    permission_classes = (IsAuthenticated, IsPatient)
    # permission_classes = (IsPatient,)
    def get(self, request):
        return Response({
            'ok': True,
            'description': 'rest api from SBH Company'
        })