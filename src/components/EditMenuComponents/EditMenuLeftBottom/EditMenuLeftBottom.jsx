import React, { useEffect, useState } from "react";
import "./EditMenuLeftBottom.scss";
import Switch from "@mui/material/Switch";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";

const EditMenuLeftBottom = (data) => {
  const [menuData, setMenuData] = useState([]);
  const history = useHistory();

  useEffect(() => {
    if (data !== 0) {
      setMenuData(data.data);
    }
  }, [data]);

  const onSwitch = async (e) => {
    const updatedMenuData = menuData.map((item) => ({
      ...item,
      isAvailable: e.target.name,
    }));
    setMenuData(updatedMenuData);
  };

  const saveData = async () => {
    let menuID = menuData[0].menuID;
    let data = {
      menuID: menuID,
      isAvailable: menuData[0].isAvailable,
    };
    try {
      const resp = await axios.post(
        "http://127.0.0.1:8000/api/change-menu-status/",
        data
      );
      console.log(resp.data);
      history.push("/products");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="edit-menu-left-bottom">
      <div className="top-container">
        <div className="title-wrapper">
          <span className="title">Change Menu Status</span>
        </div>
        <div className="btn-save-wrapper">
          <SaveOutlinedIcon className="btn-save" onClick={() => saveData()} />
        </div>
      </div>
      <div className="details">
        <div className="items">
          <Switch
            className="icon"
            name="Available"
            checked={
              menuData.length > 0 && menuData[0]?.isAvailable === "Available"
            }
            onChange={onSwitch}
          />
          <span className="indicator Available">Available</span>
        </div>
        <div className="items">
          <Switch
            className="icon"
            name="Limited"
            checked={
              menuData.length > 0 && menuData[0]?.isAvailable === "Limited"
            }
            onChange={onSwitch}
          />
          <span className="indicator Limited">Limited</span>
        </div>
        <div className="items">
          <Switch
            className="icon"
            name="NotAvailable"
            checked={
              menuData.length > 0 && menuData[0]?.isAvailable === "NotAvailable"
            }
            onChange={onSwitch}
          />
          <span className="indicator Not-Available">Not Available</span>
        </div>
      </div>
    </div>
  );
};

export default EditMenuLeftBottom;
