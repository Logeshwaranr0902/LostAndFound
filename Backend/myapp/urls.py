# your_app/urls.py
from django.urls import path
from .views import *

urlpatterns = [
    path('register/', register, name='register'),
    path('login/', login,name='login'),
    path('lost-product-ad/',create_lost_product_ad,name="lostproductad"),
    path('view-lost-product/',LostProductAdListView.as_view(),name='getlostproduct'),
    path('delete-product/<int:id>/', delete_lost_product, name='deleteproduct'),
    path('update-product/<int:id>/', update_lost_product, name='updateproduct'),
]
