import React, { useState, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";

const AuthRoutes = ({ component: Component, isAdminRoute, ...rest }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedIsAdmin = localStorage.getItem("isAdmin");
    setIsLoggedIn(!!token);
    setIsAdmin(storedIsAdmin === "true");
    setLoading(false);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn ? (
          isAdminRoute ? (
            isAdmin ? (
              <Component {...props} />
            ) : (
              <Redirect to={{ pathname: "/client-home", state: { from: props.location } }} />
            )
          ) : (
            <Component {...props} />
          )
        ) : (
          <Redirect to={{ pathname: "/", state: { from: props.location } }} />
        )
      }
    />
  );
};

export default AuthRoutes;
