import "./inventory.scss";
import SideBar from "../../components/sideBar/side_bar";
import { useEffect, useState } from "react";
import axios from "axios";
//components import here.
import AddItems from "../../components/InventoryComponents/AddItems/Additem";

const Inventory = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getInventoryData = async () => {
      try {
        const API = await axios.get(
          "http://127.0.0.1:8000/api/get-inventory-data"
        );
        setData(API.data.data);
      } catch (error) {
        console.log(error.response);
      }
    };
    getInventoryData();
    const interval = setInterval(() => {
      getInventoryData();
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  console.log(data);

  return (
    <div className="inventory-container">
      <SideBar />
      <div className="content">
        <div className="top">
          <div className="title-wrapper">
            <div className="left">
              <span className="title">Grahps here</span>
            </div>
            <div className="right">
              <AddItems />
            </div>
          </div>
        </div>
        <div className="bottom">list here</div>
      </div>
    </div>
  );
};
export default Inventory;
