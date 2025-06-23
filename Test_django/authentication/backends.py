from django.contrib.auth import get_user_model
from django.contrib.auth.backends import ModelBackend
User = get_user_model()
class EmailAuthBackend(ModelBackend):
    def authenticate(self, request, email=None, password=None, **kwargs):
        
        try:
            user = User.objects.get(email=email)  # Find user by email
            if user.check_password(password):     # Check password
                return user
        except User.DoesNotExist:
            return None  # No user found
    def get_user(self,user_id):
        
        try:
            return User.objects.get(pk=user_id)
        except User.DoesNotExist:
            return None