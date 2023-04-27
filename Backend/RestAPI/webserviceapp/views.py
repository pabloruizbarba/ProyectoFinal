from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
import json
import jwt
import hashlib, os
from webserviceapp.models import Devices, Playlists, Files, Assign
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

    playlist = Playlists()
    try:
         #Search for id_playlist at the table
        playlist = Playlists.objects.get(id_playlist=data['id_playlist'])
        if Devices.objects.filter(id_playlist=data['id_playlist']).exists():
            return HttpResponse("The playlist is being used", status=404)
        else:
            if Assign.objects.filter(id_playlist=data['id_playlist']).exists():
                #Delete the entries of this playlist at the Assign table:
                Assign.objects.filter(id_playlist=data['id_playlist']).delete()
            # Delete row
            playlist.delete()
            return HttpResponse("Deleted successfully", status=200)
    except:
        return HttpResponse('Element not found', status=404)
    

@csrf_exempt
def delete_device(request):
    """Delete a device from database"""

    # Check if the method is DELETE
    if request.method != 'DELETE':
        return HttpResponse("Method Not Allowed", status=405)
    
    data = json.loads(request.body)
    
    device = Devices()
    try:
         #Search for id_device at the table
        device = Devices.objects.get(id_device=data['id_device'])
        
        # Delete row
        device.delete()
        return HttpResponse("Deleted successfully", status=200)
    except:
        return HttpResponse('Element not found', status=404) 
        

@csrf_exempt
def view_playlists(request):
    """View all the playlists from database"""
    
    # Check if the method is GET
    if request.method != 'GET':
        return HttpResponse("Method Not Allowed", status=405)
    
    try:
        listTable = Playlists.objects.all()
        lists = []

        for l in listTable:
            list = {
                "id_playlist":l.id_playlist,
                "title":l.title,
                "hash_list":l.hash_list,
            }

            lists.append(list)
    
    except:
        return HttpResponse("Bad Request - Missing path parameters", status=400)
    
    return JsonResponse(lists,json_dumps_params={'ensure_ascii':False}, safe=False,status=200) 


@csrf_exempt
def view_devices(request):
    """View all the devices from database"""
    
    # Check if the method is GET
    if request.method != 'GET':
        return HttpResponse("Method Not Allowed", status=405)
    
    try:
        screenTable = Devices.objects.all()
        screens = []
        # for each row of the table:
        for s in screenTable:
            screen = {
                "id_device":s.id_device,
                "name":s.name,
                "code":s.code,
                "id_playlist":str(s.id_playlist) if s.id_playlist else "",
            }

            screens.append(screen)
    
    except:
        return HttpResponse("Bad Request - Missing path parameters", status=400)
    
    return JsonResponse(screens,json_dumps_params={'ensure_ascii':False}, safe=False,status=200) 


def hash_file(filepath):
    sha256_hash = hashlib.sha256()
    with open(filepath,"rb") as f:
        # Read and update hash string value in blocks of 4K
        for byte_block in iter(lambda: f.read(4096),b""):
            sha256_hash.update(byte_block)
    return sha256_hash.hexdigest()       

@csrf_exempt
def add_file(request):
    """Add a new file to database"""

    # Check if the method is POST
    if request.method != 'POST':
        return HttpResponse("Method Not Allowed", status=405)

    data = json.loads(request.body) #it receives filename and type

    try:
        file = Files()
        file.filename = data['filename']
        file.type = data['type']
        file.path = "../../media/"+file.filename
        sha_code = hash_file(file.path)
    
        # Check if the file is already registered    
        if Files.objects.filter(hash_file=sha_code).exists():
            return HttpResponse("The file already exists", status=409)
        else: 
            file.hash_file=sha_code
        # Save file data into database
        file.save()
        return HttpResponse("File added to database", status=201)
    except:
        return HttpResponse('Bad request - Missed or incorrect params', status=400)
    

@csrf_exempt
def delete_file(request):
    """Delete a file from database"""

    # Check if the method is DELETE
    if request.method != 'DELETE':
        return HttpResponse("Method Not Allowed", status=405)
    
    data = json.loads(request.body)

    file = Files()
    try:
         #Search for id_file at the table
        file = Files.objects.get(id_file=data['id_file'])
        if Assign.objects.filter(id_file=data['id_file']).exists():
            return HttpResponse("The file is being used", status=404)
        else:
            # Delete row from table
            file.delete()
            return HttpResponse("Deleted successfully", status=200)
    except:
        return HttpResponse('Element not found', status=404) 
    

@csrf_exempt
def assign_file(request):
    """Assign a file to a playlist"""

    # Check if the method is POST
    if request.method != 'POST':
        return HttpResponse("Method Not Allowed", status=405)
    
    data = json.loads(request.body)
    try:
        assign = Assign()
        assign.id_playlist=Playlists.objects.get(id_playlist=data["id_playlist"])
        assign.id_file=Files.objects.get(id_file=data["id_file"])
        assign.duration=data["duration"] if "duration" in data else None
        assign.save()
        return HttpResponse("Playlist assigned to device", status=201)
    except:
        return HttpResponse('Bad request - Missed or incorrect params', status=400)