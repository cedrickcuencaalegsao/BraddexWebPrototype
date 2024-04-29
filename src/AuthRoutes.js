import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom/cjs/react-router-dom.min";

const AuthRoute = ({ component: Component, ...rest }) => {
    const token = localStorage.getItem('token');

    return(
        <Route
        {...rest}
        render={(props)=>
            token ? (
                <Component {...props}/>
            ) : (
                <Redirect to={{pathname:"/", state:{from: props.location}}}/>
            )
        }
        />
    )
}
export default AuthRoute;