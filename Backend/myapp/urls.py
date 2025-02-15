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
    path('reglostpage/',reglostpage,name='reglostpage'),
    path('view-lost-product/view-inventory/',inventory_view,name='inventoryview'),
    path('check-for-matches/', check_for_matches, name='check_for_matches'),
    path('get-notifications/',get_notifications,name='get_notifications'),
    path('delete-notification/<int:id>/', delete_notification, name='delete_notification'),
    path('update-lost-product-self/<int:id>/', update_lost_product_self, name='update_lost_product_self'),
    path('delete-lost-product-self/<int:id>/', delete_lost_product_self, name='delete_lost_product_self'),

]
