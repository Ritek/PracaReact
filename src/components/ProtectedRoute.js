import React from 'react'
import {Route, Redirect} from 'react-router-dom';
import checkToken from './checkLoginStatus';

const ProtectedRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        checkToken() ? (
            <Component {...props} />
        ) : (
            <Redirect to={{ pathname: '/login' }} />
        )
    )} 
    />
)

export default ProtectedRoute
