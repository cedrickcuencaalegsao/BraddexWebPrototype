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
import moment from "moment";

const Users = () => {
  const [data, setData] = useState([]);
  const [online, setOnline] = useState(0);
  const [offline, setOffline] = useState(0);
  const [userCount, setUserCount] = useState(0);

  let online_data = { count: userCount, onln: online };
  let offline_data = { count: userCount, ofln: offline };

  let monthly_users = [];

  let dataTable = [];

  const formattedDate = (filteredUsers) => {
    if (!filteredUsers || filteredUsers.length === 0) {
      return "No Date";
    }

    let date = "No Date";

    filteredUsers.forEach((item) => {
      if (item.created_at) {
        date = moment(item.created_at).format("YYYY-MM-DD");
      }
    });

    return date;
  };

  const createRow = (users) => {
    users.forEach((item) => {
      let data = {
        id: item.id,
        userID: item.userID,
        firstName: item.f_name,
        lastName: item.l_name,
        email: item.email,
        phone: item.phone_no !== null ? item.phone_no : "No Phone number.",
        birthday: item.birthday,
        address: item.address !== null ? item.address : "No Address.",
        age: 35,
        status: item.isOnline === 1 ? "Online" : "Offline",
        isAdmin: item.isAdmin,
      };
      dataTable.push(data);
    });
  };

  if (data.length !== 0) {
    let users = data.users;
    let filteredUsers = users.filter((item) => item.isActive === 1);
    let totalUsers = users.length;
    let ActiveUsers = filteredUsers.length;
    let InActiveUser = totalUsers - ActiveUsers;
    let date = formattedDate(filteredUsers);
    // let
    let dataToPush = {
      month: date,
      Active: ActiveUsers,
      Inactive: InActiveUser,
    };
    createRow(users);
    monthly_users.push(dataToPush);
  }

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
            <MonthlyUser data={monthly_users} />
          </div>
        </div>
        <div className="table">
          <DataTable data={dataTable} />
        </div>
      </div>
    </div>
  );
};
export default Users;
