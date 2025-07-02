# from django.db import models
# from django.contrib.auth.models import AbstractUser
# from django.contrib.auth.models import AbstractUser, BaseUserManager
# # Create your models here.

# from django_rest_passwordreset.signals import reset_password_token_created
# from django.dispatch import receiver 
# from django.urls import reverse 
# from django.template.loader import render_to_string
# from django.core.mail import EmailMultiAlternatives
# from django.utils.html import strip_tags


# class CustomUserManager(BaseUserManager):
#     def create_user(self, email, password=None, **extra_fields):
#         if not email:
#             raise ValueError('Users must have an email address')
        
#         email = self.normalize_email(email)
#         user = self.model(email=email, **extra_fields)
#         user.set_password(password)
#         user.save(using=self._db)
#         return user

#     def create_superuser(self, email, password=None, **extra_fields):
#         extra_fields.setdefault('is_staff', True)
#         extra_fields.setdefault('is_superuser', True)
#         extra_fields.setdefault('is_active', True)

#         if extra_fields.get('is_staff') is not True:
#             raise ValueError('Superuser must have is_staff=True.')
        
#         if extra_fields.get('is_superuser') is not True:
#             raise ValueError('Superuser must have is_superuser=True.')

#         return self.create_user(email, password, **extra_fields)

# class CustomUser(AbstractUser):
#     #madama default email fieldga uusan ahayn waxan raba required inan ka dhigo si aan  userska ugu diwan galiyo emailka
#     email = models.EmailField(unique=True, blank=False,null=False)
#     username = models.CharField(max_length=150, unique=False, blank=True, null=True)
#     USERNAME_FIELD='email'
#     REQUIRED_FIELDS = []
#     objects = CustomUserManager()
#     def __str__(self):
#         if self.username:
#             return self.username
#         return self.email



# @receiver(reset_password_token_created)
# def password_reset_token_created(reset_password_token, *args, **kwargs):
#     sitelink = "http://localhost:5173/"
#     token = "{}".format(reset_password_token.key)
#     full_link = str(sitelink)+str("password-reset/")+str(token)

#     print(token)
#     print(full_link)

#     context = {
#         'full_link': full_link,
#         'email_adress': reset_password_token.user.email
#     }

#     html_message = render_to_string("authentication/email.html", context=context)
#     plain_message = strip_tags(html_message)

#     msg = EmailMultiAlternatives(
#         subject = "Request for resetting password for {title}".format(title=reset_password_token.user.email), 
#         body=plain_message,
#         from_email = "sender@example.com", 
#         to=[reset_password_token.user.email]
#     )

#     msg.attach_alternative(html_message, "text/html")
#     msg.send()
from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.urls import reverse
from django.template.loader import render_to_string
from django.core.mail import EmailMultiAlternatives
from django.utils.html import strip_tags
from django_rest_passwordreset.signals import reset_password_token_created
import os


from django.core.validators import FileExtensionValidator




def user_profile_picture_path(instance, filename):
    # file will be uploaded to MEDIA_ROOT/profile_pics/user_<id>/<filename>
    return f'profile_pics/user_{instance.user.id}/{filename}'

class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('Users must have an email address')
        
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self.create_user(email, password, **extra_fields)

class CustomUser(AbstractUser):
    email = models.EmailField(unique=True, blank=False, null=False)
    username = models.CharField(max_length=150, unique=False, blank=True, null=True)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []
    objects = CustomUserManager()
    
    def __str__(self):
        return self.username or self.email

class Profile(models.Model):
    user = models.OneToOneField(
        CustomUser,
        on_delete=models.CASCADE,
        related_name='profile'
    )
    profile_picture = models.ImageField(
        upload_to=user_profile_picture_path,
        blank=True,
        null=True,
        default='profile_pics/default.png'
    )
    bio = models.TextField(max_length=500, blank=True)
    phone_number = models.CharField(max_length=20, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'{self.user.email} Profile'

    @property
    def profile_picture_url(self):
        if self.profile_picture and hasattr(self.profile_picture, 'url'):
            return self.profile_picture.url
        return '/media/profile_pics/default.png'

@receiver(post_save, sender=CustomUser)
def create_or_update_user_profile(sender, instance, created, **kwargs):
    """Automatically create/update profile when user is created/updated"""
    if created:
        Profile.objects.create(user=instance)
    else:
        try:
            instance.profile.save()
        except Profile.DoesNotExist:
            Profile.objects.create(user=instance)

@receiver(reset_password_token_created)
def password_reset_token_created(sender, instance, reset_password_token, **kwargs):
    sitelink = "http://localhost:5173/"
    token = reset_password_token.key
    full_link = f"{sitelink}password-reset/{token}"

    context = {
        'full_link': full_link,
        'email_address': reset_password_token.user.email
    }

    html_message = render_to_string("authentication/email.html", context=context)
    plain_message = strip_tags(html_message)

    msg = EmailMultiAlternatives(
        subject=f"Password Reset for {reset_password_token.user.email}",
        body=plain_message,
        from_email="noreply@yourdomain.com",
        to=[reset_password_token.user.email]
    )

    msg.attach_alternative(html_message, "text/html")
    msg.send()




#image for the uploading
class UserPhoto(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='photos')
    image = models.ImageField(
        upload_to='user_photos/%Y/%m/%d/',  # Organizes by date
        validators=[FileExtensionValidator(allowed_extensions=['jpg', 'jpeg', 'png'])]
    )
    created_at = models.DateTimeField(auto_now_add=True)
    caption = models.CharField(max_length=255, blank=True)

    class Meta:
        ordering = ['-created_at']  # Newest first

    def __str__(self):
        return f"Photo by {self.user.username} at {self.created_at}"