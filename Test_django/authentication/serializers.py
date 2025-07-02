from rest_framework import serializers
from .models import CustomUser
from django.contrib.auth import get_user_model
from .models import Profile
from .models import UserPhoto
User=get_user_model()

class Loginserializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()

    def to_representation(self, instance):
        ret=super().to_representation(instance)
        ret.pop('password', None)  # Remove password from the representation
        return ret

  
class Registerserializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'username', 'password']
        extra_kwargs = {
            'password': {'write_only': True},
            'username': {'required': True}
        }

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user
    

class ProfileSerializer(serializers.ModelSerializer):
    email = serializers.CharField(source='user.email', read_only=True)
    username = serializers.CharField(source='user.username', read_only=True)
    
    class Meta:
        model = Profile
        fields = [
            'id',
            'profile_picture',
            'bio', 
            'phone_number',
            'created_at',
            'updated_at',
            'email',
            'username'
        ]
        extra_kwargs = {
            'profile_picture': {'required': False, 'allow_null': True},
            'created_at': {'read_only': True},
            'updated_at': {'read_only': True}
        }

    def update(self, instance, validated_data):
        # Handle partial updates
        instance.bio = validated_data.get('bio', instance.bio)
        instance.phone_number = validated_data.get('phone_number', instance.phone_number)
        
        # Only update picture if provided
        if 'profile_picture' in validated_data:
            # Delete old picture if exists
            if instance.profile_picture:
                instance.profile_picture.delete(save=False)
            instance.profile_picture = validated_data['profile_picture']
            
        instance.save()
        return instance



class UserPhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserPhoto
        fields = ['id', 'image', 'caption', 'created_at']
        read_only_fields = ['id', 'created_at']
    
    def validate_image(self, value):
        """Validate image size and type"""
        if value.size > 5 * 1024 * 1024:  # 5MB limit
            raise serializers.ValidationError("Image size cannot exceed 5MB")
        return value

class PublicUserPhotoSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)
    email = serializers.EmailField(source='user.email', read_only=True)
    profile_picture = serializers.SerializerMethodField()

    class Meta:
        model = UserPhoto
        fields = ['id', 'username', 'email', 'image', 'caption', 'created_at', 'profile_picture']

    def get_profile_picture(self, obj):
        profile = getattr(obj.user, 'profile', None)
        if profile and profile.profile_picture:
            return profile.profile_picture.url
        return None