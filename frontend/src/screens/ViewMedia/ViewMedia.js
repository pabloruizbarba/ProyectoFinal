import React, {useState, useEffect} from 'react';
import {useNavigate} from  "react-router-dom";
import axios from 'axios';
import swal from 'sweetalert';
import "./ViewMedia.css"

//Images
import whiteLogo from "../../images/logos/logo.in.blanco.png"
import paperbin from "../../images/icons/paper-bin.png"

const ViewMedia = () => {
    const navigate = useNavigate();
    
    const [media, setMedia] = useState([]);

    const onClickDevices= (e) => {
        e.preventDefault();
        navigate("/devices-menu");
    }

    const onClickPlaylists= (e) => {
        e.preventDefault();
        navigate("/playlists-menu");
    }

    const onClickHome= (e) => {
        e.preventDefault();
        navigate("/home");
    }

    const onClickBack= (e) => {
        e.preventDefault();
        navigate("/media-menu");
    }
    // View all files 
    useEffect(() => {
        axios.get('http://localhost:8000/v1/view-files/')
        .then(function(response) {
            setMedia(response.data)
        })
    },[])
    
      
    const handleDelete = (id_file) => {
        //Confirm before delete
        swal({
            title: "Are you sure?",
            text: "You want to delete this media file?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then(willDelete => {
            if(willDelete) {
                //Delete file
                axios.delete('http://localhost:8000/v1/delete-file/'+id_file)
                    .then(function (response) {
                        //Refresh page to see changes
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
                    <input type="button" value="PLAYLISTS" onClick={onClickPlaylists}/>
                    <input type="button" value="HOME" onClick={onClickHome}/>
                    
                </div> 
            </div>
            <div className="right-home">
            <div className="table-div">
                    <table>
                        <thead>
                        <tr>
                            <th>Filename</th>
                            <th>Type</th>
                            <th>Preview</th>
                            <th>Delete media</th>
                        </tr>
                        </thead>
                        <tbody>
                        {media.map((file)=>{
                                if (file.type==="video"){
                                    return(
                                        <tr>
                                            <td><b>{file.filename}</b></td>
                                            <td>{file.type}</td>
                                            <td className="video-td">
                                                <video width="300" height="200" controls >
                                                    <source src={`/media/${file.filename}`}  type="video/mp4"/>  
                                                </video>
                                            </td>
                                            <td>
                                                <img className="paperbin" src={paperbin} alt="paperbin" title="Delete device" onClick={() => handleDelete(file.id_file)}></img>    
                                            </td>
                                        </tr>
                                    ) 
                                } else {
                                    return(
                                        <tr>
                                            <td><b>{file.filename}</b></td>
                                            <td>{file.type}</td>
                                            <td className="video-td">
                                                <img className="thumbnail" src={`/media/${file.filename}`}  alt="thumbnail"></img>  
                                            </td>
                                            <td>
                                                <img className="paperbin" src={paperbin} alt="paperbin" title="Delete device" onClick={() => handleDelete(file.id_file)}></img>    
                                            </td>
                                        </tr>
                                    )
                                }       
                            }
                            )}
                        </tbody>
                    </table>
                </div>
                
                <input className="back-to-mm2" type="button" value="BACK" onClick={onClickBack}/>

            </div>
        </div>
    );

}

export default ViewMedia;