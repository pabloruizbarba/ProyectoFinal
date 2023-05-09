from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.conf import settings
from django.core.files.storage import FileSystemStorage
import json
import hashlib, pathlib
from webserviceapp.models import Devices, Playlists, Files, Assign, Codes
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
        #Check if the code has already been registered by an external screen
        if Codes.objects.filter(code=data['code']).exists():
            device.code = data['code']
        else: 
            return HttpResponse("Code does not exist", status=406)

        # Check if there is data for id_playlist
        device.id_playlist=Playlists.objects.get(id_playlist=data["id_playlist"]) if "id_playlist" in data else None   

        device.description=data['description']

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
def assign_playlist(request,device_id):
    """Assign a playlist to a device"""

    # Check if the method is POST
    if request.method != 'POST':
        return HttpResponse("Method Not Allowed", status=405)
    
    data = json.loads(request.body)
    try:
        device = Devices()
        device = Devices.objects.get(id_device=device_id)
        device.id_playlist=Playlists.objects.get(id_playlist=data["id_playlist"])
        device.save()
        return HttpResponse("Playlist assigned to device", status=201)
    except:
        return HttpResponse('Bad request - Missed or incorrect params', status=400)


@csrf_exempt
def delete_playlist(request, playlist_id):
    """Delete a playlist from database"""

    # Check if the method is DELETE
    if request.method != 'DELETE':
        return HttpResponse("Method Not Allowed", status=405)
    
    playlist = Playlists()
    try:
         #Search for id_playlist at the table
        playlist = Playlists.objects.get(id_playlist=playlist_id)
        if Devices.objects.filter(id_playlist=playlist_id).exists():
            return HttpResponse("The playlist is being used", status=404)
        else:
            if Assign.objects.filter(id_playlist=playlist_id).exists():
                #Delete the entries of this playlist at the Assign table:
                Assign.objects.filter(id_playlist=playlist_id).delete()
            # Delete row
            playlist.delete()
            return HttpResponse("Deleted successfully", status=200)
    except:
        return HttpResponse('Element not found', status=404)
    

@csrf_exempt
def delete_device(request, device_id):
    """Delete a device from database"""

    # Check if the method is DELETE
    if request.method != 'DELETE':
        return HttpResponse("Method Not Allowed", status=405)
     
    device = Devices()
    try:
         #Search for id_device at the table
        device = Devices.objects.get(id_device=device_id)
        
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
                "description":s.description,
                "id_playlist":str(s.id_playlist)[18:-1] if s.id_playlist else "",
            }

            screens.append(screen)
    
    except:
        return HttpResponse("Bad Request - Missing path parameters", status=400)
    
    return JsonResponse(screens,json_dumps_params={'ensure_ascii':False}, safe=False,status=200) 


def hash_file(filepath):
    """It returns the hash of a file"""
    sha256_hash = hashlib.sha256()
    with open(filepath,"rb") as f:
        # Read and update hash string value in blocks of 4K
        for byte_block in iter(lambda: f.read(4096),b""):
            sha256_hash.update(byte_block)
    return sha256_hash.hexdigest()       


def whatType(ext):
    """Returns if an extension is a video or an image"""
    if ext == '.mp4' or ext=='.mpeg4' or ext=='.avi' or ext=='.mov' or ext=='.wmv':
        return "video"
    elif ext=='.jpg' or ext=='.jpeg' or ext=='.png' or ext=='.gif' or ext=='.webp':
        return "image"
    else:
        return 'Extension unknown'



@csrf_exempt
def add_file(request):
    """Add a new file to database"""
    
    # Check if the method is POST
    if request.method != 'POST':
        return HttpResponse("Method Not Allowed", status=405)
    elif request.method == 'POST' and request.FILES['file']:
        uploaded_file = request.FILES['file']
        # I indicate that files will be saved at 'media' folder:
        fs = FileSystemStorage(location='../../media/')
        # The file is saved:
        filename = fs.save(uploaded_file.name, uploaded_file)
        filename = fs.url(filename)
        # I extract the extension from uploaded_file.name
        file_extension = pathlib.Path(uploaded_file.name).suffix

    try:
        file = Files()
        file.filename = uploaded_file.name
        file.type = whatType(file_extension) #To know if it's a video or an image
        file.path = "../../media/"+uploaded_file.name
        # Get hash of the file:
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
def delete_file(request, file_id):
    """Delete a file from database"""

    # Check if the method is DELETE
    if request.method != 'DELETE':
        return HttpResponse("Method Not Allowed", status=405)
    
    file = Files()
    try:
         #Search for id_file at the table
        file = Files.objects.get(id_file=file_id)
        if Assign.objects.filter(id_file=file_id).exists():
            return HttpResponse("The file is being used", status=404)
        else:
            # Delete row from table
            file.delete()
            return HttpResponse("Deleted successfully", status=200)
    except:
        return HttpResponse('Element not found', status=404) 
    

@csrf_exempt
def assign_file(request,playlist_id):
    """Assign a file to a playlist"""

    # Check if the method is POST
    if request.method != 'POST':
        return HttpResponse("Method Not Allowed", status=405)
    
    data = json.loads(request.body)
    try:
        assign = Assign()
        assign.id_playlist=Playlists.objects.get(id_playlist=playlist_id)
        assign.id_file=Files.objects.get(id_file=data["id_file"])
        assign.duration=data["duration"] if "duration" in data else None
        assign.save()
        return HttpResponse("Playlist assigned to device", status=201)
    except:
        return HttpResponse('Bad request - Missed or incorrect params', status=400)
    

@csrf_exempt
def view_assigned_playlist(request,device_id):
    """View the playlist assigned to a device"""
    print(device_id)
    # Check if the method is GET
    if request.method != 'GET':
        return HttpResponse("Method Not Allowed", status=405)
    
    try:
        dev=Devices()
        
        dev= Devices.objects.get(id_device=device_id)
        print(dev.id_device)
        id_pl=str(dev.id_playlist)[18:-1]
        print(id_pl)
      
        play=Playlists()
        play=Playlists.objects.get(id_playlist = id_pl)
        answer = {
                "id_device":dev.id_device,
                "title":play.title,
            }    
    except:
        return HttpResponse("Not found", status=404)
    
    return JsonResponse(answer,json_dumps_params={'ensure_ascii':False}, safe=False,status=200) 
    

@csrf_exempt
def view_assigned_file(request,playlist_id):
    """View all the files assigned to a playlist"""
    
    # Check if the method is GET
    if request.method != 'GET':
        return HttpResponse("Method Not Allowed", status=405)
    
    try:
        filesTable=Assign.objects.filter(id_playlist=playlist_id)
        answers = []
        for f in filesTable:
            assign=Assign()
            assign=Assign.objects.get(id_assign=f.id_assign)
              
            file=Files()
            file=Files.objects.get(id_file = str(assign.id_file)[14:-1])
            answer = {
                "id_playlist":playlist_id,
                "title":file.filename,
            }
            answers.append(answer)
    except:
        return HttpResponse("Not found", status=404)
    return JsonResponse(answers,json_dumps_params={'ensure_ascii':False}, safe=False,status=200)
    

@csrf_exempt
def view_files(request):
    """View all the files from database"""
    
    # Check if the method is GET
    if request.method != 'GET':
        return HttpResponse("Method Not Allowed", status=405)
    
    try:
        listTable = Files.objects.all()
        lists = []

        for l in listTable:
            list = {
                "filename":l.filename,
                "type":l.type,
            }

            lists.append(list)
    
    except:
        return HttpResponse("Bad Request - Missing path parameters", status=400)
    
    return JsonResponse(lists,json_dumps_params={'ensure_ascii':False}, safe=False,status=200) 


@csrf_exempt
def add_code(request):
    """Add a new code to database"""

    # Check if the method is POST
    if request.method != 'POST':
        return HttpResponse("Method Not Allowed", status=405)

    data = json.loads(request.body)

    try:
        cod = Codes() 
        cod.code = data['code']

        cod.save()
        return HttpResponse("Code added", status=201)
    except:
        return HttpResponse('Bad request - Missed or incorrect params', status=400)  
