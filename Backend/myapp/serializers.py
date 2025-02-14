from rest_framework import serializers
from .models import *

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['name', 'email', 'phone', 'address', 'password']


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()
    
class LostProductAdSerializer(serializers.ModelSerializer):
    class Meta:
        model = LostProductAd
        fields = "__all__"


    