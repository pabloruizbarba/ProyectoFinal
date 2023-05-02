import {useNavigate} from  "react-router-dom";
import "./Home.css"

//Images
import whiteLogo from "../../images/logos/logo.in.blanco.png"
import greenLogo from "../../images/logos/logo.in.pro.verde.png"

const Home = () => {
    const navigate = useNavigate();

    const onClickDevices= (e) => {
        e.preventDefault();
        navigate("/devices-menu");
    }

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

    return(
        <div className="main-container">
            <div className="left-home">
                <img src={whiteLogo} alt="Inusual" title="Home" onClick={onClickHome}/>
                <div className="buttons">
                    <input type="button" value="DEVICES" onClick={onClickDevices}/>
                    <input type="button" value="PLAYLISTS" onClick={onClickPlaylists}/>
                    <input type="button" value="MEDIA FILES" onClick={onClickFiles}/>
                </div> 
            </div>
            <div className="right-home">
                <a href="https://www.inusualcom.com/" target="_blank" rel="noreferrer">
                    <img 
                        className="greenLogo"
                        alt="Inusual" 
                        title="About us"
                        src={greenLogo}>
                    </img>
                </a>
            </div>
        </div>
    );

}

export default Home;