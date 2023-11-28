from django.core.cache import cache
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.models import TokenUser
from rest_framework import status
from apps.appointment.models import Patient
from .models import Role
from .serializers import PatientSerializer
from .utils import generate_confirmation_number, send_message
from rest_framework.permissions import IsAuthenticated


class RegisterView(APIView):
    def post(self, request):
        serializer = PatientSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)


class GetToken(APIView):
    def post(self, request):
        national_id = request.data['national_id']
        user_otp = int(request.data['otp'])

        patient = Patient.objects.filter(national_id=national_id).first()
        if patient is None:
            raise AuthenticationFailed('user not found')

        valid_otp = cache.get(patient.phone_no)

        if valid_otp != user_otp:
            raise AuthenticationFailed('otp not correct')

        response = Response()

        refresh = RefreshToken.for_user(patient)
        access = str(refresh.access_token)

        response.data = {
            'refresh_token': str(refresh),
            'access_token': access
        }

        return response


class LogoutView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        try:
            token = request.headers['Authorization'].split(" ")[1]
            blocked = cache.get(token)
            if blocked is not None and blocked:
                return Response({
                    'ok': False,
                    'message': 'login first'
                })

            cache.set(token, True, 5*24*60*60)
            return Response({
                'ok': True,
                'message': 'user logged out'
            })
        except Exception as e:
            print(e)
            # Handle any exceptions that might occur during the logout process
            return Response({'detail': 'An error occurred during logout.'},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class OtpGenerator(APIView):
    def post(self, request):
        national_id = request.data['national_id']
        if national_id is None:
            raise AuthenticationFailed('national_id not found')

        patient = Patient.objects.filter(national_id=national_id).first()
        if patient is None:
            raise AuthenticationFailed('user not found')

        confirmation_code = generate_confirmation_number()

        print(patient.phone_no)
        print(f'otp code is {confirmation_code}')  # TODO
        # send_message(confirmation_code, patient.phone_no)

        cache.set(patient.phone_no, confirmation_code, 120)

        return Response({
            'ok': True,
            'message': 'otp sent to the user phone number'
        })


class RoleView(APIView):
    def post(self, request):
        name = request.data['name']
        Role.objects.create(name=name).save()

        return Response({
            'ok': True,
            'message': 'role saved'
        })

    def get(self, request):
        role_list = []
        for role in Role.objects.all():
            role_list.append({
                'id': role.id,
                'name': role.name
            })

        return Response({'roles': role_list})

    def delete(self, request):
        id = request.data['id']
        Role.objects.filter(id=id).delete()

        return Response({
            'ok': True,
            'message': 'role deleted'
        })
