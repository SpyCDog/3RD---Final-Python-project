from rest_framework import serializers
from .models import CartItem, Category, Product, Cart

class CategorySerializer(serializers.ModelSerializer):
    # products = ProductSerializer(many=True, read_only=True)
    class Meta:
        model = Category
        fields = '__all__'

class ProductSerializer(serializers.ModelSerializer):
    # category = CategorySerializer(many=False, read_only=True)
    class Meta:
        model = Product
        fields = '__all__' 
    
        
class CartItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer(many=False, read_only=False)
    class Meta:
        model = CartItem
        fields = '__all__'
        
        
class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True, read_only=True)
    class Meta:
        model = Cart
        fields = ['id', 'user', 'items']

