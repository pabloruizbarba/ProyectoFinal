import {useNavigate} from  "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import swal from 'sweetalert';
import { Link } from "react-router-dom";
import "./ViewPlaylists.css"

//Images
import whiteLogo from "../../images/logos/logo.in.blanco.png"
import pencil from "../../images/icons/pencil.png"
import paperbin from "../../images/icons/paper-bin.png"

const ViewPlaylists = () => {

    const navigate = useNavigate();
    const [playlists, setPlaylists] = useState([]);

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
        navigate("/playlists-menu");
    }
    // Get all playlists
    useEffect(() => {
        axios.get('http://localhost:8000/v1/view-playlists/')
        .then(function(response) {
          
            setPlaylists(response.data)
        })
    },[])


    const handleDelete = (id_playlist) => {
        // Confirm before delete
        swal({
            title: "Are you sure?",
            text: "You want to delete this playlist?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then(willDelete => {
            if(willDelete) {
                axios.delete('http://localhost:8000/v1/delete-playlist/'+id_playlist)
                    .then(function (response) {
                        //Refresh page to see changes
                        window.location.reload();
                    })
                    .catch(function (error) {
                        //Possible errors:
                        if( error.response.status === 409 ){
                            alert("The playlist is being used")
                        }
                        if( error.response.status === 404 ){
                            alert("Playlist not found")
                        }
                        console.log(error);
                    });
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
            <div className="table-div">
                    <table>
                        <thead>
                        <tr>
                            <th>Playlist title</th>
                            <th>Manage files</th>
                            <th>Delete</th>
                        </tr>
                        </thead>
                        <tbody>
                        {playlists.map((pl)=>{
                                return(
                                    <tr>
                                        <td><b>{pl.title}</b></td>
                                        <td>
                                            <Link to={`/assigned-files/${pl.id_playlist}`} activeClassName="active">
                                                <img className="icon" src={pencil} alt="pencil" title="View/Add media files"></img>     
                                            </Link>
                                        </td>
                                        <td>
                                            <img className="icon" src={paperbin} alt="paperbin" title="Delete device" onClick={() => handleDelete(pl.id_playlist)}></img>
                                        </td>
                                    </tr>
                                )     
                            }
                            )}
                        </tbody>
                    </table>
                </div>
                
                <input className="back-to-pm2" type="button" value="BACK" onClick={onClickBack}/>
            </div>
        </div>
    );

}

export default ViewPlaylists;