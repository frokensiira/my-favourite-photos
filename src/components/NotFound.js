import '../assets/404.css';
import { Link } from 'react-router-dom';
import BodyBackgroundColor from 'react-body-backgroundcolor';

const NotFound = () => {
    return ( 
        <BodyBackgroundColor backgroundColor='#95c2de'>
        <div class="mainbox">
    <div class="err">4</div>
    <i class="far fa-question-circle fa-spin"></i>
    <div class="err2">4</div>
    <div class="msg">Maybe this page moved? Got deleted? Is hiding out in quarantine? Never existed in the first place?<p>Let's go <Link to={'/'}>home</Link> and try from there.</p></div>
      </div>
      </BodyBackgroundColor>
    );
}
 
export default NotFound;