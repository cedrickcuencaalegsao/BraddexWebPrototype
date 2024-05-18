import "./widget.scss";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import HorizontalRuleOutlinedIcon from "@mui/icons-material/HorizontalRuleOutlined";
import { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Widgets = ({ type }) => {
  const [data, setData] = useState([]);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const history = useHistory();

  let new_data; // setting new array.

  // user widgets calculations.
  let total_users = data.users; // get total number of user.
  let userPercentageOnline = (data.online / total_users) * 100;
  let userPercentageOffline = (data.offline / total_users) * 100;
  // products widgets calculations.
  let total_products = products.menu;
  let available = (products.available / total_products) * 100;
  let notavailable = (products.notAvailable / total_products) * 100;
  let limited = (products.limited / total_products) * 100;
  // cart widgets calculation.
  let total_cart = 0;
  // order widgets calculation.
  let total_order = 0;
  // delivery widgets calculation.
  let total_delivery = 0;

  useEffect(() => {
    const getAdminUsersWidgetsAPI = async () => {
      try {
        const API = await axios.get(
          "http://127.0.0.1:8000/api/get-admin-users-widgets"
        );
        setData(API.data);
      } catch (error) {
        console.log(error);
      }
    };
    getAdminUsersWidgetsAPI();
    const interval = setInterval(() => {
      getAdminUsersWidgetsAPI();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const getAdminPoductsAPI = async () => {
      try {
        const API = await axios.get(
          "http://127.0.0.1:8000/api/get-admin-products-widgets"
        );
        setProducts(API.data);
      } catch (error) {
        console.log(error);
      }
    };
    getAdminPoductsAPI();
    const interval = setInterval(() => {
      getAdminPoductsAPI();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const getAdminCartAPI = async () => {
      try {
        const API = await axios.get("http://127.0.0.1:8000/api/get-admin-cart-widgets");
        setCart(API.data);
      } catch (error) {
        console.log(error);
      }
    };
    getAdminCartAPI();
    const interval = setInterval(() => {
      getAdminCartAPI();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const seeDetails = (navLink) => {
    history.push(navLink);
  };

  switch (type) {
    case "user":
      new_data = {
        title: "USERS",
        isMoney: false,
        number: total_users,
        percentagePositive: userPercentageOnline.toFixed(2) + "%",
        percentagePositiveIcon: <KeyboardArrowUpOutlinedIcon />,
        percentageNegative: userPercentageOffline.toFixed(2) + "%",
        percentageNegativeIcon: <ExpandMoreOutlinedIcon />,
        navLink: "/users",
        link: (
          <div onClick={() => seeDetails(new_data.navLink)}>
            <span className="link">See Details</span>
          </div>
        ),
        icon: (
          <PersonOutlinedIcon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255,0,0,0.2)",
            }}
          />
        ),
      };
      break;
    case "products":
      new_data = {
        title: "PRODUCTS",
        number: total_products,
        percentagePositive: available.toFixed(2) + "%",
        percentagePositiveIcon: <KeyboardArrowUpOutlinedIcon />,
        percentageLimited: limited.toFixed(2) + "%",
        percentageLimitedIcon: <HorizontalRuleOutlinedIcon />,
        percentageNegative: notavailable.toFixed(2) + "%",
        percentageNegativeIcon: <ExpandMoreOutlinedIcon />,
        percentage: 0,
        navLink: "/products",
        link: (
          <div onClick={() => seeDetails(new_data.navLink)}>
            <span className="link">See Details</span>
          </div>
        ),
        icon: (
          <MonetizationOnOutlinedIcon
            className="icon"
            style={{
              color: "green",
              backgroundColor: "rgba(0,128,0,0.2)",
            }}
          />
        ),
      };
      break;
    case "cart":
      new_data = {
        title: "CART",
        number: total_cart,
        percentagePositive: userPercentageOnline.toFixed(2) + "%",
        percentagePositiveIcon: <KeyboardArrowUpOutlinedIcon />,
        percentageNegative: userPercentageOffline.toFixed(2) + "%",
        percentageNegativeIcon: <ExpandMoreOutlinedIcon />,
        percentage: 0,
        navLink: "/cart",
        link: (
          <div onClick={() => seeDetails(new_data.navLink)}>
            <span className="link">See Details</span>
          </div>
        ),
        icon: (
          <ShoppingCartOutlinedIcon
            className="icon"
            style={{
              color: "goldenrod",
              backgroundColor: "rgba(218,165,32,0.2)",
            }}
          />
        ),
      };
      break;
    case "order":
      new_data = {
        title: "ORDER",
        number: total_order,
        percentagePositive: userPercentageOnline.toFixed(2) + "%",
        percentagePositiveIcon: <KeyboardArrowUpOutlinedIcon />,
        percentageNegative: userPercentageOffline.toFixed(2) + "%",
        percentageNegativeIcon: <ExpandMoreOutlinedIcon />,
        percentage: 0,
        navLink: "/orders",
        link: (
          <div onClick={() => seeDetails(new_data.navLink)}>
            <span className="link">See Details</span>
          </div>
        ),
        icon: (
          <Inventory2OutlinedIcon
            className="icon"
            style={{
              color: "purple",
              backgroundColor: "rgba(128,0,128,0.2)",
            }}
          />
        ),
      };
      break;
    case "delivery":
      new_data = {
        title: "DELIVERY",
        number: total_delivery,
        percentagePositive: userPercentageOnline.toFixed(2) + "%",
        percentagePositiveIcon: <KeyboardArrowUpOutlinedIcon />,
        percentageNegative: userPercentageOffline.toFixed(2) + "%",
        percentageNegativeIcon: <ExpandMoreOutlinedIcon />,
        percentage: 0,
        navLink: "/delivery",
        link: (
          <div onClick={() => seeDetails(new_data.navLink)}>
            <span className="link">See Details</span>
          </div>
        ),
        icon: (
          <LocalShippingOutlinedIcon
            className="icon"
            style={{
              color: "blue",
              backgroundColor: "rgba(96, 93, 255, 0.53)",
            }}
          />
        ),
      };
      break;
    default:
      break;
  }

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{new_data.title}</span>
        <span className="counter">{new_data.number}</span>
        <span className="link">{new_data.link}</span>
      </div>
      <div className="rigth">
        <div className="percentage positive">
          {new_data.percentagePositiveIcon}
          {new_data.percentagePositive}
        </div>
        <div className="percentage limited">
          {new_data.percentageLimitedIcon}
          {new_data.percentageLimited}
        </div>
        <div className="percentage negative">
          {new_data.percentageNegativeIcon}
          {new_data.percentageNegative}
        </div>
        {new_data.icon}
      </div>
    </div>
  );
};

export default Widgets;
