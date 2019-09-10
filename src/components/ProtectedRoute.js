import React from 'react'
import {Route, Redirect} from 'react-router-dom';
import checkToken from './checkLoginStatus';

const ProtectedRoute = ({ component: Component, ...rest}) => (
    <Route {...rest} render={props => (
        checkToken() ? (
            <Component {...props} />
        ) : (
            console.log("can't let you in"),
            <Redirect to={{
                pathname: '/login',
                state: {from: props.location}
            }} />
        )
    )} />
)

export default ProtectedRoute
