import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
} from "recharts";
import moment from "moment";

const MonthlyUser = (data) => {
  let chartData = data.data;

  return (
    <div className="monthly-user">
      <h1 className="title">Monthly Active User</h1>
      <BarChart width={730} height={205} data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="Active" fill="#008000" />
        <Bar dataKey="Inactive" fill="#FF0000" />
      </BarChart>
    </div>
  );
};
export default MonthlyUser;
