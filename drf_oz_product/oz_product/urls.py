from django.urls import path
from . import views

urlpatterns = [
    # product - for list of products and create product.
    path('product', views.products, name="products"), 
    path('category', views.categories, name="categories"),    
    path('cart', views.cart, name="cart"),
    # path('cart_item/<id>', views.cart_item, name="cart_item"),
    path('add_to_cart', views.add_to_cart, name="add_to_cart"),
    path('delete_from_cart/<id>', views.delete_from_cart, name="delete_from_cart"),
    path('delete_cart/<id>', views.delete_cart, name='delete_cart'),
    path('register', views.register, name="register"),
    path('increase_item_quantity/<id>', views.increase_quantity, name="increase_item_quantity"),
    path('decrease_item_quantity/<id>', views.decrease_quantity, name="decrease_item_quantity"),
    
    
        
]