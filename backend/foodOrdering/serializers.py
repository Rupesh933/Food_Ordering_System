from dataclasses import field
from .models import *
from rest_framework import serializers

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'category_name', 'creation_date']

class FoodSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.category_name', read_only = True)
    image = serializers.ImageField(required = False)
    is_available = serializers.BooleanField(required=False, default=True)
    class Meta:
        model = Food 
        fields = ['id', 'category', 'category_name', 'item_name', 'item_price', 'item_description', 'image', 'item_quantity', 'is_available']

class CartOrderSerializer(serializers.ModelSerializer):
    food = FoodSerializer()  # to access food model
    class Meta:
        model = Order
        fields = ['id', 'food', 'quantity']