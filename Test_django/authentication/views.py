from rest_framework import viewsets,permissions
from .serializers import Loginserializer, Registerserializer
from django.contrib.auth import get_user_model,authenticate
from rest_framework.response import Response
from .models import CustomUser
User = get_user_model()
from rest_framework import status 
from knox.models import AuthToken

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
class Userview(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = Registerserializer
    queryset = User.objects.all()

    def list(self, request):
        queryset=User.objects.all()
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)