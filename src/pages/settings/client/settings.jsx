import "./settings.scss";
import ClientNavBar from "../../../components/client/navBar/client_navBar";
import ClientSideBar from "../../../components/client/sideBar/client_sidebar";
import { useEffect, useState } from "react";
import axios from "axios";
import ClientSettingTopLeft from "../../../components/ClientSettings/TopLeft/TopLeft";
import ClientSettingBottomLeft from "../../../components/ClientSettings/BottomLeft/BottomLeft";
import ClientSettingTopRight from "../../../components/ClientSettings/RightTop/RightTop";

const ClientSettings = () => {
  let uuid = localStorage.getItem("uuid");
  const [userData, setUserData] = useState([]);
  const [countCart, setCountCart] = useState(0);
  const [userCart, setUserCart] = useState(0);
  const [countOrder, setCountOrder] = useState(0);
  const [userOrder, setUserOrder] = useState(0);

  useEffect(() => {
    const getUserDataAPI = async () => {
      try {
        const API = await axios.get(
          `http://127.0.0.1:8000/api/getDataClientSettings/${uuid}`
        );
        setUserData(API.data.userData);
        setCountCart(API.data.countCart);
        setUserCart(API.data.userCart);
        setCountOrder(API.data.countCart);
        setUserOrder(API.data.userOrder);
      } catch (error) {
        console.log(error.response);
      }
    };
    getUserDataAPI();
  }, [uuid]);

  const bottomLeftData = () => {
    let calc_userCart = (userCart / countCart) * 100;
    let calc_userOrder = (userOrder / countOrder) * 100;
    let data = {
      userCart: calc_userCart.toFixed(2),
      userOrder: calc_userOrder.toFixed(2),
    };
    return data;
  };

  return (
    <div className="settings">
      <ClientSideBar />
      <div className="settingsContainer">
        <ClientNavBar />
        <div className="content">
          <div className="top">
            <div className="title-wrapper">
              <h1 className="title">Account Settings</h1>
            </div>
          </div>
          <div className="bottom">
            <div className="left">
              <ClientSettingTopLeft data={userData} />
              <ClientSettingBottomLeft data={bottomLeftData()} />
            </div>
            <div className="right">
              <ClientSettingTopRight data={userData}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ClientSettings;
