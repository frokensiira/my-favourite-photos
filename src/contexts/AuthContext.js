import { createContext, useState, useContext, useEffect } from 'react';
import { FadeLoader } from 'react-spinners';
import { auth } from '../firebase';

export const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
}

const AuthContextProvider = (props) => {
    const [currentUser, setCurrentUser ] = useState(null);
    const [loading, setLoading] = useState(true);

    const signup = (email, password) => {
        console.log(`Email ${email} and Password ${password}`);
        return auth.createUserWithEmailAndPassword(email, password)
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            console.log('Auth state changed', user);
            setCurrentUser(user);
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const values = {
        currentUser, 
        loading,
        signup
    }

    return (
        <AuthContext.Provider value={values}>
        {loading && (<div className="d-flex justify-content-center my-5"><FadeLoader color={'#576675'} size={50}/></div>)}
            {!loading && props.children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;