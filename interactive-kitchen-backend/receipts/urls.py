from django.urls import path
from . import views

urlpatterns = [
    path('scan_receipt/', views.scan_receipt, name='scan_receipt'),
]