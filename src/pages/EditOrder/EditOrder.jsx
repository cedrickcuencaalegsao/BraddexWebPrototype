import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import SideBar from "../../components/sideBar/side_bar";
import NavBar from "../../components/navBar/nav_bar";
import "./EditOrder.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import EditOrderTopLeft from "../../components/EditOrderComponents/TopLeft/TopLeft";
import EditOrderBottomLeft from "../../components/EditOrderComponents/BottomLeft/BottomLeft";

const EditOrder = () => {
  const data = useParams();
  const [orderData, setOrderData] = useState([]);
  const [menuData, setMenuData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const orderID = data.orderID;
    const getOrderDataAPI = async () => {
      try {
        const API = await axios.get(
          `http://127.0.0.1:8000/api/edit-order-API/${orderID}`
        );
        setOrderData(API.data.order);
      } catch (error) {
        console.log(error);
      }
    };
    getOrderDataAPI();
  }, [data]);

  const getMenuDataAPI = async (data) => {
    console.log(data);
    try {
      const API = await axios.get(
        `http://127.0.0.1:8000/api/get-order-menu-data/${data}`
      );
      setMenuData(API.data.menu);
    } catch (error) {
      console.log(error.response);
    }
  };

  const validateMenuID = (data) => {
    if (data) {
      getMenuDataAPI(data);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let menu_id;
    if (orderData.length !== 0 || orderData.length !== null) {
      orderData.map((item) => (menu_id = item.menuID));
    }
    validateMenuID(menu_id);
  }, [data, orderData]);

  console.log(orderData, menuData);

  return (
    <div className="edit-order-container">
      <SideBar />
      <div className="container">
        <NavBar />
        <div className="content-wrapper">
          <div className="left">
            <EditOrderTopLeft />
            <EditOrderBottomLeft />
          </div>
          <div className="right">
            <div className="title-wrapper">
              <span className="title">Right</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default EditOrder;
