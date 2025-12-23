import api from "./axios.js"

export const categoryTotals = async() => {
    const {data} =await api.get("/analytics/category");
    return data;
}
export const monthlyTotals = async() => {
    const {data} =await api.get("/analytics/monthly");
    return data;
}
export const totalExpense = async () => {
    const {data} = await api.get("/analytics/total-expense");
    return data[0].totalAmount;
}

export const netBalance = () => api.get("/analytics/balance")

export const totalIncome = () => api.get("/analytics/total-income")
