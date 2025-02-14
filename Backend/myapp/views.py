# your_app/views.py
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import *
from .serializers import *
from rest_framework.views import APIView
from django.db.models import Q
from rest_framework_simplejwt.tokens import RefreshToken

@api_view(['POST'])
def register(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        if User.objects.filter(email=serializer.validated_data['email']).exists():
            return Response({'error': 'Email already in use!'}, status=status.HTTP_400_BAD_REQUEST)
        serializer.save()
        return Response({'message': 'Registration successful!'}, status=status.HTTP_201_CREATED)

    return Response({'error': 'Invalid input!'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def login(request):
    serializer = LoginSerializer(data=request.data)
    if serializer.is_valid():
        email = serializer.validated_data['email']
        password = serializer.validated_data['password']
        try:
            user = User.objects.get(email=email, password=password)
            refresh = RefreshToken.for_user(user)
            access_token = str(refresh.access_token)
            return Response({'message': 'Login successful!','access_token': access_token}, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])

def create_lost_product_ad(request):
    serializer = LostProductAdSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LostProductAdListView(APIView):
    def get(self, request):
        search_query = request.GET.get('search', '')

        if search_query:
           
            ads = LostProductAd.objects.filter(
                Q(product_name__icontains=search_query) |
                Q(product_description__icontains=search_query) |
                Q(product_location__icontains=search_query) |
                Q(date_found__icontains=search_query) |
                Q(time_found__icontains=search_query)
            )
        else:
            
            ads = LostProductAd.objects.all()

        
        serializer = LostProductAdSerializer(ads, many=True)

        
        return Response(serializer.data, status=status.HTTP_200_OK)
    

@api_view(["DELETE"])
def delete_lost_product(request,id):
    try:
        product = LostProductAd.objects.get(id=id)
        product.delete()
        return Response({"message": "Product deleted successfully"}, status=status.HTTP_200_OK)
    except LostProductAd.DoesNotExist:
        return Response({"error": "Product not found"}, status=status.HTTP_404_NOT_FOUND)
    
@api_view(["PUT"])
def update_lost_product(request, id):
    try:
        product = LostProductAd.objects.get(id=id)

     
        serializer = LostProductAdSerializer(product, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except LostProductAd.DoesNotExist:
        return Response({"error": "Product not found"}, status=status.HTTP_404_NOT_FOUND)