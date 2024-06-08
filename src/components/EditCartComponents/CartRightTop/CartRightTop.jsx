import "./CartRightTop.scss";
import { useEffect, useState } from "react";
import moment from "moment";
import Switch from "@mui/material/Switch";

const EditCartRightTop = (data) => {
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    if (data.data !== null) {
      setCartData(data.data);
    }
  }, [data]);

  const formattedDate = (data) => {
    let date;
    if (data !== null) {
      date = moment(data).format("YYYY-MM-DD");
      return date;
    }
    return "No Date.";
  };

  const checked = (data) => {
    if (data !== 0) {
      return true;
    }
  };

  // console.log(cartData);

  return (
    <div className="edit-cart-right-top">
      <div className="title-wrapper">
        <h1 className="title">Cart information</h1>
      </div>
      <div className="cart-details-wrapper">
        {cartData.length === 0 ? (
          <div className="loading-wrapper">
            <span className="loading">Loading...</span>
          </div>
        ) : (
          cartData.map((item) => (
            <div className="cart-details" key={item.id}>
              <div className="left-cart-details">
                <div className="items">
                  <span className="indicator">Owner ID:</span>
                  <input
                    type="text"
                    className="value"
                    value={item.userID}
                    disabled="true"
                  />
                </div>
                <div className="items">
                  <span className="indicator">Cart ID:</span>
                  <input
                    type="text"
                    className="value"
                    value={item.cartID}
                    disabled="true"
                  />
                </div>
                <div className="items">
                  <span className="indicator">Menu ID:</span>
                  <input
                    type="text"
                    className="value"
                    value={item.menuID}
                    disabled="true"
                  />
                </div>
              </div>
              <div className="right-cart-details">
                <div className="items">
                  <span className="indicator">Date Created:</span>
                  <input
                    type={item.created_at === null ? "date" : "text"}
                    className="value"
                    disabled="true"
                    value={formattedDate(item.created_at)}
                  />
                </div>
                <div className="items">
                  <span className="indicator">Date Updated:</span>
                  <input
                    type={item.created_at === null ? "date" : "text"}
                    className="value"
                    disabled="true"
                    value={formattedDate(item.updated_at)}
                  />
                </div>
                <div className="items">
                  <span className="indicator">
                    Mark as deleted or not deleted
                  </span>
                  <Switch
                    className="switch"
                    checked={checked(item.isDeleted)}
                  />
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default EditCartRightTop;
