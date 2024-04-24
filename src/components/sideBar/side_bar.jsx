import "./side_bar.scss";
import { Dashboard } from "@mui/icons-material";
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import QueryStatsOutlinedIcon from '@mui/icons-material/QueryStatsOutlined';
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';
import SettingsSystemDaydreamOutlinedIcon from '@mui/icons-material/SettingsSystemDaydreamOutlined';
import PsychologyOutlinedIcon from '@mui/icons-material/PsychologyOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

import { Link } from "react-router-dom/cjs/react-router-dom.min";

const SideBar = () => {

    return(
        <div className="sidebar">
            <div className="top">
                <span className="logo">
                    Braddex-logo
                </span>
            </div>
            <hr />
            <div className="center">
                <ul>
                    <p className="title">
                        MAIN
                    </p>
                    <li>
                        <div className="sidebarLink">
                                <Dashboard className="icon"/>
                            <a href="/">
                                <span>DashBoard</span>
                            </a>
                        </div>
                    </li>
                    <p className="title">
                        LIST
                    </p>
                    <li>
                        <div className="sidebarLink">
                                <Person2OutlinedIcon className="icon"/>
                            <a href="/users">
                                <span>User</span>
                            </a>
                        </div>
                    </li>
                    <li>
                        <div className="sidebarLink">
                                <Inventory2OutlinedIcon className="icon"/>
                            <a href="/products">
                                <span>Products</span>
                            </a>
                        </div>
                    </li>
                    <li>
                        <div className="sidebarLink">
                                <CreditCardOutlinedIcon className="icon"/>
                            <a href="/orders">
                                <span>Orders</span>
                            </a>
                        </div>
                    </li>
                    <li>
                        <div className="sidebarLink">
                                <LocalShippingOutlinedIcon className="icon"/>
                            <a href="/delivery">
                                <span>Delivery</span>
                            </a>
                        </div>
                    </li>
                    <p className="title">
                        USEFUL
                    </p>
                    <li>
                        <div className="sidebarLink">
                            <QueryStatsOutlinedIcon className="icon"/>
                            <a href="/stat">
                                <span>Stats</span>
                            </a>
                        </div>
                    </li>
                    <li>
                        <div className="sidebarLink">
                            <NotificationsActiveOutlinedIcon className="icon"/>
                            <span>Notification</span>
                        </div>
                    </li>
                    <p className="title">
                        SERVICE
                    </p>
                    <li>
                        <div className="sidebarLink">
                            <SettingsSystemDaydreamOutlinedIcon className="icon"/>
                            <span>System Health</span>
                        </div>
                    </li>
                    <li>
                        <div className="sidebarLink">
                            <PsychologyOutlinedIcon className="icon"/>
                            <span>Logs</span>
                        </div>
                    </li>
                    <li>
                        <div className="sidebarLink">
                            <SettingsOutlinedIcon className="icon"/>
                            <span>Settings</span>
                        </div>
                    </li>
                    <p className="title">
                        USER    
                    </p>
                    <li>
                        <div className="sidebarLink">
                            <AccountCircleOutlinedIcon className="icon"/>
                            <span>Profile</span>
                        </div>
                    </li>
                    <li>
                        <div className="sidebarLink">
                            <LogoutOutlinedIcon className="icon"/>
                            <span>Logout</span>
                        </div>
                    </li>
                </ul>
            </div>
            <div className="bottom">
                <div className="colorOption"></div>
                <div className="colorOption"></div>
                {/* <div className="colorOption"></div> */}
            </div>
        </div>
    )
}

export default SideBar
