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
    try {
      const API = await axios.get(
        `http://127.0.0.1:8000/api/get-order-menu-data/${data}`
      );
      setMenuData(API.data.menu);
    } catch (error) {
      console.log(error.response);
    }
  };

  
  useEffect(() => {
    const validateMenuID = (data) => {
      if (data) {
        getMenuDataAPI(data);
      }
    };
    let menu_id;
    if (orderData.length !== 0 || orderData.length !== null) {
      orderData.map((item) => (menu_id = item.menuID));
    }
    validateMenuID(menu_id);
  }, [data, orderData]);

  const makeDataTop = () => {
    let data_top;
    menuData.map(
      (item) =>
        (data_top = [
          {
            menuID: item.menuID,
            menuName: item.menu_name,
            image: item.image,
            price: item.price,
          },
        ])
    );
    return data_top;
  };

  let dataTop = makeDataTop();

  return (
    <div className="edit-order-container">
      <SideBar />
      <div className="container">
        <NavBar />
        <div className="content-wrapper">
          <div className="left">
            <EditOrderTopLeft data={dataTop} />
            <EditOrderBottomLeft data={orderData}/>
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
