import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import Index from '../pages/Index';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import HomePageAuthenticate from '../pages/HomePageAuthenticate';
import ConfigServicesProvider from '../pages/ConfigServicesProvider';
import ConfigSchedulesProvider from '../pages/ConfigSchedulesProvider';

const Routes: React.FC = () => (
    <Switch>
        <Route path="/" exact component={Index} />
        <Route path="/signIn" signPages component={SignIn} />
        <Route path="/signUp" signPages component={SignUp} />

        <Route path="/home" isPrivate component={HomePageAuthenticate} />
        <Route path="/configServicesProvider" isPrivate component={ConfigServicesProvider} />
        <Route path="/configSchedulesProvider" isPrivate component={ConfigSchedulesProvider} />
    </Switch>
);

export default Routes;
