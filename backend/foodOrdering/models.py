from django.db.models import CASCADE
from django.db import models

# Create your models here.

class User(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    email = models.EmailField(max_length=50, unique=True, null=True)
    mobile = models.CharField(max_length=15)
    password = models.CharField(max_length=20)
    register_date = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return f'{self.first_name} {self.last_name}'

class Category(models.Model):
    category_name = models.CharField(max_length=50)
    creation_date = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return self.category_name

class Food(models.Model):
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    item_name = models.CharField(max_length=50)
    item_price = models.DecimalField(max_digits=10, decimal_places=2)
    item_description = models.TextField()
    image = models.ImageField(upload_to='food_image', null=True)
    item_quantity = models.CharField(max_length=50)
    is_available = models.BooleanField(default=False)

    def __str__(self) -> str:
        return f'{self.item_name} {self.item_quantity}'
        

class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    food = models.ForeignKey(Food, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)
    is_order_placed = models.BooleanField(default=False)
    order_number = models.CharField(max_length=100, null=True)

    def __str__(self) -> str:
        return f'{self.order_number} ({self.user})'

class OrderAddress(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    order_number = models.CharField(max_length=100, null = True)
    address = models.TextField()
    order_time = models.DateTimeField(auto_now_add=True)
    order_find_status = models.CharField(max_length=200, null=True)

    def __str__(self):
        return f'{self.order_number} ({self.user})'

class FoodTracking(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    remark = models.CharField(max_length=200, null=True)
    status = models.CharField(max_length=200, null=True)
    status_date = models.DateTimeField(auto_now_add=True)
    order_cancelled_by_user = models.BooleanField(null=True)

    def __str__(self):
        return f'{self.order} - {self.status}'

class PaymentDetails(models.Model):
    PAYMENT_CHOICE = [
        ('cod', 'cash on delivery'),
        ('online', 'online payment')
    ]
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    order_number = models.CharField(max_length=100, null=True)
    payment_mode = models.CharField(max_length=20, choices=PAYMENT_CHOICE)
    expiry_date = models.CharField(max_length=20, null=True)

    # "If you store card data, you are responsible for protecting it. If you use a payment gateway, they are responsible."
    card_number = models.CharField(max_length=20, null=True, blank=True)   # hacker gets your real card details 
    cvv = models.CharField(max_length=5, null=True)   # This is called a data breach and it's illegal in most countries.
    payment_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.order_number} - ({self.payment_mode})'

class Review(models.Model):
    user = models.ForeignKey(User, on_delete=CASCADE)
    food = models.ForeignKey(Food, on_delete=CASCADE)
    rating = models.PositiveIntegerField(default=1)
    comm = models.TextField(null=True)

    def __str__(self):
        return f'Review by {self.user.first_name} - {self.food.item_name} - {self.rating} stars'

class wishlist(models.Model):
    user = models.ForeignKey(User, on_delete=CASCADE)
    food = models.ForeignKey(Food, on_delete=CASCADE)
    added_food_on = models.DateTimeField(auto_now_add=True, null=True)

    class Meta:
        unique_together = ('user', 'food')

    def __str__(self):
        return f'{self.user.first_name} {self.food.item_name}'
