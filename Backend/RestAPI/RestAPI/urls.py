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
    path('v1/delete-device/<int:device_id>', views.delete_device),
    path('v1/view-devices/', views.view_devices),
    path('v1/view-assigned-playlist/<int:device_id>', views.view_assigned_playlist),
    # Playlists
    path('v1/add-playlist/', views.add_playlist),
    path('v1/delete-playlist/<int:playlist_id>', views.delete_playlist),
    path('v1/view-playlists/', views.view_playlists),
    path('v1/view-assigned-file/<int:playlist_id>', views.view_assigned_file),
    # Files
    path('v1/add-file/', views.add_file),
    path('v1/delete-file/<int:file_id>', views.delete_file),
    path('v1/view-files/', views.view_files),
    # Assign
    path('v1/assign-playlist/<int:device_id>', views.assign_playlist),
    path('v1/assign-file/<int:playlist_id>', views.assign_file),
    #Unassign file
    path('v1/unassign-file/<int:assign_id>', views.unassign_file),
    # Codes
    path('v1/add-code/', views.add_code),
]

