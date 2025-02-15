# your_app/views.py
from django.http import HttpResponse
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
            return Response({'message': 'Login successful!','access_token': access_token,'user_name':user.name,'email':email}, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



@api_view(["POST"])
def create_lost_product_ad(request):
    
    email = request.data.get('email')

    if email:
        user = User.objects.filter(email=email).first()
    serializer = LostProductAdSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(user=user)
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
def delete_lost_product(request, id):
    try:
        product = LostProductAd.objects.get(id=id)
        product.delete()
        return Response({"message": "Product deleted successfully"}, status=status.HTTP_200_OK)
    except LostProductAd.DoesNotExist:
        return Response({"error": "Product not found"}, status=status.HTTP_404_NOT_FOUND)
    

@api_view(["POST"])
def reglostpage(request):
    email = request.data.get('email')
    if email:
        user = User.objects.filter(email=email).first()
    serializer = LostProductAdSelfSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(user=user)
        lost_product = serializer.instance
        similar_products = LostProductAd.objects.filter(
            Q(product_name__icontains=lost_product.product_name) |
            Q(product_description__icontains=lost_product.product_description) |
            Q(product_category__icontains=lost_product.product_category) |
            Q(product_location__icontains=lost_product.product_location)
        )
        for product in similar_products:
            Notification.objects.create(
                user=user,
                message=f"A similar product '{product.product_name}' was found in the inventory."
            )
        return Response({"message": "Lost product ad registered successfully!", "data": serializer.data}, status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# views.py
@api_view(["GET"])
def get_notifications(request):
    email = request.headers.get('email') or request.query_params.get('email')
    if not email:
        return Response({"error": "Email is required"}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        user = User.objects.get(email=email)
        notifications = Notification.objects.filter(user=user, is_read=False).order_by('-created_at')
        serializer = NotificationSerializer(notifications, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except User.DoesNotExist:
        return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)

@api_view(["GET"])
def inventory_view(request):
    # Retrieve the email from the request headers or query parameters
    email = request.headers.get('email') or request.query_params.get('email')
    
    if not email:
        return Response({"error": "Email is required"}, status=status.HTTP_400_BAD_REQUEST)

    try:
        # Find the user with the given email
        user = User.objects.get(email=email)
        
        # Fetch all LostProductAd entries associated with this user (reported ads)
        reported_products = LostProductAd.objects.filter(user=user)
        
        # Fetch all LostProductAdSelf entries associated with this user (user's lost product ads)
        lost_products = LostProductAdSelf.objects.filter(user=user)
        
        # Serialize the data
        reported_serializer = LostProductAdSerializer(reported_products, many=True)
        lost_serializer = LostProductAdSelfSerializer(lost_products, many=True)
        
        # Return the serialized data
        return Response({
            "reported_products": reported_serializer.data,
            "lost_products": lost_serializer.data,
        }, status=status.HTTP_200_OK)
    
    except User.DoesNotExist:
        return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(["PUT"])
def update_lost_product(request, id):
    try:
        product = LostProductAd.objects.get(id=id)
        print("Product before update:", product.__dict__) 
        serializer = LostProductAdSerializer(product, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            print("Product after update:", product.__dict__)
            return Response(serializer.data, status=status.HTTP_200_OK)
        print("Serializer errors:", serializer.errors) 
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except LostProductAd.DoesNotExist:
        return Response({"error": "Product not found"}, status=status.HTTP_404_NOT_FOUND)
    
# views.py
@api_view(["GET"])
def check_for_matches(request):
    email = request.headers.get('email') or request.query_params.get('email')
    if not email:
        return Response({"error": "Email is required"}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        user = User.objects.get(email=email)
        
        # Fetch all lost and found products
        lost_products = LostProductAdSelf.objects.filter(user=user)
        found_products = LostProductAd.objects.all()

        matches_found = False

        for lost_product in lost_products:
            for found_product in found_products:
                # Check for matches based on product name, category, or location
                if (
                    lost_product.product_name.lower() in found_product.product_name.lower() or
                    lost_product.product_category.lower() == found_product.product_category.lower() or
                    lost_product.product_location.lower() == found_product.product_location.lower()
                ):
                    # Create a notification for the user
                    Notification.objects.create(
                        user=user,
                        message=f"A similar product '{found_product.product_name}' was found in the inventory."
                    )
                    matches_found = True

        if matches_found:
            return Response({"message": "New matches found! Check your notifications."}, status=status.HTTP_200_OK)
        else:
            return Response({"message": "No new matches found."}, status=status.HTTP_200_OK)

    except User.DoesNotExist:
        return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
    
@api_view(["DELETE"])
def delete_notification(request, id):
    try:
        notification = Notification.objects.get(id=id)
        notification.delete()
        return Response({"message": "Notification deleted successfully"}, status=status.HTTP_200_OK)
    except Notification.DoesNotExist:
        return Response({"error": "Notification not found"}, status=status.HTTP_404_NOT_FOUND)

@api_view(["PUT"])
def update_lost_product_self(request, id):
    try:
        product = LostProductAdSelf.objects.get(id=id)
        serializer = LostProductAdSelfSerializer(product, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except LostProductAdSelf.DoesNotExist:
        return Response({"error": "Product not found"}, status=status.HTTP_404_NOT_FOUND)

@api_view(["DELETE"])
def delete_lost_product_self(request, id):
    try:
        product = LostProductAdSelf.objects.get(id=id)
        product.delete()
        return Response({"message": "Product deleted successfully"}, status=status.HTTP_200_OK)
    except LostProductAdSelf.DoesNotExist:
        return Response({"error": "Product not found"}, status=status.HTTP_404_NOT_FOUND)