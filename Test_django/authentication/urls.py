from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import Loginview, PhotoUploadView, ProfileAPIView, Registerview, UserPhotoListView , Userview
from .views import PublicUserSearchView

router = DefaultRouter()
router.register(r'register',Registerview,basename='register')
router.register(r'login',Loginview,basename='login')
router.register(r'users',Userview,basename='users')

urlpatterns = [
    *router.urls,
    # Add the profile endpoint outside the router
    path('profile/', ProfileAPIView.as_view(), name='profile'),
    path('photos/', PhotoUploadView.as_view(), name='photo-upload'),
    path('user-photos/', UserPhotoListView.as_view(), name='user-photos'),
    path('public-search/', PublicUserSearchView.as_view(), name='public-user-search'),
    
]