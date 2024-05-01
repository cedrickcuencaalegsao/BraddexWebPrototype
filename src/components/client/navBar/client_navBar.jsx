import "./client_navBar.scss";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import ListOutlinedIcon from '@mui/icons-material/ListOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const ClientNavBar = () => {
    const history = useHistory();
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('id');
        localStorage.removeItem('isAdmin');
        //setUserData({});
        history.push("/");
    }
    return (
        <div className="clientNavbar">
            <div className="clientNabarContainer">
                <div className="search">
                    <input type="text" placeholder="Search..." />
                    <SearchOutlinedIcon />
                </div>
                <div className="clientItems">
                    <div className="item">
                        <NotificationsNoneOutlinedIcon className="icons" />
                        <div className="counter">5</div>
                    </div>
                    <div className="item">
                        <ChatBubbleOutlineOutlinedIcon className="icons" />
                        <div className="counter">2</div>
                    </div>
                    <div className="item" onClick={handleLogout}>
                        <LogoutOutlinedIcon />
                    </div>
                    <div className="item">
                        <img src="#" alt="image" className="avatar" />
                    </div>
                </div>

            </div>
        </div>
    )
}

export default ClientNavBar;