import React, { createContext, useCallback, useState, useContext } from 'react';
import api from '../services/api';

interface User {
    id: string;
    name: string;
    email: string;
}

interface AuthState {
    token: string;
    user: User;
}

interface SignInCredentials {
    email: string;
    password: string;
}

interface AuthContextData {
    user: User;
    signIn(credentials: SignInCredentials): Promise<any>;
    signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
    const [data, setData] = useState<AuthState>(() => {
        const token = localStorage.getItem('@FYC:token');
        const user = localStorage.getItem('@FYC:user');

        if (token && user) {
            return { token, user: JSON.parse(user) };
        }
        return {} as AuthState;
    });

    const signIn = useCallback(async ({ email, password }) => {
        // const response = await api.post('sessions/merchant', {
        //     email,
        //     password,
        // });
        // const { token, merchant } = response.data;
        localStorage.setItem('@FYC:token', 'abc');
        localStorage.setItem('@FYC:user', JSON.stringify({ id: 'asd', name: 'asd', email: 'asd' }));

        // api.defaults.headers.authorization = `Bearer ${token}`;
        setData({ token: 'abc', user: { id: 'asd', name: 'asd', email: 'asd' } });
    }, []);

    const signOut = useCallback(() => {
        localStorage.removeItem('@FYC:token');
        localStorage.removeItem('@FYC:user');
        setData({} as AuthState);
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user: data.user,
                signIn,
                signOut,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

function useAuth(): AuthContextData {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    return context;
}

export { AuthProvider, useAuth };
