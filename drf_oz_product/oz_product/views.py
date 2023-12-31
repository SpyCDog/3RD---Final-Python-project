from rest_framework import status
from .models import Cart, Category, Product, CartItem, MyUser
from .serializers import CartSerializer, ProductSerializer, CategorySerializer, CartItemSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication


@api_view(['GET', 'POST'])
def products(request):
    if request.method == 'GET':
        search = request.GET.get('search')
        maxprice = request.GET.get('maxprice')
        category = request.GET.get('category')
        all_products = Product.objects.all()
        # search all product that name contains search parameter
        if search:
            all_products = all_products.filter(name__contains=search)
        # search all product that price <= maxprice (price__lte=maxprice)
        if maxprice:
            all_products = all_products.filter(price__lte=maxprice)
        if category:
            all_products = all_products.filter(category__id=category)

        serializer = ProductSerializer(all_products, many=True).data
        return Response(serializer)
    elif request.method == 'POST':
        # this line creates a serializer object from json data
        serializer = ProductSerializer(data=request.data)
        # this line checkes validity of json data
        if serializer.is_valid():
            # the serializer.save - saves a new product object
            serializer.save()
            # returns the object that was created including id
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        # if not valid. return errors.
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



@api_view(['GET', 'POST'])
def categories(request):
    search = request.GET.get('search')
    all_categories = Category.objects.all()
    if search:
        all_categories = all_categories.filter(name__contains=search)
    serializer = CategorySerializer(all_categories, many=True).data
    return Response(serializer)


@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
@api_view()
def cart(request):
        try:
            cart = Cart.objects.get(user=request.user)
            cart.save()
            serializer = CartSerializer(cart)
            return Response(serializer.data)
        except Cart.DoesNotExist:
            return Response({'detail': 'Cart not found.'}, status=status.HTTP_404_NOT_FOUND)
        
        

@api_view(['POST'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])

def add_to_cart(request):
    product_id = request.data.get('product_id')
    quantity = request.data.get('quantity', 1)
    if request.method == 'POST':
        try:
            product = Product.objects.get(pk=product_id)
            cart, _ = Cart.objects.get_or_create(user=request.user)
            cart_item, created = CartItem.objects.get_or_create(cart=cart, product=product)
            if not created:
                cart_item.quantity += int(quantity)
                serializer = CartItemSerializer(cart_item)
            else:
                serializer = CartSerializer(cart)
                cart_item.quantity = int(quantity)
            cart_item.save()
            cart.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except Product.DoesNotExist:
            return Response({'Product not found.(backend - add_to_cart)'}, status=status.HTTP_404_NOT_FOUND)
        
        
@api_view(['DELETE'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])

def delete_from_cart(request, id):
    try:
        cart_item = CartItem.objects.get(id=id, cart__user=request.user)
        cart_item.delete()
        serialezer = CartItemSerializer(cart_item)
        return Response(serialezer.data, status=status.HTTP_200_OK)
    except CartItem.DoesNotExist:
            return Response({'detail': 'Cart item not found.'}, status=status.HTTP_404_NOT_FOUND)
        
        
        
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
@api_view(['DELETE'])
def delete_cart(request, id):
    try:    
        current_cart = Cart.objects.get(id=id)
        current_cart.delete()
        print(request)
        return Response({'detail': 'Cart removed.'}, status=status.HTTP_204_NO_CONTENT)
    except Cart.DoesNotExist:
            return Response({'detail': 'Cart not found.'}, status=status.HTTP_404_NOT_FOUND)
        
@api_view(['POST'])
def register(request):
    try:
        username = request.data.get('username')
        password = request.data.get('password')
        email = request.data.get('email')
        
        user_exist = MyUser.objects.filter(email=email).exists()
        if user_exist:
            return Response({'error': 'Email already in use.'})
        else:
            # Create the new user
            new_user = MyUser.objects.create_user(username=username, email=email, password=password)
            new_user.save()

        # Return a successful response
        return Response({'messege': 'Register successfully!!!'}, status=status.HTTP_201_CREATED)
    
    except Exception as e:
        # Return a response with an error message
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
@api_view(['PUT'])
def increase_quantity(request, id):
    print(request)
    try:
        cart_item = CartItem.objects.get(id=id)
        cart_item.quantity += 1 
        cart_item.save()
        serialezer = CartItemSerializer(cart_item)
        return Response(serialezer.data, status=status.HTTP_200_OK)
    except CartItem.DoesNotExist:
        return Response({'detail': 'Cart item not found.'}, status=status.HTTP_404_NOT_FOUND)


@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
@api_view(['PUT'])
def decrease_quantity(request, id):
    print(request)
    try: 
        cart_item = CartItem.objects.get(id=id)
        if cart_item.quantity > 1:
            cart_item.quantity -= 1        
        cart_item.save()
        serialezer = CartItemSerializer(cart_item)
        return Response(serialezer.data, status=status.HTTP_200_OK)
    except CartItem.DoesNotExist:
        return Response({'detail': 'Cart item not found.'}, status=status.HTTP_404_NOT_FOUND)

