"""
URL configuration for RestAPI project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
import webserviceapp.views as views

urlpatterns = [
    path('admin/', admin.site.urls),
    # Devices
    path('v1/add-device/', views.add_device),
    path('v1/delete-device/', views.delete_device),
    path('v1/view-devices/', views.view_devices),
    # Playlists
    path('v1/add-playlist/', views.add_playlist),
    path('v1/delete-playlist/', views.delete_playlist),
    path('v1/view-playlists/', views.view_playlists),
    # Files
    path('v1/add-file/', views.add_file),
    path('v1/delete-file/', views.delete_file),
    # Assign
    path('v1/assign-playlist/', views.assign_playlist),
    path('v1/assign-file/', views.assign_file)
]
