import "./menuGraph.scss";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { useState, useEffect, useMemo } from "react";

const MenuGraph = (args) => {
  const rData = useMemo(() => args?.data || [], [args?.data]);
  const [menuData, setMenuData] = useState([]);

  const formatMonth = (dateString) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
      2,
      "0"
    )}`;
  };

  useEffect(() => {
    const monthOrder = [
      "01",
      "02",
      "03",
      "04",
      "05",
      "06",
      "07",
      "08",
      "09",
      "10",
      "11",
      "12",
    ];
    const compareMonths = (a, b) => {
      const [yearA, monthA] = a.split("-");
      const [yearB, monthB] = b.split("-");
      if (yearA !== yearB) {
        return yearA - yearB;
      }
      return monthOrder.indexOf(monthA) - monthOrder.indexOf(monthB);
    };
    if (rData.length > 0) {
      const groupedData = rData.reduce((acc, menu) => {
        const month = formatMonth(menu.updated_at);
        if (!acc[month]) {
          acc[month] = { available: 0, notAvailable: 0, limited: 0, total: 0 };
        }
        if (menu.isAvialable === "Available") {
          acc[month].available += 1;
        } else if (menu.isAvialable === "NotAvailable") {
          acc[month].notAvailable += 1;
        } else if (menu.isAvialable === "Limited") {
          acc[month].limited += 1;
        }
        acc[month].total += 1;
        return acc;
      }, {});

      const resultData = Object.keys(groupedData)
        .sort(compareMonths)
        .map((month) => {
          const data = groupedData[month];
          return {
            month: month,
            AvailablePercentage: ((data.available / data.total) * 100).toFixed(
              2
            ),
            NotAvailablePercentage: (
              (data.notAvailable / data.total) *
              100
            ).toFixed(2),
            LimitedPercentage: ((data.limited / data.total) * 100).toFixed(2),
          };
        });

      setMenuData(resultData);
    }
  }, [rData]);

  console.log(menuData);
  return (
    <div className="menu-graph-wrapper">
      <div className="content">
        <div className="legend-wrapper">
          <div className="title-wrapper">
            <span className="title">Menu Status Legend</span>
          </div>
          <div className="legend">
            <div className="items">
              <div className="green"></div>
              <span className="indicator">Available</span>
            </div>
            <div className="items">
              <div className="goldenrod"></div>
              <span className="indicator">Limited</span>
            </div>
            <div className="items">
              <div className="red"></div>
              <span className="indicator">Not Available</span>
            </div>
          </div>
        </div>
        <div className="graph-wrapper">
          <AreaChart
            width={730}
            height={250}
            data={menuData}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient
                id="NotAvailablePercentage"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="5%" stopColor="red" stopOpacity={0.8} />
                <stop offset="95%" stopColor="red" stopOpacity={0} />
              </linearGradient>
              <linearGradient
                id="AvailablePercentage"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="5%" stopColor="green" stopOpacity={0.8} />
                <stop offset="95%" stopColor="green" stopOpacity={0} />
              </linearGradient>
              <linearGradient
                id="LimitedPercentage"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="5%" stopColor="goldenrod" stopOpacity={0.8} />
                <stop offset="95%" stopColor="goldenrod" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="month" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="AvailablePercentage"
              stroke="green"
              fillOpacity={1}
              fill="url(#AvailablePercentage)"
            />
            <Area
              type="monotone"
              dataKey="LimitedPercentage"
              stroke="goldenrod"
              fillOpacity={1}
              fill="url(#LimitedPercentage)"
            />
            <Area
              type="monotone"
              dataKey="NotAvailablePercentage"
              stroke="red"
              fillOpacity={1}
              fill="url(#NotAvailablePercentage)"
            />
          </AreaChart>
        </div>
      </div>
    </div>
  );
};
export default MenuGraph;
