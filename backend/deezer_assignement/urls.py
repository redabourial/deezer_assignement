from django.urls import path, re_path
from users import views

urlpatterns = [
    re_path(r'^api/users/$', views.UsersList.as_view()),
]
