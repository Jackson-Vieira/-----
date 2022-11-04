from django.urls import path, include
from . import views

app_name = 'secret'

urlpatterns = [
    path("password-generator/", views.PasswordAPIView.as_view(), name="password-generator"),
    path("binary/", views.BinaryAPIView.as_view(), name="to-binary"),
    path("cifra-cesar/", views.CifraAPIVIew.as_view(), name="to-cifra-cesar"),
    path('points/', views.PointsAPIView.as_view(), name='to-points'),
    path('salsa20/', views.CSAPIView.as_view(), name='to-salsa20'),
    path('', views.index, name='index')
    ]