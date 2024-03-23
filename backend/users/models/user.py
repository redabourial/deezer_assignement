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
    raise ValidationError("Email must end in @deezer.com or @*.deezer.com")


def prohibit_upper_case_chars(email):
    if email.lower() != email:
        raise ValidationError("Email must be lower case")


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
    # Start with a state corresponding to fib(50)
    fib_x = 12586269025
    fib_x_minus_one = 7778742049
    # Iterate until fib(x) is computed
    for _ in range(x - 50):
        temp = fib_x
        fib_x = fib_x + fib_x_minus_one
        fib_x_minus_one = temp
    return fib_x


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
