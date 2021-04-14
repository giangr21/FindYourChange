import React from 'react';
import { Route as ReactDOMRoute, RouteProps as ReactDOMRouteProps, Redirect } from 'react-router-dom';
import { useAuth } from '../hooks/Auth';
import DefaultLayout from '../pages/_layouts/default';
import AuthLayout from '../pages/_layouts/auth';

interface RouteProps extends ReactDOMRouteProps {
    privatePages?: boolean;
    signPages?: boolean;
    component: React.ComponentType;
    privateUserPages?: boolean;
}

const Route: React.FC<RouteProps> = (
    { privatePages = false, signPages = false, component: Component, privateUserPages = false },
    ...rest
) => {
    const { isAuthenticated, user } = useAuth();
    let Layout: any;
    let shouldRedirect = false;

    if (!isAuthenticated) {
        if (privatePages) {
            shouldRedirect = true;
        }
    } else if (privatePages && !user.isProvider) {
        shouldRedirect = true;
    }

    // else if (privateUserPages && user.isProvider) {
    //     shouldRedirect = true;
    // }

    if (signPages) {
        Layout = null;
    } else if (privatePages && isAuthenticated) {
        Layout = AuthLayout;
    } else {
        Layout = DefaultLayout;
    }

    return (
        <ReactDOMRoute
            {...rest}
            render={() => {
                if (shouldRedirect) {
                    return (
                        <Layout>
                            <Redirect
                                to={{
                                    pathname: '/',
                                }}
                            />
                        </Layout>
                    );
                }

                if (Layout) {
                    return (
                        <Layout>
                            <Component />
                        </Layout>
                    );
                }

                return <Component />;
            }}
        />
    );
};

export default Route;
