import {useNavigate, useParams} from  "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import swal from 'sweetalert';
import "./ModifyDevice.css"


//Images
import whiteLogo from "../../images/logos/logo.in.blanco.png"
import paperbin from "../../images/icons/paper-bin.png"


const ModifyDevice = () => {
    const {device_id} = useParams();
    const navigate = useNavigate();
    const [playlists, setPlaylists] = useState([]);
    const [searchedPlaylist, setSearchedPlaylist] = useState({
        id_device:"",
        title:"",
    })
    

    const onClickPlaylists= (e) => {
        e.preventDefault();
        navigate("/playlists-menu");
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
        navigate("/view-devices");
    }
    // Get playlist assigned to a device
    useEffect(() => {
        axios.get('http://localhost:8000/v1/view-assigned-playlist/'+device_id)
        .then(function (response) {
            setSearchedPlaylist(response.data)
        })
    });
    // Get all the playlists
    useEffect(() => {
        axios.get('http://localhost:8000/v1/view-playlists/')
        .then(function(response) {
          
            setPlaylists(response.data)
        })
    },[])

    const [formData, setFormData] = useState({
        id_playlist:""
    });

    const onOptionChange = (e) => {
        setFormData({ 
            id_playlist: e.target.value 
        });
        }

    const handleSubmit = (e) => {
        e.preventDefault();
        // Assigns a playlist to a device    
        axios.post('http://localhost:8000/v1/assign-playlist/'+device_id, formData)
            .then(function (response) {
                navigate("/modify-device/"+device_id);
            })
            .catch(function (error) {
                console.log(error);
            });
        }
    

    const handleDelete = (e) => {
        e.preventDefault();
        // Confirm before delete
        swal({
            title: "Are you sure?",
            text: "You want to delete this device?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then(willDelete => {
            if(willDelete) {
                axios.delete('http://localhost:8000/v1/delete-device/'+device_id)
                    .then(function (response) {
                        // Tells that delete was successfull
                        swal({
                            title: "Done!",
                            text: "Device was deleted",
                            icon: "success",
                            timer: 2000,
                            button: false
                          })
                        navigate("/view-devices");
                })

            }
        })   
    }
    
    return(
        <div className="main-container">
            <div className="left-home">
                <img src={whiteLogo} alt="Inusual" title="Home" onClick={onClickHome}/>
                <div className="buttons-left">
                    <input type="button" value="HOME" onClick={onClickHome}/>
                    <input type="button" value="PLAYLISTS" onClick={onClickPlaylists}/>
                    <input type="button" value="MEDIA FILES" onClick={onClickFiles}/>
                </div> 
            </div>
            <div className="right-home">
                <div className="table-box">
                    <table>
                        <thead>
                        <tr>
                            <th>Assigned playlist</th>
                            <th>Change playlist</th>
                            <th>Delete device</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>{searchedPlaylist.title}</td>
                            <td>
                                <form className="selectPL_form" onSubmit={handleSubmit}>   
                                    <select className="select_playlist" onChange={onOptionChange}>
                                            {playlists.map((playlist)=>{
                                                return(
                                                    <option key={playlist.id_playlist} value={playlist.id_playlist}>{playlist.title}</option>
                                                    )                
                                                }
                                            )}    
                                    </select>
                                    <input className="changePL" type="submit" value="OK" />
                                </form>    
                            </td>
                            <td>
                                <img className="paperbin" src={paperbin} alt="paperbin" title="Delete device" onClick={handleDelete}></img>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <input className="back-to-vd" type="button" value="BACK" onClick={onClickBack}/>
                </div>
                
            </div>
        </div>
    );

}

export default ModifyDevice;