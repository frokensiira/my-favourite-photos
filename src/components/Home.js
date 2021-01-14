import { useAuth } from '../contexts/AuthContext';

const Home = () => {
    const { currentUser, loading } = useAuth();
    return (  
        loading 
            ? (<p>Loading...</p>) 
            : (
                <div className="home">
                    <h1>Välkommen!</h1>
                    <p>Du är inloggad som <strong>{currentUser.email}</strong></p>
                </div>
            )
        
    );
}
 
export default Home;