from rest_framework import serializers
from .models import *

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()
    
class LostProductAdSerializer(serializers.ModelSerializer):
    class Meta:
        model = LostProductAd
        fields = "__all__"
        read_only_fields = ['user', 'product_image']  # Make product_image read-only
class LostProductAdSelfSerializer(serializers.ModelSerializer):
    class Meta:
        model = LostProductAdSelf
        fields = "__all__"
        read_only_fields = ['user', 'product_image']  # Make product_image read-only


# serializers.py
class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = ['id', 'message', 'created_at', 'is_read']