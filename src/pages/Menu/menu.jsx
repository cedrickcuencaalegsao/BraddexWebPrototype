import "./menu.scss";
import ClientNavBar from "../../components/client/navBar/client_navBar";
import ClientSideBar from "../../components/client/sideBar/client_sidebar";
import { useState, useEffect } from "react";
import axios from "axios";

const ClientMenu = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const MenuAPI = async () => {
      try {
        const API = await axios.get("http://127.0.0.1:8000/api/menu");
        setData(API.data.data);
        console.log(API.data.data);
      } catch (error) {
        alert(error);
      }
    };
    MenuAPI();
    const interval = setInterval(() => {
      MenuAPI();
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="menu">
      <ClientSideBar />
      <div className="menuContianer">
        <ClientNavBar />
        <h1>Menu</h1>
        {data.map((item) => (
          <p key={item.id}>{item.id}</p>
        ))}
      </div>
    </div>
  );
};

export default ClientMenu;
