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
import ProviderProfile from '../pages/ProviderProfile';
import Marketplace from '../pages/Marketplace';
import Product from '../pages/Product';
import About from '../pages/About';
import Clerk from '../pages/Clerk';

const Routes: React.FC = () => (
    <Switch>
        <Route path="/" exact component={Index} />
        <Route path="/service" component={Service} />
        <Route path="/provider" component={Provider} />
        <Route path="/About" component={About} />

        <Route path="/signIn" signPages component={SignIn} />
        <Route path="/signUp" signPages component={SignUp} />
        <Route path="/forgotPassword" signPages component={ForgotPassword} />

        <Route path="/marketplace" privatePages component={Marketplace} />
        <Route path="/Product" privatePages component={Product} />
        <Route path="/home" privatePages component={HomePageAuthenticate} />
        <Route path="/configServicesProvider" privatePages component={ConfigServicesProvider} />
        <Route path="/configSchedulesProvider" privatePages component={ConfigSchedulesProvider} />
        <Route path="/configProductsProvider" privatePages component={ConfigProductsProvider} />
        <Route path="/configClerksProvider" privatePages component={Clerk} />
        <Route path="/providerProfile" privatePages component={ProviderProfile} />
    </Switch>
);

export default Routes;
