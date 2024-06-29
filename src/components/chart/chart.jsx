import { useEffect, useState } from "react";
import "./chart.scss";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import axios from "axios";
import moment from "moment";

const Chart = ({ aspect }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const getChatDataAPI = async () => {
      try {
        const API = await axios.get(
          "http://127.0.0.1:8000/api/get-admin-home-chart-data"
        );
        let data = API.data.data;
        let processData = processChartData(data);
        setChartData(processData);
      } catch (error) {
        console.log(error);
      }
    };
    getChatDataAPI();
    const interval = setInterval(() => {
      getChatDataAPI();
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const processChartData = (data) => {
    const salesData = [];

    data.forEach((order) => {
      const date =
        order.created_at !== null
          ? moment(order.created_at).format("YYYY-MM-DD")
          : "Unknown";
      const month = order.created_at
        ? new Date(order.created_at).getMonth() + 1
        : null;

      if (order.isCancelled === 1) {
        addOrUpdateSaleEntry(
          salesData,
          date,
          month,
          "CanceledSales",
          order.totalAmmount
        );
      } else if (order.isPaid === 1 && order.isDelivered === 1) {
        addOrUpdateSaleEntry(
          salesData,
          date,
          month,
          "TotalSales",
          order.totalAmmount
        );
      } else if (order.isDelivered === 0 && order.isCancelled !== 1) {
        addOrUpdateSaleEntry(
          salesData,
          date,
          month,
          "PendingOrder",
          order.totalAmmount
        );
      }
    });

    // Sort by month (optional: you can sort by date instead if required)
    salesData.sort((a, b) => new Date(a.date) - new Date(b.date));

    return salesData;
  };

  const addOrUpdateSaleEntry = (salesData, date, month, category, amount) => {
    // Find or create an entry for the given date
    let entry = salesData.find((entry) => entry.date === date);
    if (!entry) {
      entry = { date, CanceledSales: 0, TotalSales: 0, PendingOrder: 0 };
      salesData.push(entry);
    }

    // Update the category value
    entry[category] += amount;
  };

  return (
    <div className="chart">
      <div className="title">Monthly Statistics</div>
      <ResponsiveContainer width="100%" aspect={aspect}>
        <AreaChart
          width={700}
          height={250}
          data={chartData}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="canceledSales" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="red" stopOpacity={0.8} />
              <stop offset="95%" stopColor="red" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="totalSales" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="green" stopOpacity={0.8} />
              <stop offset="95%" stopColor="green" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="pendingOrder" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="yellow" stopOpacity={0.8} />
              <stop offset="95%" stopColor="yellow" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="date" className="date" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="CanceledSales"
            stroke="Red"
            fillOpacity={1}
            fill="url(#canceledSales)"
          />
          <Area
            type="monotone"
            dataKey="TotalSales"
            stroke="Green"
            fillOpacity={1}
            fill="url(#totalSales)"
          />
          <Area
            type="monotone"
            dataKey="PendingOrder"
            stroke="goldenrod"
            fillOpacity={1}
            fill="url(#pendingOrder)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
