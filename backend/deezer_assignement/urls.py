from django.conf import settings
from django.urls import include, re_path
from django.views.static import serve

urlpatterns = [
    re_path(r"^api/", include("users.urls")),
    # Catch-all for serving index.html
    re_path(
        r"^.*$",
        serve,
        {"document_root": settings.STATIC_INDEX_ROOT, "path": "index.html"},
    ),
]
