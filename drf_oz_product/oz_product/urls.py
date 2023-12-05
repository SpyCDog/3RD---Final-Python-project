from django.urls import path
from . import views
urlpatterns = [
    # product - for list of products and create product.
    path('product', views.products, name="products"), 
    path('product/<id>', views.product_detail, name="product_detail"), 
    path('category', views.categories, name="categories"),    
    path('cart', views.cart, name="cart"),
    path('add_to_cart', views.add_to_cart, name="add_to_cart"),
    path('delete_from_cart', views.delete_from_cart, name="delete_from_cart"),
    
        
]