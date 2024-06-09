import React, { useEffect, useState } from "react";
import "./EditMenuLeftTop.scss";

const EditMenuLeftTop = (data) => {
  let dataReceive = data.data;
  const [menuData, setMenuData] = useState([]);

  useEffect(() => {
    if (dataReceive !== 0) {
      setMenuData(dataReceive);
    }
  }, [dataReceive]);

  console.log(menuData);

  return (
    <div className="edit-menu-left-top">
      {menuData.map((item) => (
        <div className="menu-details-wrapper" key={item.id}>
          <div className="details-top">
            <span className="title">Menu Image</span>
          </div>
          <div className="image-wrapper">
            <img
              src={`http://127.0.0.1:8000/images/menu/${item.image}`}
              alt={item.image}
              className="image"
            />
          </div>
          <div className="details-bottom">
            <div className="menu-name-wrapper">
              <span className="value">{item.menuName}</span>
              <span className="indicator">Menu Name</span>
            </div>
            <div className="price-wrapper">
              <span className="value">{`₱ ${item.price}.00`}</span>
              <span className="indicator">Price</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default EditMenuLeftTop;
