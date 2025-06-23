from rest_framework.routers import DefaultRouter
from .views import Loginview, Registerview , Userview


router = DefaultRouter()
router.register(r'register',Registerview,basename='register')
router.register(r'login',Loginview,basename='login')
router.register(r'users',Userview,basename='users')

urlpatterns =router.urls