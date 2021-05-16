import React, { createContext, useCallback, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import api from '../services/api';

interface User {
    id: string;
    name: string;
    lastName: string;
    legalName: string;
    phone: string;
    email: string;
    avatar: string;
    isProvider: boolean;
    isTattoo: boolean;
    isPiercing: boolean;
    isBarber: boolean;
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
    isAuthenticated: boolean;
    signIn(credentials: SignInCredentials): Promise<any>;
    signOut(): void;
    updateUser(user: User): void;
    updateSimpleUser(user: any): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
    const history = useHistory();
    const [data, setData] = useState<AuthState>(() => {
        const token = localStorage.getItem('@FYC:token');
        const user = localStorage.getItem('@FYC:user');

        if (token && user) {
            return { token, user: JSON.parse(user) };
        }
        return {} as AuthState;
    });

    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        const token = localStorage.getItem('@FYC:token');
        if (token) {
            return true;
        }
        return false;
    });

    const signIn = useCallback(async ({ email, password, isProvider }) => {
        const response = await api.post('sessions', {
            email,
            password,
            isProvider,
        });
        const { token, user } = response.data;

        if (isProvider) {
            const userProvider = {
                id: user.id,
                avatar: user.avatar,
                email: user.email,
                isBarber: user.isBarber,
                isPiercing: user.isPiercing,
                isTattoo: user.isTattoo,
                name: user.name,
                lastName: user.lastName,
                legalName: user.legalName,
                phone: user.phone,
            };
            localStorage.setItem('@FYC:user', JSON.stringify({ ...userProvider, isProvider }));
        } else {
            localStorage.setItem('@FYC:user', JSON.stringify({ ...user, isProvider }));
        }

        localStorage.setItem('@FYC:token', token);
        user.isProvider = isProvider;

        setData({ token, user });
        setIsAuthenticated(true);
    }, []);

    const signOut = useCallback(() => {
        localStorage.removeItem('@FYC:token');
        localStorage.removeItem('@FYC:user');

        setData({} as AuthState);
        setIsAuthenticated(false);
    }, []);

    const updateUser = useCallback(
        (user: User) => {
            const updatedUser = { ...data.user, ...user };
            setData({
                token: data.token,
                user: updatedUser,
            });

            localStorage.setItem('@FYC:user', JSON.stringify(user));
        },
        [data.token, data.user],
    );

    const updateSimpleUser = useCallback(
        (user: any) => {
            const updatedUser = { ...data.user, ...user };

            setData({
                token: data.token,
                user: updatedUser,
            });

            localStorage.setItem('@FYC:user', JSON.stringify(updatedUser));
        },
        [data.token, data.user],
    );

    return (
        <AuthContext.Provider
            value={{
                user: data.user,
                signIn,
                signOut,
                updateUser,
                updateSimpleUser,
                isAuthenticated,
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
