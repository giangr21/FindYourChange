import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import Index from '../pages/Index';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import ForgotPassword from '../pages/ForgotPassword';
import HomePageAuthenticate from '../pages/HomePageAuthenticate';
import ConfigServicesProvider from '../pages/ConfigServicesProvider';
import ConfigSchedulesProvider from '../pages/ConfigSchedulesProvider';
import ConfigProductsProvider from '../pages/ConfigProductsProvider';
import Service from '../pages/Service';
import Provider from '../pages/Provider';
import Marketplace from '../pages/Marketplace';
import Product from '../pages/Product';
import Clerk from '../pages/Clerk'

const Routes: React.FC = () => (
    <Switch>
        <Route path="/" exact component={Index} />
        <Route path="/service" component={Service} />
        <Route path="/provider" component={Provider} />

        <Route path="/signIn" signPages component={SignIn} />
        <Route path="/signUp" signPages component={SignUp} />
        <Route path="/forgotPassword" signPages component={ForgotPassword} />

        <Route path="/marketplace" isPrivate component={Marketplace} />
        <Route path="/Product" isPrivate component={Product} />
        <Route path="/home" isPrivate component={HomePageAuthenticate} />
        <Route path="/configServicesProvider" isPrivate component={ConfigServicesProvider} />
        <Route path="/configSchedulesProvider" isPrivate component={ConfigSchedulesProvider} />
        <Route path="/configProductsProvider" isPrivate component={ConfigProductsProvider} />
        <Route path="/configProductsProvider" isPrivate component={ConfigProductsProvider} />
        <Route path="/Clerk" isPrivate component={Clerk} />
    </Switch>
);

export default Routes;
