from django.urls import path

from .views import UserCreateAPIView, UserRetrieveAPIView

urlpatterns = [
    path("users/", UserCreateAPIView.as_view(), name="user-list-create"),
    path("users/<int:pk>/", UserRetrieveAPIView.as_view(), name="user-retrieve"),
]
