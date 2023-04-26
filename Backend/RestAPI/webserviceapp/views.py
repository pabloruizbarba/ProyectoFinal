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

     
@csrf_exempt
def assign_playlist(request):
    """Assign a playlist to a device"""

    # Check if the method is POST
    if request.method != 'POST':
        return HttpResponse("Method Not Allowed", status=405)
    
    data = json.loads(request.body)
    try:
        device = Devices()
        device = Devices.objects.get(id_device=data['id_device'])
        device.id_playlist=Playlists.objects.get(id_playlist=data["id_playlist"])
        device.save()
        return HttpResponse("Playlist assigned to device", status=201)
    except:
        return HttpResponse('Bad request - Missed or incorrect params', status=400)


@csrf_exempt
def delete_playlist(request):
    """Delete a playlist from database"""

    # Check if the method is DELETE
    if request.method != 'DELETE':
        return HttpResponse("Method Not Allowed", status=405)
    
    data = json.loads(request.body)
    print(data['id_playlist'])
    playlist = Playlists()
    try:
         #Search for id_playlist at the table
        playlist = Playlists.objects.get(id_playlist=data['id_playlist'])
        if Devices.objects.filter(id_playlist=data['id_playlist']).exists():
            return HttpResponse("The playlist is being used", status=404)
        else:
            print(playlist)
            # Delete row
            playlist.delete()
            return HttpResponse("Deleted successfully", status=200)
    except:
        return HttpResponse('Element not found', status=404)
    
    
        

