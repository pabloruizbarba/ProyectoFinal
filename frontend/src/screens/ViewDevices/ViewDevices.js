import {useNavigate} from  "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import "./ViewDevices.css"
import { Link } from "react-router-dom";

//Images
import whiteLogo from "../../images/logos/logo.in.blanco.png"
import pencil from "../../images/icons/pencil.png"


const ViewDevices = () => {
    const navigate = useNavigate();
    const [devices, setDevices] = useState([]);
    

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
        axios.get('http://localhost:8000/v1/view-devices/')
        .then(function(response) {
          
            setDevices(response.data)
        })
    },[])

    
    
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
                            <th>Options</th>
                        </tr>
                        </thead>
                        <tbody>
                        {devices.map((device)=>{
                                return(
                                    <tr>
                                        <td><b>{device.name}</b></td>
                                        <td>{device.description}</td>
                                        {/* <td><input className="modify" type="button" value="View/Modify" onClick={onClickModify}/></td> */}
                                        <td>
                                            <Link to={`/modify-device/${device.id_device}`} activeClassName="active">
                                                <img className="pencil" src={pencil} alt="pencil" title="View/Modify"></img>     
                                            </Link>
                                        </td>
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