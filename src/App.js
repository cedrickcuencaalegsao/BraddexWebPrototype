// Main.
import Home from "./pages/home/home";
// List.
import Users from "./pages/users/users";
import Product from "./pages/product/product";
import OrderList from "./pages/orders/order";
import Delivery from "./pages/delivery/delivery";
// Useful.
import StatList from "./pages/stat/stat";

import Login from "./pages/login/login";
import Single from "./pages/single/single";
import New from "./pages/new/new";


import { BrowserRouter as Router, Route, Switch } from "react-router-dom/cjs/react-router-dom.min";
import { useState } from "react";

function App() {


  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <Home/>
          </Route>
          <Route path="/users">
            <Users/>
          </Route>
          <Route path="/products">
            <Product/>
          </Route>
          <Route path="/orders">
            <OrderList/>
          </Route>
          <Route path="/delivery">
            <Delivery/>
          </Route>
          <Route path="/stat">
            <StatList/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
