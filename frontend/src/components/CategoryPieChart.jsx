import {PieChart,Pie,Tooltip,Legend} from "recharts"

const CategoryPieChart = ({data}) => {
    return (
        <PieChart width={400} height={300}>
            <Pie 
                data={data}
                dataKey="amount"
                nameKey="category"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                label
            />
            <Tooltip />
            <Legend />
        </PieChart>
    )
}

export default CategoryPieChart;