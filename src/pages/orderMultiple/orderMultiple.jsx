import "./orderMultiple.scss";
import ClientSideBar from "../../components/client/sideBar/client_sidebar";
import ClientNavBar from "../../components/client/navBar/client_navBar";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useState } from "react";
import axios from "axios";
import { generateRandomID } from "../../idgenerator";

const ClientOrderMultiple = () => {
  const selectedItems = useParams();
  const [menu, setMenu] = useState([]);
  const [dataToSend, setDataToSend] = useState([]);
  let data = selectedItems.data;
  const dataArray = data.split(",");
  const uuID = localStorage.getItem("uuid");
  const orderID = generateRandomID();

  const getMultipleOrderApi = async () => {
    try {
      const API = await axios.post(
        "http://127.0.0.1:8000/api/get-multiple-order/",
        dataArray
      );
      setMenu(API.data.menu);
    } catch (error) {
      console.log(error);
    }
  };
  const handleQuantity = (menuID, action, price, menuName) => {
    console.log(menuName);
    // check if menu was in our array to be sent to the server.
    const menuIndex = dataToSend.findIndex((item) => item.menuID == menuID);
    // if menu exists, update its quantity, else add new menu as an objects.

    // update the quantity added by 1.
    const newDataToSend = [...dataToSend];

    // calculate the item price multiply buy the number of quantity to get the total price.
    const newPrice = (price) => {
      let newPrice = price * newDataToSend[menuIndex].Quantity;
      return newPrice;
    };

    if (menuIndex !== -1) {
      if (action == "increment") {
        newDataToSend[menuIndex].Quantity += 1;
        let totalPrice = newPrice(price);
        newDataToSend[menuIndex].totalPrice = totalPrice;
      } else if (action == "decrement") {
        if (newDataToSend[menuIndex].Quantity !== 0) {
          newDataToSend[menuIndex].Quantity -= 1;
          let totalPrice = newPrice(price);
          newDataToSend[menuIndex].totalPrice = totalPrice;
        } else {
          return 0;
        }
      }
      setDataToSend(newDataToSend);
    } else {
      // if menu not exists.
      if (action == "increment") {
        setDataToSend((prevDataToSend) => [
          ...prevDataToSend,
          {
            orderID: orderID,
            menuID: menuID,
            menuName: menuName,
            uuID: uuID,
            Quantity: 1,
            totalPrice: price,
          },
        ]);
      } else {
        return 0;
      }
    }
  };
  const displayQuantity = (menuID) => {
    let menuArray = dataToSend.findIndex((item) => item.menuID === menuID);
    if (menuArray !== -1) {
      return dataToSend[menuArray].Quantity;
    } else {
      return 0;
    }
  };

  return (
    <div className="order-multiple" onLoad={() => getMultipleOrderApi()}>
      <ClientSideBar />
      <div className="order-multiple-container">
        <ClientNavBar />
        <div className="order-data-main-contaner">
          <div className="top">
            <div className="upper-container">
              <div className="upper-title-wrapper">
                <h3 className="upper-title">Order Receipt</h3>
              </div>
              <div className="btn-place-order-wrapper">
                <button className="btn-place-order">Place Order</button>
              </div>
            </div>
            <div className="lower-container">
              {dataToSend.map((item) =>
                item.Quantity !== 0 ? (
                  <div className="menu-receipt-container" key={item.menuID}>
                    <div className="left-menu-receipt-wrapper">
                      <span className="menu-receipt-value">Order ID</span>
                      <span className="menu-receipt-value">Menu ID</span>
                      <span className="menu-receipt-value">Menu Name</span>
                      <span className="menu-receipt-value">Quantity</span>
                      <span className="menu-receipt-value">Total Price</span>
                    </div>
                    <div className="right-menu-receipt-wrapper">
                      <span className="menu-receipt-value">{item.orderID}</span>
                      <span className="menu-receipt-value">{item.menuID}</span>
                      <span className="menu-receipt-value">
                        {item.menuName}
                      </span>
                      <span className="menu-receipt-value">
                        {item.Quantity}
                      </span>
                      <span className="menu-receipt-value">
                        {item.totalPrice}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div key={item.id}></div>
                )
              )}
            </div>
          </div>
          <div className="bottom">
            {menu.map((item) => (
              <div className="menu-continer" key={item.menuID}>
                <div className="menu-title-container">
                  <div className="title-menu-container">
                    <h3 className="menu-title">Menu</h3>
                  </div>
                  <div className="quantity-container">
                    <div className="add-wrapper">
                      <button
                        className="btn-add"
                        onClick={() =>
                          handleQuantity(
                            item.menuID,
                            "increment",
                            item.price,
                            item.menu_name
                          )
                        }
                      >
                        +
                      </button>
                    </div>
                    <div className="qantity-wrapper">
                      <span className="quantity">
                        {displayQuantity(item.menuID)}
                      </span>
                    </div>
                    <div className="diff-wrapper">
                      <button
                        className="btn-diff"
                        onClick={() =>
                          handleQuantity(
                            item.menuID,
                            "decrement",
                            item.price,
                            item.menu_name
                          )
                        }
                      >
                        -
                      </button>
                    </div>
                  </div>
                </div>
                <div className="center-menu-container">
                  <div className="image-wrapper">
                    <img
                      src={`http://127.0.0.1:8000/images/menu/${item.image}`}
                      alt="menuPicture"
                      className="image"
                    />
                  </div>
                </div>
                <div className="bottom-menu-container">
                  <div className="menu-name-container">
                    <div className="menu-name-wrapper">
                      <h3 className="menu-name">{item.menu_name}</h3>
                    </div>
                    <div className="menu-name-indicator-wrapper">
                      <span className="menu-name-indicator">Menu Name</span>
                    </div>
                  </div>
                  <div className="menu-price-container">
                    <div className="menu-price-wrapper">
                      <h3 className="menu-price">{`₱ ${item.price}.00`}</h3>
                    </div>
                    <div className="menu-price-indicator-wrapper">
                      <span className="menu-price-indicator">Menu Price</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientOrderMultiple;
