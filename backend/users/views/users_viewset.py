from time import time
import random

from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status

from users.models import User
from users.serializers import UserSerializer

def fibonacci(n):
    # Start with a state corresponding to fib(50)
    fib_n = 12586269025
    fib_n_minus_one = 7778742049
    # Iterate until fib(n) is computed
    for _ in range(n-50):
        temp = fib_n
        fib_n = fib_n + fib_n_minus_one
        fib_n_minus_one = temp
    return fib_n

class UsersViewSet(viewsets.ViewSet):

    def create(self, request):
        create_starting_time = time()
        ret = request.data
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user_object = serializer.save()
            ret["Time to create user (without fib)"] = f"{time() - create_starting_time} s"
            x = random.randint(50, 55)
            fib = fibonacci(x)
            user_object.fib = fib
            user_object.save()
            ret["pk"] = user_object.pk
            ret["Time to create user (with fib)"] = f"{time() - create_starting_time} s"
            return Response(ret, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self, request, pk=None):
        try:
            user = User.objects.get(pk=pk)
        except User.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = UserSerializer(user, context={'request': request})
        return Response(serializer.data)