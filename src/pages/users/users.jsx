import "./users.scss";
import SideBar from "../../components/sideBar/side_bar";
import NavBar from "../../components/navBar/nav_bar";
import OnlineUser from "../../components/online_User/online_User";
import OfflineUser from "../../components/offline_User/offline_User";
import DataTable from "../../components/datatable/data_table";
import "react-circular-progressbar/dist/styles.css";
import MonthlyUser from "../../components/monthly_User/monthly_user";
import { useState, useEffect } from "react";
import axios from "axios";

const Users = () => {
  const [data, setData] = useState([]);
  const [online, setOnline] = useState(0);
  const [offline, setOffline] = useState(0);
  const [userCount, setUserCount] = useState(0);
  let online_data = { count: userCount, onln: online };
  let offline_data = { count: userCount, ofln: offline };

  const isOnline = async () => {
    try {
      const API = await axios.get(
        "http://127.0.0.1:8000/api/get-admin-users-widgets"
      );
      setOnline(API.data.online);
      setOffline(API.data.offline);
      setUserCount(API.data.users);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getAllUsersData = async () => {
      try {
        const API = await axios.get("http://127.0.0.1:8000/api/users");
        setData(API.data);
      } catch (error) {
        console.log(error);
      }
    };
    getAllUsersData();
    const interval = setInterval(() => {
      getAllUsersData();
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (data.length !== 0) {
      isOnline();
    }
  }, [data]);

  return (
    <div className="users">
      <SideBar />
      <div className="usersContainer">
        <NavBar />
        <div className="top">
          <div className="left">
            <OnlineUser data={online_data} />
          </div>
          <div className="center">
            <OfflineUser data={offline_data} />
          </div>
          <div className="right">
            <MonthlyUser data={data} />
          </div>
        </div>
        <div className="table">
          <DataTable />
        </div>
      </div>
    </div>
  );
};
export default Users;
