import {useNavigate} from  "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import "./AddDevice.css"

//Images
import whiteLogo from "../../images/logos/logo.in.blanco.png"

const AddDevice = () => {
    const navigate = useNavigate();
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
    
    
    useEffect(() => {
        axios.get('http://localhost:8000/v1/view-playlists/')
        .then(function(response) {
          
            setPlaylists(response.data)
        })
    },[])
    
   

    const [formData, setFormData] = useState({
        name: "",
        code: "",
        description:"",
        id_playlist:""
    });

    const onchangeName = (e) => {
        setFormData({
            name: e.target.value,
            code: formData.code,
            description: formData.description,
            id_playlist: formData.id_player 
        })
    }

    const onchangeCode = (e) => {
        setFormData({
            name: formData.name,
            code: e.target.value,
            description: formData.description,
            id_playlist: formData.id_player
        })
    }

    const onchangeDesc = (e) => {
        setFormData({
            name: formData.name,
            code: formData.code,
            description: e.target.value,
            id_playlist: formData.id_player 
        })
    }

    const onOptionChange = (e) => {
        setFormData({ 
            name: formData.name,
            code: formData.code,
            description: formData.description,
            id_playlist: e.target.value 
        });
        }
    
    const config = {headers:{}}

    const handleSubmit = (e) => {
        e.preventDefault();
        
        axios.post('http://localhost:8000/v1/add-device/', formData, config)
            .then(function (response) {
            alert("Device added succesfully");
            navigate("/devices-menu");
            })
            .catch(function (error) {
                if( error.response.status === 409 ){
                    alert("Name already exists")
                }
                if( error.response.status === 406 ){
                    alert("Code not valid")
                }
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
                <div className="form-div-dev">
                    <form className="add_dev_form" onSubmit={handleSubmit}>
                        <input className="name" type="text" placeholder="NAME*" onChange={onchangeName}/>
                        <input className="code" type="text" placeholder="CODE*" onChange={onchangeCode}/>
                        <textarea className="desc" type="text" placeholder="DESCRIPTION (OPTIONAL)" onChange={onchangeDesc}/>
                        <p>Select a playlist (optional):</p>
                        <select className="id_playlist" onChange={onOptionChange}>
                            <option>NO PLAYLIST</option>
                            {playlists.map((playlist)=>{
                                return(
                                    <option key={playlist.id_playlist} value={playlist.id_playlist}>{playlist.title}</option>
                                )     
                            }
                            )}    
                        </select>
                        <input className="create-dev" type="submit" value="ADD" />
                    </form>
                </div>
            </div>
        </div>
    );

}

export default AddDevice;