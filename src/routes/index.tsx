import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import Index from '../pages/Index';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import HomePageAuthenticate from '../pages/HomePageAuthenticate';
import ConfigProvider from '../pages/ConfigProvider';

const Routes: React.FC = () => (
    <Switch>
        <Route path="/" exact component={Index} />
        <Route path="/signIn" signPages component={SignIn} />
        <Route path="/signUp" signPages component={SignUp} />

        <Route path="/home" isPrivate component={HomePageAuthenticate} />
        <Route path="/configProvider" isPrivate component={ConfigProvider} />
    </Switch>
);

export default Routes;
