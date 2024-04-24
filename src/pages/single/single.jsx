import "./single.scss";
import SideBar from "../../components/sideBar/side_bar";
import NavBar from "../../components/navBar/nav_bar";
import Chart from "../../components/chart/chart";
import Table from "../../components/table/table"

const Single = () => {
    return(
        <div className="single">
            <SideBar/>
            <div className="singleContainer">
                <NavBar/>
                <div className="top">
                    <div className="left">
                        <div className="editButton">
                            Edit
                        </div>
                        <h1 className="title">Information</h1>
                        <div className="item">
                            <img src="#" alt="image" className="itemImage"/>
                            <div className="details">
                                <h1 className="itemTitle">
                                    Jane Doe
                                </h1>
                                <div className="detailItem">
                                    <span className="itemKey">Email: </span>
                                    <span className="itemValue">janedoe@gmail.com</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Phone: </span>
                                    <span className="itemValue">+63 994 831 0605</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Addres: </span>
                                    <span className="itemValue">Somewhere In the universe</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Country: </span>
                                    <span className="itemValue">milky way</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="rigth">
                        <div className="title">Chart</div>
                        <Chart aspect={3/1}/>
                    </div>
                </div>
                <div className="bottom">
                </div>
            </div>
        </div>
    )
}

export default Single
