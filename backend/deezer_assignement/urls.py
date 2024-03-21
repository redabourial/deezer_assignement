from django.urls import path,re_path,include
from django.conf.urls.static import static
from django.views.static import serve
from django.conf import settings

urlpatterns = [
    path('api/', include('users.urls')),
]

urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
urlpatterns += [re_path(r'^.*/$', serve, {'document_root': settings.STATIC_ROOT, 'path': 'index.html'})]