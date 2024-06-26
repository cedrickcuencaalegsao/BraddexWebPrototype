import "./stat.scss";
import SideBar from "../../components/sideBar/side_bar";
import NavBar from "../../components/navBar/nav_bar";
import UserWidgets from "../../components/StatisticsComponents/UserWidgets/UserWidgets";
import CartWidgets from "../../components/StatisticsComponents/CartWidgets/CartWidgets";
import MenuWidgets from "../../components/StatisticsComponents/MenuWidgets/MenuWidgets";
import OrderWidgets from "../../components/StatisticsComponents/OrderWidgets/OrderWidgets";
import { useEffect, useState } from "react";
import axios from "axios";

const StatList = () => {
  const [userData, setUserData] = useState([]);
  const [cartData, setCartData] = useState([]);
  const [menuData, setMenuData] = useState([]);
  const [orderData, setOrderData] = useState([]);

  useEffect(() => {
    const getAllSystemStatistics = async () => {
      try {
        const API = await axios.get(
          "http://127.0.0.1:8000/api/gel-all-statistics"
        );
        setUserData(API.data.user_data);
        setCartData(API.data.cart_data);
        console.log(API.data);
      } catch (error) {
        console.log(error);
      }
    };
    getAllSystemStatistics();
  }, []);
  console.log(userData, cartData);

  return (
    <div className="statList">
      <SideBar />
      <div className="statContainer">
        <NavBar />
        <div className="content">
          <UserWidgets />
          <CartWidgets />
          <MenuWidgets />
          <OrderWidgets />
        </div>
      </div>
    </div>
  );
};

export default StatList;
