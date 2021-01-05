import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Logout = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            await logout()
            navigate('/login')
        })()

    }, [logout, navigate]);

    return (  
        <div>
            Du loggas nu ut...
        </div>
    );
}
 
export default Logout;