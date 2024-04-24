from django.contrib import admin
from django.urls import path
from . import views
from .views import ContactView, SuccessView, ReviewView, LocationView

# URL Config for the PetWatch Application

urlpatterns = [
    path('', views.login, name="login"),
    path('/', views.index, name="index"),
    path('about/', views.about, name="about"),
    path("contact/", ContactView.as_view(), name="contact"),
    path("success/", SuccessView.as_view(), name="success"),
    path('watch/', views.watch, name="watch"),
    path('locations/', LocationView.as_view(), name="locations"),
    path('reviews/', ReviewView.as_view(), name="reviews"),
    path('myaccount/', views.account, name="account"),
    path('blog/', views.blog, name="blog"),
]

# App name
app_name = "PetWatchApp"