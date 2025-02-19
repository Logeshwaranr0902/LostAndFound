from django.db import models

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
    user = models.ForeignKey(User, on_delete=models.CASCADE,default=1)  
    claim =models.BooleanField(default=False)

    def __str__(self):
        return self.product_name

class LostProductAdSelf(models.Model):
    product_name = models.CharField(max_length=255)
    product_description = models.TextField()
    product_category = models.CharField(max_length=100)
    product_location = models.CharField(max_length=255)
    product_image = models.ImageField(upload_to="lost_products/")
    date_lost = models.DateField()
    time_lost = models.TimeField()
    email = models.EmailField()
    created_at = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE,default=1)  

    def __str__(self):
        return self.product_name

# models.py
class Notification(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)

    def __str__(self):
        return f"Notification for {self.user.email}: {self.message}"