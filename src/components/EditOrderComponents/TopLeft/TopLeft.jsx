import "./TopLeft.scss";
import { useEffect, useState } from "react";

const EditOrderTopLeft = (data) => {
  const data_top = data.data;
  const [dataTop, setDataTop] = useState([]);

  useEffect(() => {
    if (data_top) {
      setDataTop(data_top);
    }
  }, [data_top]);

  return (
    <div className="edit-order-top-left">
      {dataTop.map((item) => (
        <div className="details-container" key={item.id}>
          <div className="image-wrapper">
            <img
              src={`http://127.0.0.1:8000/images/menu/${item.image}`}
              alt={item.image}
              className="image"
            />
          </div>
          <div className="details-wrapper">
            <div className="menu-name-wrapper">
              <span className="indicator">Menu Name</span>
              <span className="value">{item.menuName}</span>
            </div>
            <div className="menu-price-wrapper">
              <span className="indicator">original Price</span>
              <span className="value">{`₱ ${item.price}.00`}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EditOrderTopLeft;
