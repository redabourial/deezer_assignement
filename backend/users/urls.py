from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import UsersViewSet

router = DefaultRouter()
router.register(r'', UsersViewSet, basename='users')

urlpatterns = router.urls