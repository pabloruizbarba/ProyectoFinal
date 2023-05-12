import {useNavigate} from  "react-router-dom";
import "./NotFound.css"

const NotFound = () => {
    const navigate = useNavigate();

    const onClickHome= (e) => {
        e.preventDefault();
        navigate("/home");
    }

    return(
        <div className="lost">
            <div className="words">
                <h1>Oops! That url doesn't exist</h1>
            </div>
            <input className="home" type="button" value="HOME" onClick={onClickHome}/>
        </div>  
    );

}

export default NotFound;