import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const OrderGraphs = (args) => {
  const data = args.data;

  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    // Calculate counts
    const totalOrders = data.length;
    const cancelledOrders = data.filter(
      (order) => order.isCancelled === 1
    ).length;
    const paidOrders = data.filter((order) => order.isPaid === 1).length;
    const pendingOrders = totalOrders - paidOrders;

    // Calculate percentages
    const cancelledPercentage = (cancelledOrders / totalOrders) * 100;
    const paidPercentage = (paidOrders / totalOrders) * 100;
    const pendingPercentage = (pendingOrders / totalOrders) * 100;

    // Prepare chart data
    setChartData([
      { name: "Paid", Paid: paidPercentage },
      { name: "Pending", Pending: pendingPercentage },
      { name: "Cancelled", Cancelled: cancelledPercentage },
    ]);
  }, [data]);

  return (
    <div className="order-graphs">
      <div className="graphs-wrapper">
        <div className="chart-wrapper">
          <BarChart width={530} height={305} data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Paid" fill="green"  barSize={140}/>
            <Bar dataKey="Pending" fill="goldenrod"  barSize={140}/>
            <Bar dataKey="Cancelled" fill="red"  barSize={140}/>
          </BarChart>
        </div>
      </div>
    </div>
  );
};

export default OrderGraphs;
