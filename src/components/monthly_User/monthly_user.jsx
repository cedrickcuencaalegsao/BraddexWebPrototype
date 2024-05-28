import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
} from "recharts";

const MonthlyUser = (data) => {
  console.log(data.data.users);

  return (
    <div className="monthly-user">
      <h1 className="title">Monthly User</h1>
      <BarChart width={730} height={205} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="Online" fill="#008000" />
        <Bar dataKey="Offline" fill="#FF0000" />
      </BarChart>
    </div>
  );
};
export default MonthlyUser;
