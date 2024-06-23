import "./BottomLeft.scss";
import { useEffect, useState } from "react";

const EditOrderBottomLeft = (data) => {
  let data_passed = data.data;
  const [dataPassed, setDataPassed] = useState([]);

  useEffect(() => {
    setDataPassed(data_passed);
  }, [data_passed]);

  return (
    <div className="edit-order-bottom-left">
      {dataPassed.map((item) => (
        <div className="details-container" key={item.id}>
          <div className="title-wrapper">
            <spam className="title">Order summary</spam>
          </div>
          <div className="details-wrapper">
            <div className="left-order-details-wrapper">
              <div className="items">
                <span className="indicator">order id </span>
                <span className="value">{item.orderID}</span>
              </div>
              <div className="items">
                <span className="indicator">owner id </span>
                <span className="value">{item.userID}</span>
              </div>
              <div className="items">
                <span className="indicator">payment type </span>
                <span className="value">{item.paymentType}</span>
              </div>
              <div className="items">
                <span className="indicator">quantity </span>
                <span className="value">{item.quantity}</span>
              </div>
            </div>
            <div className="right-order-details-wrapper">
              <div className="items">
                <span className="indicator">delivery address </span>
                <span className="value">{item.userAddress}</span>
              </div>
              <div className="items">
                <span className="indicator">Cancelled </span>
                <span className="value">
                  {item.isCancelled === 1 ? "True" : "False"}
                </span>
              </div>
              <div className="items">
                <span className="indicator">Paid </span>
                <span className="value">
                  {item.isPaid === 1 ? "True" : "False"}
                </span>
              </div>
              <div className="items">
                <span className="indicator">Delivered </span>
                <spam className="value">
                  {item.isDelivered === 1 ? "True" : "False"}
                </spam>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default EditOrderBottomLeft;
