import { useAuth } from '../contexts/AuthContext';

const Home = () => {
    const { currentUser, loading } = useAuth();
    return (  
        loading 
            ? (<p>Loading...</p>) 
            : (
                <div>
                    <p>Home component</p>
                    <p>You are logged in as <strong>{currentUser && currentUser.email}</strong></p>
                </div>
            )
        
    );
}
 
export default Home;