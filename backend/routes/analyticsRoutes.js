import express from "express"

import {categoryAnalytics , monthlyAnalytics , totalExpense , netBalance , totalIncome} from "../controllers/analyticsControllers.js"
import protect from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/category", protect ,categoryAnalytics);
router.get("/monthly" , protect , monthlyAnalytics);
router.get("/balance" , protect , netBalance);
router.get("/total-expense" , protect , totalExpense);
router.get("/total-income" , protect , totalIncome);

export default router;