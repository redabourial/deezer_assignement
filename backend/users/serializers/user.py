from rest_framework import serializers
from users.models import User
import random

def fib(n):
    # Start with a state corresponding to fib(50) 
    fib_n = 12586269025
    fib_n_minus_one = 7778742049
    # Iterate until fib(n) is computed
    for _ in range(n-50):
        temp = fib_n
        fib_n = fib_n + fib_n_minus_one
        fib_n_minus_one = temp
    return fib_n

class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = '__all__' #('pk', 'name', 'email', 'fib')



    def create(self, validated_data):
        n = random.randint(50, 55)
        validated_data['fib'] = fib(n)
        return super().create(validated_data)