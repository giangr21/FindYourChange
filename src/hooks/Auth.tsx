import React, { createContext, useCallback, useState, useContext } from 'react';
import api from '../services/api';

interface User {
    id: string;
    name: string;
    phone: string;
    email: string;
    avatar: string;
    lastName: string;
}

interface AuthState {
    token: string;
    user: User;
}

interface SignInCredentials {
    email: string;
    password: string;
    isProvider: boolean;
}

interface AuthContextData {
    user: User;
    signIn(credentials: SignInCredentials): Promise<any>;
    signOut(): void;
    updateUser(user: User): void;
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

    const signIn = useCallback(async ({ email, password, isProvider }) => {
        const response = await api.post('sessions', {
            email,
            password,
            isProvider,
        });
        const { token, user } = response.data;
        localStorage.setItem('@FYC:token', token);
        localStorage.setItem('@FYC:user', JSON.stringify(user));

        setData({ token, user });
    }, []);

    const signOut = useCallback(() => {
        localStorage.removeItem('@FYC:token');
        localStorage.removeItem('@FYC:user');
        setData({} as AuthState);
    }, []);

    const updateUser = useCallback(
        (user: User) => {
            localStorage.setItem('@FYC:user', JSON.stringify(user));

            setData({
                token: data.token,
                user,
            });
        },
        [data.token, setData],
    );

    return (
        <AuthContext.Provider
            value={{
                user: data.user,
                signIn,
                signOut,
                updateUser,
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
