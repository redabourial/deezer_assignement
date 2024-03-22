from django.urls import path
from .views import UserListCreateAPIView, UserRetrieveAPIView

urlpatterns = [
    path("users/", UserListCreateAPIView.as_view(), name="user-list-create"),
    path("users/<int:pk>/", UserRetrieveAPIView.as_view(), name="user-retrieve"),
]
