import React from "react";
import "./CartLeftBottom.scss";
import { useEffect, useState } from "react";

const EditCartLeftBottom = (data) => {
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    if (data !== null) {
      setCartData(data.data);
    }
  }, [data]);

  
  return (
    <div className="edit-cart-left-bottom">
      <div className="title-wrapper">
        <h1 className="title">Cart Details</h1>
      </div>
      <div className="details-container">
        <div className="item">
          <span className="indicator">Cart ID:</span>
          <span className="value">{cartData.cartID}</span>
        </div>
        <div className="item">
          <span className="indicator">Menu ID:</span>
          <span className="value">{cartData.menuID}</span>
        </div>
        <div className="item">
          <span className="indicator">Owner ID:</span>
          <span className="value">{cartData.userID}</span>
        </div>
      </div>
    </div>
  );
};
export default EditCartLeftBottom;
