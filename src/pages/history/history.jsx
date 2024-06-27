import "./history.scss";
import ClientNavBar from "../../components/client/navBar/client_navBar";
import ClientSideBar from "../../components/client/sideBar/client_sidebar";
import { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";

const ClientHistory = () => {
  const [userHistory, setUserHistory] = useState({});
  const [userCart, setUserCart] = useState([]);
  const [userOrder, setUserOrder] = useState([]);
  const uuid = localStorage.getItem("uuid");

  
  console.log(userCart, userOrder);
  useEffect(() => {
    const getCartHistoryAPI = async () => {
      try {
        const API = await axios.get(
          `http://127.0.0.1:8000/api/get-user-history/${uuid}`
        );
        setUserHistory(API.data);
      } catch (error) {
        console.log(error);
      }
    };
    getCartHistoryAPI();
    const interval = setInterval(() => {
      getCartHistoryAPI();
    }, 1000);
    return () => clearInterval(interval);
  }, [uuid]);

  useEffect(() => {
    const makeArray = () => {
      let arrayCart = userHistory.cart;
      let arrayOrder = userHistory.order;
      setUserCart(arrayCart);
      setUserOrder(arrayOrder);
    };
    const count = Object.values(userHistory).reduce(
      (sum, array) => sum + array.length,
      0
    );
    if (count > 0) {
      makeArray();
    }
  }, [userHistory]);

  const formattedDate = (data) => {
    if (data !== null) {
      return moment(data).format("YYYY-MM-DD");
    }
    return "Not Updated";
  };

  const formatIdDeleted = (data) => {
    if (data === 1) {
      return "Deleted";
    }
    return "Not Deleted";
  };

  return (
    <div className="history">
      <ClientSideBar />
      <div className="historyContianer">
        <ClientNavBar />
        <div className="content-container">
          <div className="display-data-container">
            <div className="cart-container">
              <div className="cart-title-wrapper">
                <h1 className="cart-title">Cart History</h1>
              </div>
              {userCart.map((item) => (
                <div className="cart-row" key={item.id}>
                  <div className="items">
                    <span className="item-indicator">Cart ID:</span>
                    <span className="item-value">{item.cartID}</span>
                  </div>
                  <div className="items">
                    <span className="item-indicator">Menu ID:</span>
                    <span className="item-value">{item.menuID}</span>
                  </div>
                  <div className="items">
                    <span className="item-indicator">Date Added:</span>
                    <span className="item-value">
                      {formattedDate(item.created_at)}
                    </span>
                  </div>
                  <div className="items">
                    <span className="item-indicator">Date Updated:</span>
                    <span className="item-value">
                      {formattedDate(item.updated_at)}
                    </span>
                  </div>
                  <div className="items">
                    <span className="item-indicator">Deleted:</span>
                    <span className="item-value">
                      {formatIdDeleted(item.isDeleted)}
                    </span>
                  </div>
                  <div className="action-icon">
                    <DeleteOutlinedIcon className="icon" />
                  </div>
                </div>
              ))}
            </div>
            <div className="order-container">
              {userOrder.map((item) => (
                <div key={item.id}>
                  <span>{item.menuID}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientHistory;
