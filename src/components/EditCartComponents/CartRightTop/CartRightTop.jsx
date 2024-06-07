import { useEffect, useState } from "react";
import "./CartRightTop.scss";

const EditCartRightTop = (data) => {
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    if (data.data !== null) {
      setCartData(data.data);
    }
  }, [data]);

  return (
    <div className="edit-cart-right-top">
      <div className="title-wrapper">
        <h1 className="title">Cart information</h1>
      </div>
      <div className="cart-details-wrapper">
        {cartData.length === 0 ? (
          <div className="loading-wrapper">
            <h1 className="loading">Loading...</h1>
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
                  <span className="indicator"></span>
                  <input type="text" className="value" />
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
