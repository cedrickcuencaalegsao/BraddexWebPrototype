import "./graphData.scss";
import { useEffect, useState, useMemo } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { BarChart, Legend, Bar } from "recharts";

const GraphDataUsers = (args) => {
  const rData = useMemo(() => args?.data?.users || [], [args?.data?.users]);
  console.log(rData);
  const [chartData, setChartData] = useState([]);
  const [onlineData, setOnlineData] = useState([]);

  const formatMonth = (dateString) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
      2,
      "0"
    )}-01`;
  };

  useEffect(() => {
    if (rData.length > 0) {
      const validUsers = rData.filter((user) => user.created_at !== null);

      const groupedData = validUsers.reduce((acc, user) => {
        const month = formatMonth(user.created_at);
        if (!acc[month]) {
          acc[month] = { active: 0, inactive: 0, total: 0 };
        }
        acc[month].active += user.isActive ? 1 : 0;
        acc[month].inactive += user.isActive ? 0 : 1;
        acc[month].total += 1;
        return acc;
      }, {});

      const resultData = Object.keys(groupedData).map((month) => {
        const data = groupedData[month];
        return {
          month: month,
          active: ((data.active / data.total) * 100).toFixed(2),
          inactive: ((data.inactive / data.total) * 100).toFixed(2),
        };
      });
      setChartData(resultData);

      const calculatePercentages = (users) => {
        const totalUsers = users.length;
        const onlineUsers = users.filter((user) => user.isOnline).length;
        const offlineUsers = totalUsers - onlineUsers;

        const onlinePercentage = (onlineUsers / totalUsers) * 100;
        const offlinePercentage = (offlineUsers / totalUsers) * 100;

        return { onlinePercentage, offlinePercentage };
      };

      const { onlinePercentage, offlinePercentage } =
        calculatePercentages(rData);

      setOnlineData([
        {
          name: "Percentage",
          Online: onlinePercentage.toFixed(2),
          Offline: offlinePercentage.toFixed(2),
        },
      ]);
    }
  }, [rData]);
  console.log(onlineData);
  return (
    <div className="graph-data-users">
      <div className="content">
        <div className="active-and-inactive-wrapper">
          <div className="legend-wrapper">
            <div className="title-wrapper">
              <span className="title">Active and Inactive Account</span>
            </div>
            <div className="green-legend">
              <div className="green"></div>
              <span className="indicator">Online In percent</span>
            </div>
            <div className="red-legend">
              <div className="red"></div>
              <span className="indicator">Offline In Percent</span>
            </div>
          </div>
          <div className="chart-wrapper">
            <AreaChart
              width={550}
              height={205}
              data={chartData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="active" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="red" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="red" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="inactive" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="green" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="green" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="month" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="active"
                stroke="red"
                fillOpacity={1}
                fill="url(#active)"
              />
              <Area
                type="monotone"
                dataKey="inactive"
                stroke="green"
                fillOpacity={1}
                fill="url(#inactive)"
              />
            </AreaChart>
          </div>
        </div>
        <div className="online-and-offline-wrapper">
          <div className="title-wrapper">
            <h1 className="title">Online User(Percent)</h1>
          </div>
          <div className="chart-wrapper">
            <BarChart width={330} height={205} data={onlineData}>
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
      </div>
    </div>
  );
};
export default GraphDataUsers;
