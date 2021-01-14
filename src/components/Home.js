import { useAuth } from '../contexts/AuthContext';
import { FadeLoader } from 'react-spinners';

const Home = () => {
    const { currentUser, loading } = useAuth();

    return (  
        loading 
            ? (<div className="d-flex justify-content-center my-5"><FadeLoader color={'#576675'} size={50}/></div>)
            : (
                <div className="home">
                    <h1>Välkommen!</h1>
                    <p>Du är inloggad som <strong>{currentUser.email}</strong></p>
                </div>
            )
    );
}
 
export default Home;