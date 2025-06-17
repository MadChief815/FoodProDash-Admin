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

    const login = () => setIsLoggedIn(true);
    const logout = () => {
        setIsLoggedIn(false);
        setEmail('');
        setUsername('');
        localStorage.removeItem('email');
        localStorage.removeItem('username');
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
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
