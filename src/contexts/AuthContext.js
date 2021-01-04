import { createContext, useState } from 'react';
import { auth } from '../firebase';

export const AuthContext = createContext();

const AuthContextProvider = (props) => {
    const [currentUser, setCurrentUser ] = useState(null);

    const signup = (email, password) => {
        console.log(`Email ${email} and Password ${password}`);
        
    }

    const values = {
        currentUser, 
        signup
    }

    return (
        <AuthContext.Provider value={values}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;