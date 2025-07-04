from rest_framework import viewsets,permissions
from .serializers import Loginserializer, Registerserializer, UserWithProfileAndPhotosSerializer
from django.contrib.auth import get_user_model,authenticate
from rest_framework.response import Response
from .models import CustomUser
User = get_user_model()
from rest_framework import status 
from knox.models import AuthToken

from rest_framework import generics, permissions
from rest_framework.parsers import MultiPartParser, FormParser
from .models import Profile
from .serializers import ProfileSerializer

from .models import UserPhoto
from .serializers import UserPhotoSerializer
from .serializers import PublicUserPhotoSerializer
from rest_framework.generics import ListAPIView
from rest_framework.permissions import AllowAny


class Loginview(viewsets.ViewSet):
    permission_classes = [permissions.AllowAny]
    serializer_class = Loginserializer
    

    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            password = serializer.validated_data['password']
            user = authenticate(request, email=email, password=password)
            if user:
                _,token = AuthToken.objects.create(user)
                return Response({
                    'user':self.serializer_class(user).data,
                    'token': token
                    }, status=status.HTTP_200_OK)
            else:
                return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
        return Response(serializer.errors, status=400)

class Registerview(viewsets.ModelViewSet):
    permission_classes = [permissions.AllowAny]
    serializer_class = Registerserializer
    queryset = User.objects.all()

    def create(self,request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=400)
# class Userview(viewsets.ModelViewSet):
#     permission_classes = [permissions.IsAuthenticated]
#     serializer_class = Registerserializer
#     queryset = User.objects.all()

#     def list(self, request):
#         queryset=User.objects.all()
#         serializer = self.serializer_class(queryset, many=True)
#         return Response(serializer.data, status=status.HTTP_200_OK)


# views.py
class Userview(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = UserWithProfileAndPhotosSerializer
    queryset = User.objects.all()

    def list(self, request):
        queryset = self.queryset
        serializer = self.serializer_class(queryset, many=True, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)


class ProfileAPIView(generics.RetrieveUpdateAPIView):
    """
    Handle both profile retrieval and updates
    GET /api/profile/ - Get user profile
    PUT /api/profile/ - Update profile (supports JSON and multipart form-data)
    PATCH /api/profile/ - Partial update
    """
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [permissions.IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def get_object(self):
        return self.request.user.profile


#image upload
class PhotoUploadView(generics.CreateAPIView):
    queryset = UserPhoto.objects.all()
    serializer_class = UserPhotoSerializer
    permission_classes = [permissions.IsAuthenticated]
    parser_classes = [MultiPartParser]

    def perform_create(self, serializer):
        # Automatically associate photo with current user
        
        serializer.save(user=self.request.user)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        
        # Custom response with more details
        return Response({
            'status': 'success',
            'data': serializer.data,
            'message': 'Photo uploaded successfully'
        }, status=status.HTTP_201_CREATED)


class UserPhotoListView(generics.ListAPIView):
    serializer_class = UserPhotoSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return UserPhoto.objects.filter(user=self.request.user).order_by('-created_at')


class PublicUserSearchView(ListAPIView):
    permission_classes = [AllowAny]
    serializer_class = PublicUserPhotoSerializer

    def get_queryset(self):
        query = self.request.query_params.get('query', '')
        return UserPhoto.objects.filter(user__username__icontains=query).order_by('-created_at')