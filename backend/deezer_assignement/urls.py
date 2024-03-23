from django.urls import path, re_path, include
from django.conf.urls.static import static
from django.views.static import serve
from django.conf import settings

urlpatterns = [
    re_path(r"^api/", include("users.urls")),
]

urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

# Catch-all for all urls except those starting with api/
##urlpatterns += [
##    re_path(
##        r"^(?!api/).*",
##        serve,
##        {"document_root": settings.STATIC_ROOT, "path": "index.html"},
##    )
##]
