
import email
from rest_framework import status
from .serializers import CategorySerializer, FoodSerializer
from .models import *
from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response

# Create your views here.

from django.contrib.auth import authenticate
@api_view(['POST'])
def admin_login_api(request):
    username = request.data.get('username')
    password = request.data.get('password')

    user = authenticate(username=username, password=password)

    if user is not None and user.is_staff:
        return Response({'message':"Login Successfull", 'username': username}, status=200)
    else:
        return Response({'message':"Invalid Credentials"}, status=401)


@api_view(['POST'])
def add_category(request):
    category_name = request.data.get('category_name')

    Category.objects.create(category_name = category_name)

    return Response({'message':"Category has been added"}, status=201)


@api_view(['GET'])
def list_category(request):
    categories = Category.objects.all()
    serializer = CategorySerializer(categories, many=True)
    print('categories : ', categories)
    print('serializer : ', serializer)
    return Response(serializer.data)

from rest_framework.parsers import MultiPartParser, FormParser     # MultiPartParser --> images/pdf/videos and formParser --> only contain text
from rest_framework.decorators import parser_classes
@api_view(['POST'])
@parser_classes([MultiPartParser, FormParser])
def add_food_item(request):
    serializer = FoodSerializer(data=request.data)   # fronted data store in data and FoodSerializer will create in objects and than store in serializer
    if serializer.is_valid():
        serializer.save()
        return Response({'message': "Food Item has been added"}, status=201)
    return Response(serializer.errors, status=400)

@api_view(['GET'])
def manage_food(request):
    foods = Food.objects.all()
    serializer = FoodSerializer(foods, many=True)
    print(serializer)
    return Response(serializer.data)  # Get converted JSON data

@api_view(['GET'])
def food_search(request):
    query = request.GET.get('q', '')
    food = Food.objects.filter(item_name__icontains=query)
    serializer = FoodSerializer(food, many=True)
    return Response(serializer.data)

import random
@api_view(['GET'])
def random_foods(request):
    foods = list(Food.objects.all())
    random.shuffle(foods)
    limited_foods = foods[0:9]
    # print(limited_foods)
    serializer = FoodSerializer(limited_foods, many=True)
    return Response(serializer.data)

from django.contrib.auth.hashers import make_password
@api_view(['POST'])
def register(request):
    firstname = request.data.get('firstName')
    lastname = request.data.get('lastName')
    mobile = request.data.get('mobileNumber')
    email = request.data.get('email')
    password = request.data.get('password')

    # Optional: basic validation
    if not all([firstname, lastname, mobile, email, password]):
        return Response({'message': 'All fields are required'}, status=400)

    if User.objects.filter(email=email).exists() or User.objects.filter(mobile=mobile).exists():
        return Response({'message': 'Email or mobile already registered'}, status=400)

    User.objects.create(
        first_name=firstname,
        last_name=lastname,
        email=email,
        mobile=mobile,
        password=make_password(password)
    )

    return Response({'message': 'User Registered successfully'}, status=201)

from django.contrib.auth.hashers import check_password
from django.db.models import Q
@api_view(['POST'])
def login_user(request):
    identifier = request.data.get('emailCont')   # data get from request
    password = request.data.get('password')

    # ✅ 1. Input validation
    if not identifier or not password:
        return Response({'message': 'Email/Mobile and Password required'}, status=400)

    user = User.objects.filter(Q(email=identifier) | Q(mobile=identifier)).first()

    # ✅ 3. Check user exists
    if not user:
        return Response({'message': 'Invalid Credentials'}, status=401)

    # ✅ 4. Check password
    if not check_password(password, user.password):
        return Response({'message': 'Invalid Credentials'}, status=401)

    # ✅ 5. Success response
    return Response({
        'message': 'Login Successful',
        'userId': user.id,
        'userName': f'{user.first_name} {user.last_name}'
    }, status=200)

from django.shortcuts import get_object_or_404
@api_view(['GET'])
def food_details(request,id):
    # food = Food.objects.get(id=id)
    food = get_object_or_404(Food, id=id)   # or
    serializer = FoodSerializer(food) # not many because id has only one data
    return Response(serializer.data)

@api_view(['POST'])
def add_to_cart(request):
    user_id = request.data.get('userId')
    food_id = request.data.get('foodId')

    try :
        user = User.objects.get(id=user_id)
        food = Food.objects.get(id=food_id)

        order, created=Order.objects.get_or_create(
            user=user,
            food=food,
            is_order_placed = False,
            defaults = {'quantity':1}
        )
        if not created:
            order.quantity += 1
            order.save()
        return Response({'message':'Food Added Successfully'}, status=200)
    except:
        return Response({'message': 'Something went wrong'}, status=401)


from .serializers import CartOrderSerializer
@api_view(['GET'])
def get_cart_item(request, user_id):
    orders = Order.objects.filter(user_id=user_id, is_order_placed=False).select_related('food')
    serializer = CartOrderSerializer(orders, many=True)
    return Response(serializer.data)

@api_view(['PUT'])
def update_cart_quantity(request):
    order_id = request.data.get('orderId')
    quantity = request.data.get('quantity')

    if quantity < 1:
        return Response({'message': 'Invalid quantity'}, status=400)

    try:
        order = Order.objects.get(id=order_id, is_order_placed=False)
        order.quantity = quantity
        order.save()
        return Response({'message': 'Quantity updated successfully'}, status=200)

    except Order.DoesNotExist:
        return Response({'message': 'Order not found'}, status=404)

@api_view(['DELETE'])
def delete_cart_item(request, order_id):
    try :
        order = Order.objects.get(id=order_id, is_order_placed=False)
        order.delete()
        return Response({'message': 'Quantity deleted successfully'}, status=200)
    except Order.DoesNotExist:
        return Response({'message': 'Order not found'}, status=404)


def make_unique_order_number():
    while True:
        num = str(random.randint(100000000, 999999999))
        if not OrderAddress.objects.filter(order_number=num).exists():
            return num

@api_view(['POST'])
def place_order(request):
    user_id = request.data.get('userId')
    address = request.data.get('address')
    paymentMode = request.data.get('paymentMode')
    cardNumber = request.data.get('cardNumber')
    expiry = request.data.get('expiry')
    cvv = request.data.get('cvv')

    try:
        orders = Order.objects.filter(user_id=user_id, is_order_placed=False)

        order_number = make_unique_order_number()

        OrderAddress.objects.create(
            user_id = user_id,
            order_number = order_number,
            address = address
        )

        PaymentDetails.objects.create(
            user_id = user_id,
            order_number = order_number,
            payment_mode = paymentMode,
            card_number = cardNumber if paymentMode == 'online' else None,
            expiry_date = expiry if paymentMode == 'online' else None,
            cvv = cvv if paymentMode == 'online' else None
        )

        orders.update(order_number=order_number, is_order_placed=True)

        return Response({'message':f'Order placed successfully!! order no:{order_number}'}, status=201)

    except Order.DoesNotExist:
        return Response({'message':f'Order not found'}, status=401)
    
from .serializers import MyOrderSerializers
@api_view(['GET'])
def user_orders(request, user_id):
    orders = OrderAddress.objects.filter(user_id=user_id).order_by('order_time')
    print('orders: ',orders[0])
    serializer = MyOrderSerializers(orders, many=True)
    print('serializer: ',serializer)
    return Response(serializer.data)


from .serializers import OrderSerializers
@api_view(['GET'])
def order_by_order_number(request, order_number):
    orders = Order.objects.filter(order_number = order_number, is_order_placed=True).select_related('food')
    serializer = OrderSerializers(orders,many=True)
    return Response(serializer.data)

from .serializers import OrderAddressSeraializers
@api_view(['GET'])
def get_order_address(request, order_number):
    address = OrderAddress.objects.get(order_number=order_number)
    serializer = OrderAddressSeraializers(address)
    return Response(serializer.data)


from django.shortcuts import render
def generate_invoice(request, order_number):
    orders = Order.objects.filter(order_number=order_number, is_order_placed=True).select_related('food')
    print("Orders data: ",orders)
    address = OrderAddress.objects.get(order_number=order_number)
    print("Address Data: ",address)

    grand_total = 0
    order_data = []

    for order in orders:
        total_price = order.food.item_price * order.quantity
        grand_total += total_price
        order_data.append({
            'food' : order.food,
            'quantity' : order.quantity,
            'total_price' : total_price,
        })
    print("Order_data: ", order_data)

    return render(request, 'invoice.html',{
        'order_number' : order_number,
        'order_data' : order_data,
        'delivery_address' : address,
        'grand_total' : grand_total,
        'orders' : orders
    })

from .serializers import UserSerializer
@api_view(['GET'])
def get_user_profile(request,user_id):
    user = User.objects.get(id=user_id)
    serializer = UserSerializer(user)
    return Response(serializer.data)

@api_view(['PUT'])
def update_user_profile(request, user_id):
    user = User.objects.get(id=user_id)
    serializer = UserSerializer(user, data=request.data, partial=True) # partial true because we want to update only one or two fields not all

    if serializer.is_valid():
        serializer.save()
        return Response({'message':f'Profile Update successfully {user.first_name}'}, status=200)
    return Response(serializer.errors, status=400)

@api_view(['POST'])
def change_password(request, user_id):
    current_password = request.data.get('currentPassword')
    new_password = request.data.get('newPassword')

    user = User.objects.get(id = user_id)
    print('user: ', user)
    if not check_password(current_password, user.password):   # check_password --> current password and user password match or not if not match than return false and if match than return true
        return Response({'message':'Current Password is incorrect'}, status=400)
    serializer = make_password(new_password)   # make_password --> new password hash me convert kar dega and uske baad save karna hai user model me
    print('serializer: ',serializer)
    user.save()
    return Response({'message':'Password change successfully!'}, status=200)