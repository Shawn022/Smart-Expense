import api from "./axios.js"

export const addIncome = (data) => api.post("/income",data);
export const getIncomes = () => api.get("/income");
export const deleteIncome = (id) => api.delete(`/income/${id}`);