import "./orderNow.scss";
import ClientSideBar from "../../components/client/sideBar/client_sidebar";
import ClientNavBar from "../../components/client/navBar/client_navBar";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";
import { useState } from "react";
import LinearProgress from "@mui/material/LinearProgress";
import { generateRandomID } from "../../idgenerator";

const ClientOrderNow = () => {
  const menuID = useParams();
  const [orderID, setOrderID] = useState("");
  const [loading, setLoading] = useState(true);
  const [menu, setMenu] = useState([]);
  const [quantity, setQuantity] = useState(0);
  const [totalAmmount, setTotalAmmount] = useState(0);
  const [paymentType, setPaymentType] = useState("");

  

  let data = {
    orderID: orderID,
    menuID: menu.menuID,
    menuName: menu.menu_name,
    menuPrice: menu.price,
    quantity: quantity,
    totalAmmount: totalAmmount,
    paymentType: paymentType,
  };

  const getOrderNowMenuAPI = async () => {
    try {
      const API = await axios.get(
        `http://127.0.0.1:8000/api/get-order-now-menu/${menuID.menuID}`
      );
      return API.data.menu;
    } catch (error) {
      console.log(error);
    }
  };

  const onload = async () => {
    const data = await getOrderNowMenuAPI();
    setMenu(data);
    setLoading(false);
    setOrderID(generateRandomID());
  };

  const calcTotalAmmount = (price, newQantity) => {
    let calcAmmount = price * newQantity;
    setTotalAmmount(calcAmmount);
  };

  const increment = (price) => {
    setQuantity((prevQuantity) => {
      const newQuantity = prevQuantity + 1;
      calcTotalAmmount(price, newQuantity);
      return newQuantity;
    });
  };

  const decrement = (price) => {
    setQuantity((prevQuantity) => {
      const newQantity = prevQuantity > 0 ? prevQuantity - 1 : 0;
      calcTotalAmmount(price, newQantity);
      return newQantity;
    });
  };

  const handlePlaceOrder = async () => {
    console.log(data);
  };

  return (
    <div className="order-now" onLoad={() => onload()}>
      <ClientSideBar />
      <div className="order-now-container">
        <ClientNavBar />
        <div className="progress">
          {loading ? (
            <div className="loading">
              <LinearProgress
                sx={{
                  bgcolor: "lightgray",
                  "& .MuiLinearProgress-bar": { bgcolor: "orangered" },
                }}
              />
            </div>
          ) : (
            <div className="loading"></div>
          )}
        </div>
        <div className="data-page-container">
          <div className="page-title-container">
            <h1 className="page-title">Order Menu</h1>
          </div>
          <div className="menu-form">
            <div className="left-container">
              <div className="image-wrapper">
                <img
                  src={`http://127.0.0.1:8000/images/menu/${menu.image}`}
                  alt="image"
                  className="image"
                />
              </div>
              <div className="menu-small-detials-container">
                <div className="menu-name-container">
                  <span className="menu-name-indicator">Menu Name:</span>
                  <h1 className="menu-name-value">{menu.menu_name}</h1>
                </div>
                <div className="menu-price-container">
                  <span className="menu-price-idicator">Menu Price:</span>
                  <h1>{`₱ ${menu.price}.00`}</h1>
                </div>
              </div>
            </div>
            <div className="right-container">
              <div className="right-title-container">
                <h1 className="right-title">Order Details</h1>
              </div>
              <div className="order-summary-container">
                <div className="order-title-container">
                  <h3 className="order-title">Order Summary</h3>
                </div>
                <div className="order-summary-details-container">
                  <div className="order-summary-indicator-wrapper">
                    <span className="order-summary-indicator">Order ID:</span>
                    <span className="order-summary-indicator">Menu Name:</span>
                    <span className="order-summary-indicator"></span>
                    <span className="order-summary-indicator"></span>
                    <span className="order-summary-indicator"></span>
                    <span className="order-summary-indicator"></span>
                    <span className="order-summary-indicator"></span>
                  </div>
                  <div className="order-summary-value-wrapper">
                    <span className="order-summary-value">{data.orderID}</span>
                    <span className="order-summary-value">{data.menuName}</span>
                    <span className="order-summary-value"></span>
                    <span className="order-summary-value"></span>
                    <span className="order-summary-value"></span>
                    <span className="order-summary-value"></span>
                    <span className="order-summary-value"></span>
                  </div>
                </div>
              </div>
              <div className="order-details-container">
                <div className="details-cotainer">
                  <div className="quantity-container">
                    <div className="quantity-indicator-wrapper">
                      <div className="quantity-indicator">Quantity</div>
                    </div>
                    <div className="quantity-button-wrapper">
                      <button
                        className="quantity-add"
                        onClick={() => increment(menu.price)}
                      >
                        +
                      </button>
                      <span className="qantity-count">{quantity}</span>
                      <button
                        className="quantity-subtract"
                        onClick={() => decrement(menu.price)}
                      >
                        -
                      </button>
                    </div>
                  </div>
                  <div className="total-ammount-container">
                    <span className="total-ammount-indicator">
                      total ammount:
                    </span>
                    <div className="total-ammount">
                      {`₱ ${totalAmmount.toFixed(2)}`}
                    </div>
                  </div>
                  <div className="payment-type-container">
                    <span className="payment-type-indicator">
                      Payment Type:
                    </span>
                    <select
                      name="paymenttype"
                      id="paymenttype"
                      className="payment-type"
                      onChange={(e) => setPaymentType(e.target.value)}
                    >
                      <option value="Select">Select</option>
                      <option value="Pay On Casher Area">
                        Pay On Casher Area
                      </option>
                      <option value="Cash On Delivery">Cash On Delivery</option>
                    </select>
                  </div>
                </div>
              </div>
              <div
                className="click-to-order-container"
                onClick={() => handlePlaceOrder()}
              >
                <button className="btn-place-order">Place Order</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ClientOrderNow;
