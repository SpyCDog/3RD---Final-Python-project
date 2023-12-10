from django.contrib import admin

# Register your models here.
from django.contrib.auth.admin import UserAdmin
from .models import MyUser, Product, Category, Cart, CartItem

admin.site.register(MyUser, UserAdmin)
admin.site.register(Product)
admin.site.register(Category)
admin.site.register(Cart)
admin.site.register(CartItem)


class CartAdmin(admin.ModelAdmin):
    list_display = ['user', 'created_at']  # Add any other fields you want to display in the admin list view

class CartItemAdmin(admin.ModelAdmin):
    list_display = ['cart', 'product', 'quantity']  # Customize as needed
