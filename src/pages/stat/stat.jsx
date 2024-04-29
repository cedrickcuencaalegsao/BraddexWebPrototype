import "./stat.scss";
import SideBar from "../../components/sideBar/side_bar";
import NavBar from "../../components/navBar/nav_bar";

import React, { useState, useEffect } from 'react';
import axios from 'axios';


const StatList = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get('http://127.0.0.1:8000/api/users');
            setData(response.data);
            console.log(response.data);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData();
      }, []);
    return (
        <div className="statList">
            <SideBar />
            <div className="statContainer">
                <NavBar />
                <div>
                    <h1>Data from Laravel API:</h1>
                    <ul>
                        {data.map((item) => (
                            <li key={item.id}>{item.f_name}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default StatList;
