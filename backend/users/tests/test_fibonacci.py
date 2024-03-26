from django.test import TestCase

from users.models.user import fibonacci


class FibonacciTest(TestCase):

    def test_fib_0(self):
        self.assertEqual(fibonacci(0), 0)

    def test_fib_1(self):
        self.assertEqual(fibonacci(1), 1)

    def test_fib_299(self):
        self.assertEqual(
            fibonacci(299),
            137347080577163115432025771710279131845700275212767467264610201,
        )
