import random
from time import time

from django.contrib.auth.models import AbstractUser
from django.core.exceptions import ValidationError
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver


def validate_deezer_email(email):
    if email.endswith("@deezer.com") or email.endswith(".deezer.com"):
        return
    raise ValidationError("Email must end in @deezer.com or @*.deezer.com.")


def prohibit_upper_case_chars(email):
    if email.lower() != email:
        raise ValidationError("Email must be lower case.")


class User(AbstractUser):
    username = models.CharField(max_length=25)
    email = models.EmailField(
        unique=True, validators=[validate_deezer_email, prohibit_upper_case_chars]
    )
    fib = models.BigIntegerField(null=True)
    time_to_compute_fib = models.FloatField(null=True)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username"]


def fibonacci(x):
    if x <= 0:
        return 0
    elif x == 1:
        return 1

    def matrix_multiply(A, B):
        result = [[0, 0], [0, 0]]
        for i in range(2):
            for j in range(2):
                for k in range(2):
                    result[i][j] += A[i][k] * B[k][j]
        return result

    def matrix_power(A, n):
        if n == 1:
            return A
        if n % 2 == 0:
            half_power = matrix_power(A, n // 2)
            return matrix_multiply(half_power, half_power)
        half_power = matrix_power(A, (n - 1) // 2)
        return matrix_multiply(matrix_multiply(half_power, half_power), A)

    A = [[1, 1], [1, 0]]

    return matrix_power(A, x - 1)[0][0]


@receiver(post_save, sender=User)
def compute_fib(sender, instance, created, **kwargs):
    if created:
        x = random.randint(50, 55)
        time_start = time()
        fib = fibonacci(x)
        time_end = time()
        instance.fib = fib
        instance.time_to_compute_fib = time_end - time_start
        instance.save()
