import React from 'react';
import { Route as ReactDOMRoute, RouteProps as ReactDOMRouteProps, Redirect } from 'react-router-dom';
import { useAuth } from '../hooks/Auth';
import DefaultLayout from '../pages/_layouts/default';
import AuthLayout from '../pages/_layouts/auth';

interface RouteProps extends ReactDOMRouteProps {
    isPrivate?: boolean;
    signPages?: boolean;
    component: React.ComponentType;
}

const Route: React.FC<RouteProps> = ({ isPrivate = false, signPages = false, component: Component }, ...rest) => {
    const { user } = useAuth();
    let Layout: any;
    if (signPages) {
        Layout = null;
    } else {
        Layout = user ? AuthLayout : DefaultLayout;
    }

    return (
        <ReactDOMRoute
            {...rest}
            render={({ location }) => {
                if (Layout) {
                    return isPrivate === !!user ? (
                        <Layout>
                            <Component />
                        </Layout>
                    ) : (
                        <Layout>
                            <Redirect
                                to={{
                                    pathname: isPrivate ? '/' : '/home',
                                    state: { from: location },
                                }}
                            />
                        </Layout>
                    );
                }
                return <Component />;
            }}
        />
    );
};

export default Route;
