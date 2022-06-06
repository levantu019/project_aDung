from django.urls import path
from . import views

urlpatterns = [
    path('', views.IndexClass.as_view(), name='index'),
    path('icon/<str:code>', views.GetIcon, name='icons'),
]