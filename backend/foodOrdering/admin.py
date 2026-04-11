from foodOrdering.models import *
from django.contrib import admin

# Register your models here.

admin.site.register(User)
admin.site.register(Category)
admin.site.register(Food)
admin.site.register(Order)