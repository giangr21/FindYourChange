import React from 'react';
import { AuthProvider } from './authentication';

const appProvider: React.FC = ({ children }) => <AuthProvider>{children}</AuthProvider>;

export default appProvider;
