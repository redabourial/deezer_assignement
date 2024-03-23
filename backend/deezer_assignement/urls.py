from django.urls import re_path, include
from django.views.static import serve
from django.conf import settings

urlpatterns = [
    re_path(r"^api/", include("users.urls")),
    # Catch-all for serving index.html
    re_path(
        r"^.*$",
        serve,
        {"document_root": settings.STATIC_INDEX_ROOT, "path": "index.html"},
    ),
]
