import "./nav_bar.scss";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import FullscreenExitOutlinedIcon from '@mui/icons-material/FullscreenExitOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import ListOutlinedIcon from '@mui/icons-material/ListOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import React, { useState, useContext } from "react";
import { AppContext } from "../../App";

const NavBar = () => {
    const {userData, setUserData} = useContext(AppContext);
    const history = useHistory();

    const handleLogout = ()=>{
        localStorage.removeItem('token');
        localStorage.removeItem('id');
        localStorage.removeItem('isAdmin');
        setUserData({});
        history.push("/");
    }
    return (
        <div className="navbar">
            <div className="wrapper">
                <div className="search">
                    <input type="text" placeholder="Search..." />
                    <SearchOutlinedIcon />
                </div>
                <div className="items">
                    <div className="item">
                        <LanguageOutlinedIcon className="icons" />
                        English
                    </div>
                    <div className="item">
                        <DarkModeOutlinedIcon className="icons" />
                    </div>
                    <div className="item">
                        <FullscreenExitOutlinedIcon className="icons" />
                    </div>
                    <div className="item">
                        <NotificationsNoneOutlinedIcon className="icons" />
                        <div className="counter">5</div>
                    </div>
                    <div className="item">
                        <ChatBubbleOutlineOutlinedIcon className="icons" />
                        <div className="counter">2</div>
                    </div>
                    <div className="item">
                        <ListOutlinedIcon className="icons" />
                    </div>
                    <div className="item">
                        <img src="#" alt="image" className="avatar" />
                    </div>
                    <div className="item" onClick={handleLogout}>
                        <LogoutOutlinedIcon />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NavBar
