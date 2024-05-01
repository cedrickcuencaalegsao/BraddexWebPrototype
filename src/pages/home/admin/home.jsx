import "./home.scss";
import SideBar from "../../../components/sideBar/side_bar";
import NavBar from "../../../components/navBar/nav_bar";
import Widgets from "../../../components/widgets/widget";
import Featured from "../../../components/featured/featured";
import Chart from "../../../components/chart/chart";
import Table from "../../../components/table/table";

const Home = () => {

    return (
        <div className="home">
            <SideBar />
            <div className="homecontainer">
                <NavBar />
                <div className="widgets">
                    <Widgets type="user" />
                    <Widgets type="order" />
                    <Widgets type="earnings" />
                    <Widgets type="balance" />
                </div>
                <div className="charts">
                    <Featured />
                    <Chart aspect={2 / 1} />
                </div>
                <div className="listContainer">
                    <div className="listTitle">
                        Latest Transactions
                    </div>
                    <div className="table">
                        <Table />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home