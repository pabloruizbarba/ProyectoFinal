from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
import json
import jwt
import hashlib
from webserviceapp.models import Devices, Playlists
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
def add_device(request):
    """Add a new device to database"""

    # Check if the method is POST
    if request.method != 'POST':
        return HttpResponse("Method Not Allowed", status=405)

    data = json.loads(request.body)
    
    try:
        device = Devices() 
        # Check if the device is already registered
        if Devices.objects.filter(name=data['name']).exists():
            return HttpResponse("A device with that name already exists", status=409)
        else: 
            device.name=data['name']

        device.code = data['code']

        # Check if there is data for id_playlist
        device.id_playlist=Playlists.objects.get(id_playlist=data["id_playlist"]) if "id_playlist" in data else None
     
        device.save()
        return HttpResponse("Device created", status=201)
    except:
        return HttpResponse('Bad request - Missed or incorrect params', status=400)

def encrypt_string(hash_string):
        sha_signature = \
            hashlib.sha256(hash_string.encode()).hexdigest()
        return sha_signature

@csrf_exempt
def add_playlist(request):
    """Add a new playlist to database"""

    # Check if the method is POST
    if request.method != 'POST':
        return HttpResponse("Method Not Allowed", status=405)

    data = json.loads(request.body)

    try:
        playlist = Playlists() 
        playlist.title = data['title']

        sha_code = encrypt_string(playlist.title)
        
        # Check if the playlist is already registered
        
        if Playlists.objects.filter(hash_list=sha_code).exists():
            return HttpResponse("The playlist already exists", status=409)
        else: 
            playlist.hash_list=sha_code

        playlist.save()
        return HttpResponse("Device created", status=201)
    except:
        return HttpResponse('Bad request - Missed or incorrect params', status=400)  