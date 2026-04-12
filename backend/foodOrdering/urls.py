from django.urls import path 
from .views import * 

urlpatterns = [
    path('admin-login/', admin_login_api),
    path('add-category/', add_category),
    path('categories/', list_category),
    path('add-food-item/', add_food_item),
    path('manage-food/', manage_food),
    path('food_search/', food_search),
    path('random_foods/', random_foods),
    path('register/', register),
    path('login/', login_user),
    path('foods/<int:id>/', food_details),
    path('cart/add/', add_to_cart),
    path('cart/<int:user_id>/', get_cart_item),

]