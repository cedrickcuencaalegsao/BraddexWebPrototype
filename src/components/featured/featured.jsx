import "./featured.scss";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import KeyboardArrowUpOutlined from "@mui/icons-material/KeyboardArrowUpOutlined";
import { useEffect, useState } from "react";
import axios from "axios";

const Featured = () => {
  const [orderData, setOrderData] = useState([]);
  const [todaySales, setTodaySales] = useState(0);
  const [todaySalesPercentage, setTodaySalesPercentage] = useState(0);

  useEffect(() => {
    const getOrderDataAPI = async () => {
      try {
        const API = await axios.get(
          "http://127.0.0.1:8000/api/get-admin-home-chart-data"
        );
        setOrderData(API.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getOrderDataAPI();
    const interval = setInterval(() => {
      getOrderDataAPI();
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (orderData) {
      // Get today's date in UTC format
      const today = new Date().toISOString().split("T")[0];

      // calculation of the todays percentage.
      const todayOrders = orderData.filter(
        (item) => item.created_at && item.created_at.split("T")[0] === today
      );
      const totalTodayOrders = todayOrders.length;
      const paidTodayOrders = todayOrders.filter((item) => item.isPaid === 1);
      const totalPaidTodayOrders = paidTodayOrders.length;
      const paidPercentage =
        totalTodayOrders > 0
          ? (totalPaidTodayOrders / totalTodayOrders) * 100
          : 0;
      setTodaySalesPercentage(paidPercentage);

      // calculation of today's total sales
      const sumTotalAmmountToday = orderData
        .filter(
          (item) => item.created_at && item.created_at.split("T")[0] === today
        )
        .reduce((acc, item) => acc + item.totalAmmount, 0);
      setTodaySales(sumTotalAmmountToday);
    }
  }, [orderData]);

  // console.log(todaysTransaction);

  return (
    <div className="featured">
      <div className="top">
        <h1 className="title">Todays Sales</h1>
      </div>
      <div className="bottom">
        <div className="featuredChart">
          <CircularProgressbar
            value={todaySalesPercentage}
            text={`${todaySalesPercentage}%`}
            strokeWidth={10}
            styles={buildStyles({
              rotation: 1,
              strokeLinecap: "round",
              textSize: "20px",
              textColor: "#008000",
              pathTransitionDuration: 0.5,
              pathColor: `rgb(0, 128, 0)`,
              trailColor: "#d6d6d6",
              backgroundColor: "#3e98c7",
            })}
          />
        </div>
        <p className="title">Total sales made today</p>
        <p className="ammount">{`₱ ${todaySales}`}</p>
        <p className="desc">
          Previous transaction processing. Last Payments may not be included.
        </p>
        <div className="summary">
          <div className="items">
            <div className="item_title">Avarage</div>
            <div className="item_result positive">
              <KeyboardArrowUpOutlined fontSize="small" />
              <div className="resultAmount ">₱12.4k</div>
            </div>
          </div>
          <div className="items">
            <div className="item_title">Last Week</div>
            <div className="item_result positive">
              <KeyboardArrowUpOutlined fontSize="small" />
              <div className="resultAmount">₱12.4k</div>
            </div>
          </div>
          <div className="items">
            <div className="item_title">Last Month</div>
            <div className="item_result positive">
              <KeyboardArrowUpOutlined fontSize="small" />
              <div className="resultAmount">₱12.4k</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;
