from django.contrib import admin
from django.urls import path, include
from knox import views as knox_views
from django.conf.urls.static import static
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from django.conf import settings
urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/', include('authentication.urls')), 
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'), # Our auth app URLs
    path('api/password_reset/',include('django_rest_passwordreset.urls', namespace='password_reset')), 
    path('logout/',knox_views.LogoutView.as_view(), name='knox_logout'), 
    path('logoutall/',knox_views.LogoutAllView.as_view(), name='knox_logoutall'), 
]
# Serve media files during development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
