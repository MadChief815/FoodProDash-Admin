import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(() => {
        return localStorage.getItem('isLoggedIn') === 'true';
    });

    const [email, setEmail] = useState(() => {
        return localStorage.getItem('email') || '';
    });

    const [username, setUsername] = useState(() => {
        return localStorage.getItem('username') || '';
    });

    const [userphonenumber, setUserPhoneNumber] = useState(() => {
        return localStorage.getItem('userphonenumber') || '';
    });

    const [dob, setDOB] = useState(() => {
        return localStorage.getItem('dob') || '';
    });


    const [image, setImage] = useState(() => {
        return localStorage.getItem('image') || '';
    });

    // Sync to localStorage on change
    useEffect(() => {
        localStorage.setItem('isLoggedIn', isLoggedIn);
    }, [isLoggedIn]);

    useEffect(() => {
        localStorage.setItem('email', email);
    }, [email]);
    useEffect(() => {
        localStorage.setItem('username', username);
    }, [username]);
    useEffect(() => {
        localStorage.setItem('userphonenumber', userphonenumber);
    }, [userphonenumber]);
    useEffect(() => {
        localStorage.setItem('dob', dob);
    }, [dob]);
    useEffect(() => {
        localStorage.setItem('image', image);
    }, [image]);

    const login = () => setIsLoggedIn(true);
    const logout = () => {
        setIsLoggedIn(false);
        setEmail('');
        setUsername('');
        setImage('');
        setUserPhoneNumber('');
        setDOB('');
        localStorage.removeItem('email');
        localStorage.removeItem('username');
        localStorage.removeItem('image');
        localStorage.removeItem('userphonenumber');
        localStorage.removeItem('dob');
        localStorage.setItem('isLoggedIn', 'false');
    };

    return (
        <AuthContext.Provider
            value={{
                isLoggedIn,
                login,
                logout,
                email,
                setEmail,
                username,
                setUsername,
                image,
                setImage,
                userphonenumber,
                setUserPhoneNumber,
                dob,
                setDOB
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
