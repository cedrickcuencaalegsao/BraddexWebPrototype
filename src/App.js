import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AuthRoutes from "./AuthRoutes";

// Components Admin.
import Home from "./pages/home/admin/home";
import Users from "./pages/users/users";
import Product from "./pages/product/product";
import AdminCart from "./pages/cart/admin/cart";
import OrderList from "./pages/orders/order";
import Delivery from "./pages/delivery/delivery";
import Inventory from "./pages/Invintory/Invnetory";
import StatList from "./pages/stat/stat";
import NewMenu from "./pages/new_menu/newMenu";
import AdminProfile from "./pages/profile/admin/profile";
// Admin Edit Pages.
import EditUser from "./pages/EditUser/editUser";
import EditCart from "./pages/EditCart/EditCart";
import EditMenu from "./pages/EditMenu/EditMenu";
import EditOrder from "./pages/EditOrder/EditOrder";

// guest View.
import Login from "./pages/login/login";
import Register from "./pages/register/register";

// Components Cleint.
import ClientHome from "./pages/home/client/c_home";
import ClientMenu from "./pages/Menu/menu";
import ClientOrderNow from "./pages/orderNow/orderNow";
import Cart from "./pages/cart/cart";
import ClientDelivery from "./pages/delivery/client/delivery";
import ClientHistory from "./pages/history/history";
import ClientSettings from "./pages/settings/client/settings";
import ClientPrivacy from "./pages/privacy/privacy";
import ClientUserProfile from "./pages/profile/client/profile";
import ClientOrderMultiple from "./pages/orderMultiple/orderMultiple";
import ClientAbout from "./pages/about/about";

const App = () => {
  return (
    <div className="App">
      <Router>
        <Switch>
          {/* Guest Routes */}
          <Route exact path="/" component={Login} />
          <Route path="/register" component={Register} />

          {/* Admin Routes */}
          <AuthRoutes path="/home" component={Home} isAdminRoute />
          <AuthRoutes path="/users" component={Users} isAdminRoute />
          <AuthRoutes
            path="/edit-user/:userUUID"
            component={EditUser}
            isAdminRoute
          />
          <AuthRoutes path="/cart" component={AdminCart} isAdminRoute />
          <AuthRoutes
            path="/edit-cart/:cartID"
            component={EditCart}
            isAdminRoute
          />
          <AuthRoutes path="/products" component={Product} isAdminRoute />
          <AuthRoutes
            path="/update-menu/:menuID"
            component={EditMenu}
            isAdminRoute
          />
          <AuthRoutes path="/orders" component={OrderList} isAdminRoute />
          <AuthRoutes path="/edit-order/:orderID" component={EditOrder} isAdminRoute />
          <AuthRoutes path="/delivery" component={Delivery} isAdminRoute />
          <AuthRoutes path="/inventory" component={Inventory} isAdminRoute />
          <AuthRoutes path="/statistics" component={StatList} isAdminRoute />
          <AuthRoutes
            path="/notification"
            component={Notification}
            isAdminRoute
          />
          <AuthRoutes path="/newmenu" component={NewMenu} isAdminRoute />
          <AuthRoutes path="/profile" component={AdminProfile} isAdminRoute />

          {/* Client Routes */}
          <AuthRoutes path="/client-home" component={ClientHome} />
          <AuthRoutes path="/client-Menu" component={ClientMenu} />
          <AuthRoutes path="/client-cart" component={Cart} />
          <AuthRoutes
            path="/client-order-now/:menuID"
            component={ClientOrderNow}
          />
          <AuthRoutes
            path="/client-order-multiple/:data"
            component={ClientOrderMultiple}
          />
          <AuthRoutes path="/client-delivery" component={ClientDelivery} />
          <AuthRoutes path="/client-history" component={ClientHistory} />
          <AuthRoutes path="/client-settings" component={ClientSettings} />
          <AuthRoutes path="/client-privacy" component={ClientPrivacy} />
          <AuthRoutes path="/client-profile" component={ClientUserProfile} />
          <AuthRoutes path="/client-about" component={ClientAbout} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
