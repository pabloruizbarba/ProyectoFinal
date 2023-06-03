import {useNavigate, useParams} from  "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import swal from 'sweetalert';
import "./AssignFile.css"

//Images
import whiteLogo from "../../images/logos/logo.in.blanco.png"
//import pencil from "../../images/icons/pencil.png"
import paperbin from "../../images/icons/paper-bin.png"

const AssignFile = () => {

    const navigate = useNavigate();
    const [media, setMedia] = useState([]);
    const [files, setFiles] = useState([]);
    const {playlist_id} = useParams();

    const onClickDevices= (e) => {
        e.preventDefault();
        navigate("/devices-menu");
    }

    const onClickFiles= (e) => {
        e.preventDefault();
        navigate("/media-menu");
    }

    const onClickHome= (e) => {
        e.preventDefault();
        navigate("/home");
    }

    const onClickBack= (e) => {
        e.preventDefault();
        navigate("/view-playlists");
    }
    //View files assigned to a certain playlist
    useEffect(() => {
        axios.get('http://localhost:8000/v1/view-assigned-file/'+playlist_id)
        .then(function(response) {
          
            setMedia(response.data)
        })
    })
    // View all the files
    useEffect(() => {
        axios.get('http://localhost:8000/v1/view-files/')
        .then(function(response) {
          
            setFiles(response.data)
        })
    },[])
    
    const [formData, setFormData] = useState({
        id_file:"",
        duration:""
    });

    const onOptionChange = (e) => {
        setFormData({ 
            id_file: e.target.value,
            duration: formData.duration
        });
        }
    const onChangeDuration = (e) => {
            setFormData({ 
                id_file: formData.id_file,
                duration: e.target.value 
            });
            }

    const handleSubmit = (e) => {
        e.preventDefault();
        // Assign a file to a certain playlist  
        axios.post('http://localhost:8000/v1/assign-file/'+playlist_id, formData)
            .then(function (response) {
                window.location.reload();
            })
            .catch(function (error) {
                console.log(error);
            });
        }


        const handleDelete = (id_assign) => {
            // Confirm before deleting a file from the playlist
            swal({
                title: "Are you sure?",
                text: "You want to unassign this media file?",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
            .then(willDelete => {
                if(willDelete) {
                    // Deletes file from a playlist, but file stills exists in database and media directory. 
                    axios.delete('http://localhost:8000/v1/unassign-file/'+id_assign)
                        .then(function (response) { 
                            window.location.reload();
                     })
                }
            })   
        }


    return(
        <div className="main-container">
            <div className="left-home">
                <img src={whiteLogo} alt="Inusual" title="Home" onClick={onClickHome}/>
                <div className="buttons-left">
                    <input type="button" value="DEVICES" onClick={onClickDevices}/>
                    <input type="button" value="HOME" onClick={onClickHome}/>
                    <input type="button" value="MEDIA FILES" onClick={onClickFiles}/>
                </div> 
            </div>
            <div className="right-home">
            <h1>Assign media file to playlist:</h1>    
            <div className="add-media">
                <form className="selectML_form" onSubmit={handleSubmit}> 
                    <label for="select_media">Select a media file:</label>           
                    <select id="select_media" className="select_media" onChange={onOptionChange}>
                        <option>Choose a file</option>
                        {files.map((fl)=>{
                            return(
                                <option key={fl.id_file} value={fl.id_file}>{fl.filename}</option>
                                )                
                            }
                        )}    
                    </select>
                    <label for="seconds">Enter duration (max 600 seconds):</label>
                    <input type="number" id="seconds" name="seconds" min="0" max="600" required onChange={onChangeDuration}></input>
                    <input className="addMF" type="submit" value="Add" />                        
                </form> 
            </div>
            <h1>Files in this playlist:</h1>
            <div className="table-div-af">
                    <table>
                        <thead>
                        <tr>
                            <th>Media file</th>
                            <th>Type</th>
                            <th>Duration</th>
                            <th>Preview</th>
                            <th>Delete</th>
                        </tr>
                        </thead>
                        <tbody>
                        {media.map((file)=>{
                                if (file.type==="video"){
                                    return(
                                        <tr>
                                            <td><b>{file.filename}</b></td>
                                            <td>{file.type}</td>
                                            <td>{`${file.duration} seconds`}</td>
                                            <td className="video-td">
                                                <video width="300" height="200" controls >
                                                    <source src={`http://localhost:8000/media/${file.filename}`}  type="video/mp4"/>  
                                                </video>
                                            </td>
                                            <td>
                                                <img className="paperbin" src={paperbin} alt="paperbin" title="Delete this file from the playlist" onClick={() => handleDelete(file.id_assign)}></img>    
                                            </td>
                                        </tr>
                                    ) 
                                } else {
                                    return(
                                        <tr>
                                            <td><b>{file.filename}</b></td>
                                            <td>{file.type}</td>
                                            <td>{`${file.duration} seconds`}</td>
                                            <td className="video-td">
                                                <img className="thumbnail" src={`http://localhost:8000/media/${file.filename}`}  alt="thumbnail"></img>  
                                            </td>
                                            <td>
                                                <img className="icon" src={paperbin} alt="paperbin" title="Delete this file from the playlist" onClick={() => handleDelete(file.id_assign)}></img>    
                                            </td>
                                        </tr>
                                    )
                                }     
                            }
                            )}
                        </tbody>
                    </table>
                </div>
                
                <input className="back-to-vm" type="button" value="BACK" onClick={onClickBack}/>
            </div>
        </div>
    );

}

export default AssignFile;