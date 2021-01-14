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

    const signUp = (email, password) => {
        return auth.createUserWithEmailAndPassword(email, password)
    }

    const login = (email, password) => {
        return auth.signInWithEmailAndPassword(email, password)
    }

    const logout = () => {
        return auth.signOut();
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user);
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const values = {
        currentUser, 
        loading,
        signUp, 
        login,
        logout
    }

    return (
        <AuthContext.Provider value={values}>
            {loading && (<div className="d-flex justify-content-center my-5"><FadeLoader color={'#576675'} size={50}/></div>)}
            {!loading && props.children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;