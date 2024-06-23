import { useEffect, useState } from "react";
import "./TopRight.scss";

const EditOrderTopRight = (data) => {
  const order_data = data.data;
  const [orderData, setOrderData] = useState([]);

  useEffect(() => {
    if (order_data) {
      setOrderData(order_data);
    }
  }, [order_data]);

  console.log(orderData);

  return (
    <div className="edit-order-top-right">
      <div className="title-wrapper">
        <span className="title">Edit Order Data</span>
      </div>
      {orderData.map((item) => (
        <div className="edit-order-data-container" key={item.id}>
          <span>{item.orderID}</span>
        </div>
      ))}
    </div>
  );
};

export default EditOrderTopRight;
