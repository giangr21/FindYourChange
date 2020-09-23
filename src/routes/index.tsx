import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Index from '../pages/Index';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';

const Routes: React.FC = () => (
    <Switch>
        <Route path="/" exact component={Index} />
        <Route path="/signIn" component={SignIn} />
        <Route path="/signUp" component={SignUp} />
    </Switch>
);

export default Routes;
