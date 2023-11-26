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