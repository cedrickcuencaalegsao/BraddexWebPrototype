import "./home.scss";
import SideBar from "../../../components/sideBar/side_bar";
import Widgets from "../../../components/widgets/widget";
import Featured from "../../../components/featured/featured";
import Chart from "../../../components/chart/chart";

const Home = () => {
  return (
    <div className="home">
      <SideBar className="side-bar" />
      <div className="homecontainer">
        <div className="content">
          <div className="widgets">
            <Widgets type="user" />
            <Widgets type="menu" />
            <Widgets type="cart" />
            <Widgets type="order" />
            <Widgets type="delivery" />
          </div>
          <div className="charts">
            <Featured />
            <Chart aspect={2 / 1} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
