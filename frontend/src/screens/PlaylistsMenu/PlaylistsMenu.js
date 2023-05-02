import {useNavigate} from  "react-router-dom";
import "./PlaylistsMenu.css"

//Images
import whiteLogo from "../../images/logos/logo.in.blanco.png"

const PlaylistsMenu = () => {
    const navigate = useNavigate();

    const onClickDevices= (e) => {
        e.preventDefault();
        navigate("/devices-menu");
    }

    const onClickFiles= (e) => {
        e.preventDefault();
        navigate("/home");
    }

    const onClickHome= (e) => {
        e.preventDefault();
        navigate("/home");
    }

    const onClickNewPlay= (e) => {
        e.preventDefault();
        navigate("/home");
    }

    const onClickViewPlay= (e) => {
        e.preventDefault();
        navigate("/home");
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
                <div className="buttons-right">
                    <input type="button" value="NEW PLAYLIST" onClick={onClickNewPlay}/>
                    <input type="button" value="VIEW PLAYLISTS" onClick={onClickViewPlay}/>
                </div>
            </div>
        </div>
    );

}

export default PlaylistsMenu;