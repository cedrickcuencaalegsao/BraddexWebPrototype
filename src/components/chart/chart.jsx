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

const Chart = ({ aspect }) => {
  //get-admin-home-chart-data

  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const getChatDataAPI = async () => {
      try {
        const API = await axios.get();
        console.log(API.data);
      } catch (error) {
        console.log(error);
      }
    };
  }, []);

  const sales = [
    {
      month: "January-2024",
      CanceledSales: 350,
      TotalSales: 500,
      PendingOrder: 220,
    },
    {
      month: "Febuary-2024",
      CanceledSales: 10,
      TotalSales: 700,
      PendingOrder: 5,
    },
    {
      month: "March-2024",
      CanceledSales: 15,
      TotalSales: 940,
      PendingOrder: 3,
    },
    {
      month: "April-2024",
      CanceledSales: 3,
      TotalSales: 340,
      PendingOrder: 150,
    },
    {
      month: "June-2024",
      CanceledSales: 15,
      TotalSales: 150,
      PendingOrder: 0,
    },
    {
      month: "July-2024",
      CanceledSales: 10,
      TotalSales: 500,
      PendingOrder: 5,
    },
    {
      month: "August-2024",
      CanceledSales: 100,
      TotalSales: 700,
      PendingOrder: 50,
    },
  ];

  return (
    <div className="chart">
      <div className="title">Yearly Statistics</div>
      <ResponsiveContainer width="100%" aspect={aspect}>
        <AreaChart
          width={700}
          height={250}
          data={sales}
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
          <XAxis dataKey="month" className="month" />
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
