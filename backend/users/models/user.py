from time import time
import random

from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver


class User(models.Model):
    name = models.CharField(max_length=25)
    email = models.EmailField(unique=True)
    fib = models.BigIntegerField(null=True)
    time_to_compute_fib = models.FloatField(null=True)


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
        instance.time_to_compute_fib = (time_end - time_start) * 1000
        instance.save()
