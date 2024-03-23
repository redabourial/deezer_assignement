from rest_framework import serializers

from users.models import User


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ("pk", "username", "email", "fib", "time_to_compute_fib")

    fib = serializers.IntegerField(required=False)
    time_to_compute_fib = serializers.FloatField(required=False)
