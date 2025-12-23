import express from "express";
import cors from "cors";
import "dotenv/config"
import "./config/db.js"
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import expenseRoutes from "./routes/expenseRoutes.js"
import incomeRoutes from "./routes/incomeRoutes.js"
import analyticsRoutes from "./routes/analyticsRoutes.js"
import { notFound, errorHandler } from "./middlewares/errorMiddleware.js";

const app = express();
await connectDB();

app.use(cors());
app.use(express.json());


app.use("/api/auth" , authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/analytics" , analyticsRoutes);
app.use("/api/income" , incomeRoutes);


app.get('/', (req, res) => {
  res.send('Smart Expense says Hello')
})  


app.use(notFound);
app.use(errorHandler);


const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`Example app listening on port ${PORT}`)
})