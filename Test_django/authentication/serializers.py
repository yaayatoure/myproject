from rest_framework import serializers
from .models import CustomUser
from django.contrib.auth import get_user_model

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
        model=User
        fields=['id','email','password']
        extra_kwargs = {'password':{'write_only':True}}
    def create(self,validated_data):
        user=User.objects.create_user(
          **validated_data,  
        )
        return user