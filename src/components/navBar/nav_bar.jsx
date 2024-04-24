import "./nav_bar.scss";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import FullscreenExitOutlinedIcon from '@mui/icons-material/FullscreenExitOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import ListOutlinedIcon from '@mui/icons-material/ListOutlined';


const NavBar = () => {
    return(
        <div className="navbar">
            <div className="wrapper">
                <div className="search">
                    <input type="text" placeholder="Search..."/>
                    <SearchOutlinedIcon />
                </div>
                <div className="items">
                    <div className="item">
                        <LanguageOutlinedIcon className="icons"/>
                        English
                    </div>
                    <div className="item">
                        <DarkModeOutlinedIcon className="icons"/>
                    </div>
                    <div className="item">
                        <FullscreenExitOutlinedIcon className="icons"/>
                    </div>
                    <div className="item">
                        <NotificationsNoneOutlinedIcon className="icons"/>
                        <div className="counter">5</div>
                    </div>
                    <div className="item">
                        <ChatBubbleOutlineOutlinedIcon className="icons"/>
                        <div className="counter">2</div>
                    </div>
                    <div className="item">
                        <ListOutlinedIcon className="icons"/>
                    </div>
                    <div className="item">
                        <img src={require("../../Ocean-Blue-Color-Palette-with-Hex-Codes.webp")} alt="image" className="avatar" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NavBar
