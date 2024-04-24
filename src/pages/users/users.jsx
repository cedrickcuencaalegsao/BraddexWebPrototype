import "./users.scss";
import SideBar from "../../components/sideBar/side_bar";
import NavBar from "../../components/navBar/nav_bar";
import DataTable from "../../components/datatable/data_table";
import { CircularProgressbar } from "react-circular-progressbar";


const users = () => {
    return(
        <div className="users">
            <SideBar/>
            <div className="usersContainer">
                <NavBar/>
                <div className="top">
                    <div className="left">
                        <h1 className="title">Online Users</h1>
                        <div className="featuredChart">
                            <CircularProgressbar value={63} text="63%" strokeWidth={10}/>
                        </div>
                    </div>
                    <div className="right">
                        <h1 className="title">Offline Users</h1>
                        <div className="featuredChart">
                            <CircularProgressbar value={36} text="36%" strokeWidth={10}/>
                        </div>
                    </div>
                </div>
                <div className="table">
                    <DataTable/>
                </div>
            </div>
        </div>  
    )
}
export default users