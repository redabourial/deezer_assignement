from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from users.models import User
from users.serializers import UserSerializer


class UsersViewSetTestCase(TestCase):

    def setUp(self):
        self.client = APIClient()
        self.user_data = {
            "username": "testuser",
            "email": "testuser@deezer.com",
        }

    def tearDown(self):
        User.objects.all().delete()

    def test_create_user(self):
        self.response = self.client.post(
            reverse("user-list-create"), self.user_data, format="json"
        )
        self.assertEqual(self.response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(User.objects.count(), 1)
        self.assertEqual(User.objects.get().username, "testuser")

    def test_create_user_deezer_subdomain(self):
        self.user_data = {
            "username": "testuser",
            "email": "testuser@some.thing.deezer.com",
        }
        self.response = self.client.post(
            reverse("user-list-create"), self.user_data, format="json"
        )
        self.assertEqual(self.response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(User.objects.count(), 1)
        self.assertEqual(User.objects.get().username, "testuser")

    def test_create_user_not_deezer_domain(self):
        self.user_data = {
            "username": "testuser",
            "email": "testuser@example.com",
        }
        self.response = self.client.post(
            reverse("user-list-create"), self.user_data, format="json"
        )
        self.assertEqual(self.response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(User.objects.count(), 0)

    def test_create_invaliduser(self):
        self.response = self.client.post(reverse("user-list-create"), {}, format="json")
        self.assertEqual(self.response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(User.objects.count(), 0)

    def test_retrieve_user(self):
        self.response = self.client.post(
            reverse("user-list-create"), self.user_data, format="json"
        )
        user = User.objects.get(username="testuser")
        response = self.client.get(reverse("user-retrieve", kwargs={"pk": user.pk}))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, UserSerializer(user).data)

    def test_retrieve_user_not_found(self):
        response = self.client.get(reverse("user-retrieve", kwargs={"pk": 999}))
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
