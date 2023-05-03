import {useNavigate} from  "react-router-dom";
import axios from "axios";
import { useState } from "react";
import "./NewPlaylist.css"

//Images
import whiteLogo from "../../images/logos/logo.in.blanco.png"

const NewPlaylist = () => {

    const navigate = useNavigate();

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

    const [formData, setFormData] = useState({
        title: ""
    });

    const onchangeTitle = (e) => {
        setFormData({
            title: e.target.value,
        })
    }

    const config = {headers:{}}

    const handleSubmit = (e) => {
        e.preventDefault();
    
        axios.post('http://localhost:8000/v1/add-playlist/', formData, config)
          .then(function (response) {
            alert("Playlist added succesfully");
            navigate("/playlists-menu");
          })
          .catch(function (error) {
            alert("Try a different title");
            console.log(error);
          });
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
                <div className="form-div">
                    <form className="new_play_form" onSubmit={handleSubmit}>
                        <input className="title" type="text" placeholder="PLAYLIST TITLE" onChange={onchangeTitle}/>
                        <input className="create" type="submit" value="CREATE" />
                    </form>
                </div>
            </div>
        </div>
    );

}

export default NewPlaylist;