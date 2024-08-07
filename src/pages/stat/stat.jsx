import "./stat.scss";
import SideBar from "../../components/sideBar/side_bar";
import AllDataStatistics from "../../components/StatisticsComponents/AllData/AllData";
import UserWidgets from "../../components/StatisticsComponents/UserWidgets/UserWidgets";
import CartWidgets from "../../components/StatisticsComponents/CartWidgets/CartWidgets";
import MenuWidgets from "../../components/StatisticsComponents/MenuWidgets/MenuWidgets";
import OrderWidgets from "../../components/StatisticsComponents/OrderWidgets/OrderWidgets";
import { useEffect, useState } from "react";
import axios from "axios";

const StatList = () => {
  const [userData, setUserData] = useState({});
  const [cartData, setCartData] = useState({});
  const [menuData, setMenuData] = useState({});
  const [orderData, setOrderData] = useState({});

  let all_data = [userData, cartData, menuData, orderData];

  useEffect(() => {
    const getAllSystemStatistics = async () => {
      try {
        const API = await axios.get(
          "http://127.0.0.1:8000/api/gel-all-statistics"
        );
        setUserData(API.data.user_data);
        setCartData(API.data.cart_data);
        setMenuData(API.data.menu_data);
        setOrderData(API.data.order_data);
      } catch (error) {
        console.log(error);
      }
    };
    getAllSystemStatistics();
    const interval = setInterval(() => {
      getAllSystemStatistics();
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="statList">
      <SideBar className="side-bar"/>
      <div className="statContainer">
        <div className="content">
          <AllDataStatistics data={all_data} />
          <UserWidgets data={userData} />
          <CartWidgets data={cartData} />
          <MenuWidgets data={menuData} />
          <OrderWidgets data={orderData} />
        </div>
      </div>
    </div>
  );
};

export default StatList;
