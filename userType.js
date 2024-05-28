import React, { useState, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";

const IsAdmin = ({ component: Component, ...rest }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedIsAdmin = localStorage.getItem("isAdmin");
    setIsAdmin(storedIsAdmin === "true");
    setLoading(false);
  }, []);

  if (loading) {
    // Optional: Render a loading indicator while checking isAdmin status
    return <div>Loading...</div>;
  }

  return (
    <Route
      {...rest}
      render={(props) =>
        isAdmin ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/cHome", state: { from: props.location } }} />
        )
      }
    />
  );
};

export default IsAdmin;
