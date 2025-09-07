import { createContext, useContext, useState, useEffect } from 'react';
import { CONFIG } from '../config';
import { Utils } from '../utils';

// Authentication Context
const AuthContext = createContext(null);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('jwt_token'));
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (token) {
            localStorage.setItem('jwt_token', token);
            const decodedUser = Utils.parseJwt(token);
            setUser(decodedUser);
        } else {
            localStorage.removeItem('jwt_token');
            setUser(null);
        }
    }, [token]);

    const login = async (username, password) => {
        try {
            const response = await fetch(`${CONFIG.API_BASE_URL}/api/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });
            const data = await response.json();
            if (data.success) {
                setToken(data.token);
                return { success: true };
            }
            return { success: false, message: data.message || "Login failed" };
        } catch (error) {
            return { success: false, message: "Server error" };
        }
    };

    const register = async (username, password, role) => {
        try {
            const response = await fetch(`${CONFIG.API_BASE_URL}/api/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password, role }),
            });
            const data = await response.json();
            if (data.success) {
                setToken(data.token);
                return { success: true };
            }
            return { success: false, message: data.message || "Registration failed" };
        } catch (error) {
            return { success: false, message: "Server error" };
        }
    };

    const logout = () => {
        setToken(null);
    };

    return (
        <AuthContext.Provider value={{ token, user, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
