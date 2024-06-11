import { useEffect, useState } from "react";
import "./EditMenuRightTop.scss";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import moment from "moment";
import Switch from "@mui/material/Switch";
import axios from "axios";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
const EditMenuRightTop = (data) => {
  let receive_data = data.data;
  const [menuData, setMenuData] = useState([]);
  const history = useHistory();

  useEffect(() => {
    setMenuData(receive_data);
  }, [receive_data]);

  const formattedDate = (data) => {
    let date;
    if (data !== null) {
      date = moment(data).format("YYYY-MM-DD");
      return date;
    }
    return "No Date";
  };

  const onSwitch = () => {
    const updateMenu = menuData.map((item) => ({
      ...item,
      bestselling: item.bestselling === 1 ? 0 : 1,
    }));
    setMenuData(updateMenu);
  };

  const editValue = (e) => {
    const updateMenu = menuData.map((item) => ({
      ...item,
      [e.target.name]: e.target.value,
    }));
    setMenuData(updateMenu);
  };

  const updateMenuAPI = async (data) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/update-menu/",
        data
      );
      return response.data;
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const saveData = async () => {
    let data;
    menuData.map(
      (item) =>
        (data = {
          menuID: item.menuID,
          menu_name: item.menu_name,
          price: item.price,
          bestselling: item.bestselling,
        })
    );

    const status = await updateMenuAPI(data);
    status && history.push("/products");
  };

  return (
    <div className="edit-menu-right-top">
      <div className="title-wrapper">
        <span className="title">Menu Information</span>
        <div className="btn-save-wrapper">
          <SaveOutlinedIcon className="btn-save" onClick={() => saveData()} />
        </div>
      </div>
      {menuData.map((item) => (
        <div className="menu-data-container" key={item.id}>
          <div className="left">
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
              <span className="indicator">Menu Name</span>
              <input
                type="text"
                className="value"
                name="menu_name"
                value={item.menu_name}
                onChange={editValue}
              />
            </div>
            <div className="item">
              <span className="indicator">Menu Price</span>
              <input
                type="number"
                className="value"
                name="price"
                value={item.price}
                onChange={editValue}
              />
            </div>
          </div>
          <div className="right">
            <div className="item">
              <span className="indicator">Date Added</span>
              <input
                type="text"
                className="value"
                value={formattedDate(item.created_at)}
                disabled={true}
              />
            </div>
            <div className="item">
              <span className="indicator">Date Update</span>
              <input
                type="text"
                className="value"
                value={formattedDate(item.updated_at)}
                disabled={true}
              />
            </div>
            <div className="item">
              <span className="indicator">Mark As Best Selling</span>
              <Switch
                className="switch"
                checked={item.bestselling === 1}
                onChange={onSwitch}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default EditMenuRightTop;
