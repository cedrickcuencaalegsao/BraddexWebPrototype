import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
import AuthRoutes from "./AuthRoutes";

// Components Admin.
import Home from "./pages/home/admin/home";
import Users from "./pages/users/users";
import Product from "./pages/product/product";
import OrderList from "./pages/orders/order";
import Delivery from "./pages/delivery/delivery";
import StatList from "./pages/stat/stat";
import Notification from "./pages/notification/admin/notif";
import NewMenu from "./pages/new_menu/newMenu";
import UpdateMenu from "./pages/update/update";

// guest View.
import Login from "./pages/login/login";
import Register from "./pages/register/register";

// Components Cleint.
import ClientHome from "./pages/home/client/c_home";
import ClientMenu from "./pages/Menu/menu";
import Cart from "./pages/cart/cart";
import ClientDelivery from "./pages/delivery/client/delivery";
import ClientHistory from "./pages/history/history";
import ClientSupport from "./pages/Support/support";
import ClientAnnouncement from "./pages/announcement/announcement";
import ClientSettings from "./pages/settings/settings";
import ClientPrivacy from "./pages/privacy/privacy";
import ClientUserProfile from "./pages/profile/client/profile";

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
          <AuthRoutes path="/products" component={Product} isAdminRoute />
          <AuthRoutes path="/orders" component={OrderList} isAdminRoute />
          <AuthRoutes path="/delivery" component={Delivery} isAdminRoute />
          <AuthRoutes path="/statistics" component={StatList} isAdminRoute />
          <AuthRoutes path="/notification" component={Notification} isAdminRoute />
          <AuthRoutes path="/newmenu" component={NewMenu} isAdminRoute/>
          <AuthRoutes path="/updatemenu" component={UpdateMenu} isAdminRoute/>
          {/* Client Routes */}
          <AuthRoutes path="/client-home" component={ClientHome} />
          <AuthRoutes path="/client-Menu" component={ClientMenu}/>
          <AuthRoutes path="/client-cart" component={Cart}/>
          <AuthRoutes path="/client-delivery" component={ClientDelivery}/>
          <AuthRoutes path="/client-history" component={ClientHistory}/>
          <AuthRoutes path="/client-support" component={ClientSupport}/>
          <AuthRoutes path="/client-announcement" component={ClientAnnouncement}/>
          <AuthRoutes path="/client-settings" component={ClientSettings}/>
          <AuthRoutes path="/client-privacy" component={ClientPrivacy}/>
          <AuthRoutes path="/client-profile" component={ClientUserProfile} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
