from django.db import models

# Create your models here.
class User(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=15)
    address = models.TextField()
    password = models.CharField(max_length=100)

    def __str__(self):
        return self.name
    
class LostProductAd(models.Model):
    product_name = models.CharField(max_length=255)
    product_description = models.TextField()
    product_category = models.CharField(max_length=100)
    product_location = models.CharField(max_length=255)
    product_image = models.ImageField(upload_to="lost_products/")
    date_found = models.DateField()
    time_found = models.TimeField()
    email = models.EmailField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.product_name
