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
    path('cart/update_quantity', update_cart_quantity),
    path('cart/delete/<int:order_id>/', delete_cart_item),
    path('place_order/', place_order),
    path('orders/<int:user_id>/', user_orders),
    path('orders/by_order_number/<str:order_number>/', order_by_order_number),   # str because model is declared by str
    path('order_address/<str:order_number>/', get_order_address),
    path('invoice/<str:order_number>/', generate_invoice),
    path('user/<int:user_id>/', get_user_profile),
    path('user/update/<int:user_id>/',update_user_profile),
    path('change_password/<int:user_id>/', change_password),

]