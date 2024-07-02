import { useMemo, useState, useEffect } from "react";
import "./CartChart.scss";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const CartChart = (args) => {
  let rData = useMemo(() => args?.data || [], [args?.data]);
  const [cartsData, setCartsData] = useState([]);

  const formatMonth = (dateString) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
      2,
      "0"
    )}`;
  };

  useEffect(() => {
    if (rData.length > 0) {
      const groupedData = rData.reduce((acc, cart) => {
        const month = formatMonth(cart.created_at);
        if (!acc[month]) {
          acc[month] = { deletedCarts: 0, notDeletedCarts: 0 };
        }
        if (cart.isDeleted) {
          acc[month].deletedCarts += 1;
        } else {
          acc[month].notDeletedCarts += 1;
        }
        return acc;
      }, {});

      const resultData = Object.keys(groupedData).map((month) => ({
        month: month,
        deletedCarts: groupedData[month].deletedCarts,
        notDeletedCarts: groupedData[month].notDeletedCarts,
      }));

      setCartsData(resultData);
    }
  }, [rData]);

  console.log(cartsData);

  const data = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];
  return (
    <div className="cart-chart">
      <div className="content">
        <div className="legend-wrapper">
          <div className="title-wrapper">
            <span className="title">Deleted And not deleted</span>
          </div>
          <div className="legend">
            <div className="item">
              <div className="green"></div>
              <span className="indicator">Not Deleted cart in counts</span>
            </div>
            <div className="item">
              <div className="red"></div>
              <span className="indicator">deleted cart in count</span>
            </div>
          </div>
        </div>
        <div className="chart-wrapper">
          <AreaChart
            width={730}
            height={250}
            data={cartsData}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="deletedCarts" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="red" stopOpacity={0.8} />
                <stop offset="95%" stopColor="red" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="notDeletedCarts" x1="0" y1="0" x2="0" y2="1">
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
              dataKey="deletedCarts"
              stroke="red"
              fillOpacity={1}
              fill="url(#deletedCarts)"
            />
            <Area
              type="monotone"
              dataKey="notDeletedCarts"
              stroke="green"
              fillOpacity={1}
              fill="url(#notDeletedCarts)"
            />
          </AreaChart>
        </div>
      </div>
    </div>
  );
};
export default CartChart;
