import {useNavigate} from  "react-router-dom";
import "./MediaMenu.css"

//Images
import whiteLogo from "../../images/logos/logo.in.blanco.png"

const MediaMenu = () => {
    const navigate = useNavigate();

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

    const onClickAddMedia= (e) => {
        e.preventDefault();
        navigate("/add-media");
    }

    const onClickViewMedia= (e) => {
        e.preventDefault();
        navigate("/home");
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
                <div className="buttons-right">
                    <input type="button" value="ADD MEDIA FILE" onClick={onClickAddMedia}/>
                    <input type="button" value="VIEW MEDIA FILES" onClick={onClickViewMedia}/>
                </div>
            </div>
        </div>
    );

}

export default MediaMenu;