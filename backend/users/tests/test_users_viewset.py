from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from users.models import User
from users.serializers import UserSerializer
from users.views import UsersViewSet

class UsersViewSetTestCase(TestCase):

    def setUp(self):
        self.client = APIClient()
        self.user_data = {
            "name": "testuser",
            "email": "testuser@example.com",
            "password": "testpassword"
        }

    def test_create_user(self):
        self.response = self.client.post(reverse('users-list'), self.user_data, format='json')
        self.assertEqual(self.response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(User.objects.count(), 1)
        self.assertEqual(User.objects.get().name, 'testuser')

    def test_create_invaliduser(self):
        self.response = self.client.post(reverse('users-list'), {}, format='json')
        self.assertEqual(self.response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(User.objects.count(), 0)

    def test_retrieve_user(self):
        self.response = self.client.post(reverse('users-list'), self.user_data, format='json')
        user = User.objects.get(name='testuser')
        response = self.client.get(reverse('users-detail', kwargs={'pk': user.pk}))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, UserSerializer(user).data)

    def test_retrieve_user_not_found(self):
        self.response = self.client.post(reverse('users-list'), self.user_data, format='json')
        response = self.client.get(reverse('users-detail', kwargs={'pk': 999}))
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)