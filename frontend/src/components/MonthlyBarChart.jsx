import { BarChart , Bar , XAxis ,YAxis ,Tooltip } from "recharts"

const MonthlyBarChart = ({data}) => {
  return (
    <BarChart width={500} height={300} data={data}>
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="amount" fill="#82ca9d" />
    </BarChart>
  )
}

export default MonthlyBarChart;
