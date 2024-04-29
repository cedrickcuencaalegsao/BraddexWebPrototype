import "./users.scss";
import SideBar from "../../components/sideBar/side_bar";
import NavBar from "../../components/navBar/nav_bar";
import DataTable from "../../components/datatable/data_table";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import 'react-circular-progressbar/dist/styles.css';
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from "recharts";


const Users = () => {
    const online_percentage = 63
    const offline_percentage = 37

    const data = [
        {
            "month": "January",
            "Online": 75,
            "Offline": 25,
        },
        {
            "month": "Febuary",
            "Online": 50,
            "Offline": 50,
        },
        {
            "month": "March",
            "Online": 500,
            "Offline": 150,
        },
      ]
      

    return(
        <div className="users">
            <SideBar/>
            <div className="usersContainer">
                <NavBar/>
                <div className="top">
                    <div className="left">
                        <h1 className="title">Online Users</h1>
                        <div className="featuredChart">
                            <CircularProgressbar
                                value={online_percentage} 
                                text={`${online_percentage}%`} 
                                strokeWidth={10}
                                styles={buildStyles({
                                    rotation:1,
                                    strokeLinecap: 'butt',
                                    textSize: '20px',
                                    textColor: '#008000',
                                    pathTransitionDuration: 0.5,
                                    pathColor: `rgb(0, 128, 0)`,
                                    trailColor: '#d6d6d6',
                                    backgroundColor: '#3e98c7',
                                })}
                            />
                           
                        </div>
                        <div className="link"><a href="#">View details</a></div>
                    </div>  
                    <div className="center">
                        <h1 className="title">Offline Users</h1>
                        <div className="featuredChart">
                            <CircularProgressbar
                                value={offline_percentage} 
                                text={`${offline_percentage}%`} 
                                strokeWidth={10}
                                styles={buildStyles({
                                    rotation:1,
                                    strokeLinecap: 'butt',
                                    textSize: '20px',
                                    textColor: '#FF0000',
                                    pathTransitionDuration: 0.5,
                                    pathColor: `#FF0000`,
                                    backgroundColor: '#3e98c7',
                                })}
                            />
                        </div>
                        <div className="link"><a href="#">View details</a></div>
                    </div>
                    <div className="right">
                        <h1 className="title">Monthly User</h1>
                        <BarChart width={730} height={205} data={data}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="Online" fill="#008000" />
                            <Bar dataKey="Offline" fill="#FF0000" />
                        </BarChart>
                    </div>
                </div>
                <div className="table">
                    <DataTable/>
                </div>
            </div>
        </div>  
    )
}
export default Users