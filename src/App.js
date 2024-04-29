import React, { useState, useEffect, createContext, useMemo } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom/cjs/react-router-dom.min";
import AuthRoute from "./AuthRoutes";

// Components
import Home from "./pages/home/home";
import Users from "./pages/users/users";
import Product from "./pages/product/product";
import OrderList from "./pages/orders/order";
import Delivery from "./pages/delivery/delivery";
import StatList from "./pages/stat/stat";
import Login from "./pages/login/login";
import Register from "./pages/register/register";

export const AppContext = createContext();

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({});
  // const [isAdmin, setIsAdmin] = useState(()=>{
  //   return localStorage.getItem("isAdmin") === 'true';
  // });


  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const contextValue = useMemo(() => (
    {
      userData,
      setUserData,
      isLoggedIn
    }
  ), [
    userData,
    isLoggedIn
  ]
  );

  return (
    <div className="App">
      <AppContext.Provider value={contextValue}>
        <Router>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/register" component={Register} />
            <AuthRoute path="/home" component={Home} />
            <AuthRoute path="/users" component={Users} />
            <AuthRoute path="/products" component={Product} />
            <AuthRoute path="/orders" component={OrderList} />
            <AuthRoute path="/delivery" component={Delivery} />
            <AuthRoute path="/statistics" component={StatList} />
          </Switch>
        </Router>
      </AppContext.Provider>
    </div>
  );
};

export default App;
