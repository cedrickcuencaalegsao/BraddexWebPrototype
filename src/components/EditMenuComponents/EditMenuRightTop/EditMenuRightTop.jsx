import { useEffect, useState } from "react";
import "./EditMenuRightTop.scss";

const EditMenuRightTop = (data) => {
  let receive_data = data.data;
  const [menuData, setMenuData] = useState([]);

  useEffect(() => {
    setMenuData(receive_data);
  }, [receive_data]);

  console.log(menuData);
  return (
    <div className="edit-menu-right-top">
      <div className="title-wrapper">
        <span className="title">Menu Information</span>
      </div>
      {menuData.map((item) => (
        <div className="menu-data-container" key={item.id}>
          <div className="left">
            <div className="item">
              <span className="indicator">Menu Name</span>
              <input type="text" className="value" value={item.menu_name} />
            </div>
            <div className="item">
              <span className="indicator">Menu ID</span>
              <input
                type="text"
                className="value"
                value={item.menuID}
                disabled={true}
              />
            </div>
            <div className="item">
              <span className="indicator">Menu Price</span>
              <input
                type="text"
                className="value"
                value={`₱ ${item.price}.00`}
              />
            </div>
          </div>
          <div className="right">right item</div>
        </div>
      ))}
    </div>
  );
};
export default EditMenuRightTop;
