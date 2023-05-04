import {useNavigate} from  "react-router-dom";
import "./DevicesMenu.css"

//Images
import whiteLogo from "../../images/logos/logo.in.blanco.png"

const DevicesMenu = () => {
    const navigate = useNavigate();

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

    const onClickAddDev= (e) => {
        e.preventDefault();
        navigate("/add-device");
    }

    const onClickViewDev= (e) => {
        e.preventDefault();
        navigate("/home");
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
                <div className="buttons-right">
                    <input type="button" value="ADD DEVICE" onClick={onClickAddDev}/>
                    <input type="button" value="VIEW DEVICES" onClick={onClickViewDev}/>
                </div>
            </div>
        </div>
    );

}

export default DevicesMenu;