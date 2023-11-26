from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import serializers
from .models import User, Role


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'national_id', 'phone_no', 'birthdate', 'gender']

    def create(self, validated_data):
        user = self.Meta.model(**validated_data)
        user.role = Role.objects.filter(name='doctor').first()

        user.save()
        return user


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['id'] = user.id
        token['role'] = user.role.name

        return token
