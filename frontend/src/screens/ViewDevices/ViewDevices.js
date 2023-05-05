import {useNavigate} from  "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import "./ViewDevices.css"

//Images
import whiteLogo from "../../images/logos/logo.in.blanco.png"
import paperbin from "../../images/icons/paper-bin.png"

const ViewDevices = () => {
    const navigate = useNavigate();
    const [devices, setDevices] = useState([]);
    const [playlistSearched, setPlaylistSearched] = useState([]);
    const [playlists, setPlaylists] = useState([]);

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

    const deleteHandler =(id_device) =>{
        axios
           .delete(`http://localhost:8000/v1/delete-device/`, id_device)
           .then(res => {
            console.log('deleted',res)
           })
           .catch(error =>{
            console.log(error)
           })
        }


    useEffect(() => {
        axios.get('http://localhost:8000/v1/view-devices/')
        .then(function(response) {
          
            setDevices(response.data)

            const search={"id_device":response.data.id_device}
            

            axios.get('http://localhost:8000/v1/view-assigned-playlist/', search)
            .then(function(response) {
          
                setPlaylistSearched(response.data)
            })
        })
        
    },[])

    useEffect(() => {
        axios.get('http://localhost:8000/v1/view-playlists/')
        .then(function(response) {
          
            setPlaylists(response.data)
        })
    },[])

    const [formData, setFormData] = useState({
        id_device:"",
        id_playlist:""
    });

    const onOptionDevice = (e) => {
        setFormData({ 
            id_device: e.target.value,
            id_playlist: formData.id_playlist
        });
        }

    const onOptionChange = (e) => {
        setFormData({ 
            id_device: formData.id_device,
            id_playlist: e.target.value 
        });
        }

    const handleSubmit = (e) => {
        e.preventDefault();
            
        axios.post('http://localhost:8000/v1/assign-playlist/', formData)
            .then(function (response) {
                navigate("/view-devices");
            })
            .catch(function (error) {
                console.log(error);
            });
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
                <div className="table-div">
                    <table>
                        <thead>
                        <tr>
                            <th>Device name</th>
                            <th>Description</th>
                            <th>Playlist</th>
                            <th>Change playlist</th>
                            <th>Delete</th>
                        </tr>
                        </thead>
                        <tbody>
                        {devices.map((device)=>{
                                return(
                                    <tr>
                                        <td><b>{device.name}</b></td>
                                        <td>{device.description}</td>
                                        {playlistSearched.map((playlist)=>{
                                            return(
                                                <td>{playlist.title}</td>
                                            )
                                        }
                                        )}
                                        <td>{device.id_playlist}</td>

                                        {/* Change playlist */}
                                        <td>
                                            <form className="selectPL_form" onSubmit={handleSubmit}>
                                            <select className="select_dev" onChange={onOptionDevice} hidden="hidden">
                                                <option key={device.id_device} value={device.id_device}>{device.name}</option>
                                            </select>    
                                            <select className="select_playlist" onChange={onOptionChange}>
                                            <option>NO PLAYLIST</option>
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

                                        {/* Delete device */}
                                        <td><img className="paperbin" src={paperbin} alt="paperbin" title="Delete device" onClick={ () => deleteHandler(device.id_device)} /></td>
                                    </tr>
                                )     
                            }
                            )}
                        </tbody>
                    </table>
                </div>
                
            </div>
        </div>
    );

}

export default ViewDevices;