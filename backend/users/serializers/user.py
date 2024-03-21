from rest_framework import serializers
from users.models import User


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ("pk", "name", "email", "fib")

    fib = serializers.IntegerField(required=False)
