import "./AllData.scss";
import { BarChart } from "@mui/x-charts/BarChart";
import ExpandLessOutlinedIcon from "@mui/icons-material/ExpandLessOutlined";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import { useEffect, useState } from "react";

// summary of all data.
const AllDataStatistics = (args) => {
  const [userData, setUserData] = useState([]);
  const [cartData, setCartData] = useState([]);
  const [menuData, setMenuData] = useState([]);
  const [orderData, setOrderData] = useState([]);
  const [collapsed, setCollapsed] = useState(false);
  const handelCollpase = () => {
    setCollapsed(!collapsed);
  };
  useEffect(() => {
    let data = args.data;
    if (data) {
      setUserData(data[0]);
      setCartData(data[1]);
      setMenuData(data[2]);
      setOrderData(data[3]);
    }
  }, [args]);

  // users data overview.
  let online_per = (userData.online_user / userData.count_user) * 100;
  let offline_per = (userData.offline_user / userData.count_user) * 100;
  let activeAcc_per = (userData.active_account / userData.count_user) * 100;
  let inactiveAcc_per = (userData.inactive_account / userData.count_user) * 100;
  // cart data overview.
  let cart_deleted = (cartData.cart_deletd / cartData.count_cart) * 100;
  let cart_not_deleted =
    (cartData.cart_not_deleted / cartData.count_cart) * 100;
  let cart_not_updated =
    (cartData.cart_not_updated / cartData.count_cart) * 100;
  let cart_updated =
    ((cartData.count_cart - cartData.cart_not_updated) / cartData.count_cart) *
    100;
  // menu data overview.
  let available = (menuData.available / menuData.count_menu) * 100;
  let not_available = (menuData.not_available / menuData.count_menu) * 100;
  let limited = (menuData.limited / menuData.count_menu) * 100;
  let best_selling = (menuData.best_selling / menuData.count_menu) * 100;
  // order data overview.
  let is_paid_order = (orderData.is_paid / orderData.count_order) * 100;
  let is_cancelled_order =
    (orderData.is_cancelled / orderData.count_order) * 100;
  let is_delivered_order =
    (orderData.is_delivered / orderData.count_order) * 100;
  let is_deleted_order = (orderData.is_deleted / orderData.count_order) * 100;
  
  return (
    <div className="all-data-statistics">
      <div className="top-wrapper">
        <div className="title-wrapper">
          <span className="title">Statistics Overview</span>
        </div>
        <div className="collapse-wrapper">
          <div className="toggleButton" onClick={handelCollpase}>
            {collapsed ? (
              <ExpandMoreOutlinedIcon />
            ) : (
              <ExpandLessOutlinedIcon />
            )}
          </div>
        </div>
      </div>
      <div
        className={`graph-wrapper ${collapsed ? "collapsed" : "not-colapsed"}`}
      >
        <BarChart
          series={[
            {
              data: [
                online_per.toFixed(2),
                cart_deleted.toFixed(2),
                available.toFixed(2),
                is_paid_order.toFixed(2),
              ],
            },
            {
              data: [
                offline_per.toFixed(2),
                cart_not_deleted.toFixed(2),
                not_available.toFixed(2),
                is_cancelled_order.toFixed(2),
              ],
            },
            {
              data: [
                activeAcc_per.toFixed(2),
                cart_not_updated.toFixed(2),
                limited.toFixed(2),
                is_delivered_order.toFixed(2),
              ],
            },
            {
              data: [
                inactiveAcc_per.toFixed(2),
                cart_updated.toFixed(2),
                best_selling.toFixed(2),
                is_deleted_order.toFixed(2),
              ],
            },
          ]}
          height={250}
          xAxis={[
            { data: ["User", "Cart", "Menu", "Order"], scaleType: "band" },
          ]}
          margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
        />
      </div>
    </div>
  );
};
export default AllDataStatistics;
