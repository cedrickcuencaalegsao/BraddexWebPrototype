import "./client_sidebar.scss";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import DeliveryDiningOutlinedIcon from '@mui/icons-material/DeliveryDiningOutlined';
import ListOutlinedIcon from '@mui/icons-material/ListOutlined';
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
import SupportAgentOutlinedIcon from '@mui/icons-material/SupportAgentOutlined';
import AnnouncementOutlinedIcon from '@mui/icons-material/AnnouncementOutlined';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import ShieldRoundedIcon from '@mui/icons-material/ShieldRounded';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
const ClientSideBar = () => {
    return (
        <div className="clientSideBar">
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
                            <HomeOutlinedIcon className="icon" />
                            <a href="/client-home">
                                <span>Home</span>
                            </a>
                        </div>
                    </li>
                    <li>
                        <div className="sidebarLink">
                            <MenuBookOutlinedIcon className="icon" />
                            <a href="/client-Menu">
                                <span>Menu</span>
                            </a>
                        </div>
                    </li>
                    <li>
                        <div className="sidebarLink">
                            <ShoppingCartOutlinedIcon className="icon" />
                            <a href="/client-cart">
                                <span>Cart</span>
                            </a>
                        </div>
                    </li>
                    <li>
                        <div className="sidebarLink">
                            <DeliveryDiningOutlinedIcon className="icon" />
                            <a href="/client-delivery">
                                <span>Delivery</span>
                            </a>
                        </div>
                    </li>
                    <li>
                        <div className="sidebarLink">
                            <ListOutlinedIcon className="icon" />
                            <a href="/client-history">
                                <span>History</span>
                            </a>
                        </div>
                    </li>
                    <p className="title">
                        SERVICES
                    </p>
                    <li>
                        <div className="sidebarLink">
                            <SupportAgentOutlinedIcon className="icon" />
                            <a href="/client-support">
                                <span>Support</span>
                            </a>
                        </div>
                    </li>
                    <li>
                        <div className="sidebarLink">
                            <AnnouncementOutlinedIcon className="icon" />
                            <a href="/client-announcement">
                                <span>Announcement</span>
                            </a>
                        </div>
                    </li>
                    <p className="title">
                        SETTINGS
                    </p>
                    <li>
                        <div className="sidebarLink">
                            <SettingsRoundedIcon className="icon" />
                            <a href="/client-settings">
                                <span>Settings</span>
                            </a>
                        </div>
                    </li>
                    <li>
                        <div className="sidebarLink">
                            <ShieldRoundedIcon className="icon" />
                            <a href="/client-privacy">
                                <span>Privacy</span>
                            </a>
                        </div>
                    </li>
                    <p className="title">
                        OTHERS
                    </p>
                    <li>
                        <div className="sidebarLink">
                            <InfoRoundedIcon className="icon" />
                            <a href="/client-privacy">
                                <span>About</span>
                            </a>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    )
}
export default ClientSideBar;