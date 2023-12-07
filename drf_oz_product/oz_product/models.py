from django.db import models
from django.contrib.auth.models import AbstractUser
from django.conf import settings


class MyUser(AbstractUser):
    pass

class Product(models.Model):
    image = models.ImageField(upload_to='product_images/', blank=True, null=True)
    category = models.ForeignKey('Category',on_delete=models.CASCADE, related_name='products')
    name = models.CharField(max_length=100, null=False)
    description = models.CharField(max_length=200)
    price = models.DecimalField(max_digits=16, decimal_places=2)
    stock = models.IntegerField(default=0)

    def __str__(self):
        return f'{self.name}'
    
class Cart(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='cart')
    created_at = models.DateTimeField(auto_now_add=True)
    
class CartItem(models.Model):
    cart = models.ForeignKey(Cart, related_name='items', on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=1)



class Category(models.Model):  
    name = models.CharField(max_length=100, null=False)
    description = models.CharField(max_length=200)
    
    def __str__(self):
        return f'{self.name}'

