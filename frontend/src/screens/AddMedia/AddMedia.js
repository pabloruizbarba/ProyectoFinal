import React, {useState} from 'react';
import {useNavigate} from  "react-router-dom";
import axios from 'axios';
import "./AddMedia.css"

//Images
import whiteLogo from "../../images/logos/logo.in.blanco.png"

const AddMedia = () => {
    const navigate = useNavigate();
    const [file, setFile] = useState();
    const [uploaded, setUploaded] = useState(null);


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

    function handleChange(event) {
        setFile(event.target.files[0])
      }
      
    function handleSubmit(event) {
        event.preventDefault()
        const url = 'http://localhost:8000/v1/add-file/ ';
        const formData = new FormData();
        formData.append('file', file);

        axios.post(url, formData,{
            onUploadProgress: (data) => {
                setUploaded(Math.round((data.loaded / data.total) * 100));
              },
        })
        .then((response) => {
            console.log(response.data);
            alert("File uploaded succesfully");
            navigate("/media-menu");
            })
            .catch(function (error) {
                if( error.response.status === 409 ){
                    alert("The file already exists")
                }
                if( error.response.status === 400 ){
                    alert("Incorrect params")
                }
                console.log(error);
             });
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
                <form className='upload-form' onSubmit={handleSubmit}>
                    <h1>Select a file:</h1>
                    <input className='search-file' type="file" onChange={handleChange}/>
                    <button className='submit-file' type="submit">Upload</button>

                    {uploaded && (
                        <div className="progress mt-2">
                            <div
                                className="progress-bar"
                                role="progressbar"
                                aria-valuenow={uploaded}
                                aria-valuemin="0"
                                aria-valuemax="100"
                                style={{ width: `${uploaded}%` }}
                            >
                                {`${uploaded}%`}
                            </div>
                        </div>
        )}

                </form>
                <input className="back-to-mm1" type="button" value="BACK" onClick={onClickBack}/>
            </div>
        </div>
    );

}

export default AddMedia;