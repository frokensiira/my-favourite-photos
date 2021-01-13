import '../assets/404.css';
import { Link } from 'react-router-dom';
import BodyBackgroundColor from 'react-body-backgroundcolor';

const NotFound = () => {
    return ( 
        <BodyBackgroundColor backgroundColor='#95c2de'>
            <div className="mainbox">
            <div className="err">4</div>
            <i className="far fa-question-circle fa-spin"/>
            <div className="err2">4</div>
            <div className="msg">
                Maybe this page moved? Got deleted? Is hiding out in quarantine? Never existed in the first place?
                <p>Let's go <Link to={'/'} className="home-link">home</Link> and try from there.</p>
            </div>
            </div>
        </BodyBackgroundColor>
    );
}
 
export default NotFound;