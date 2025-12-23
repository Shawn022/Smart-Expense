import express from "express";
import {createExpense , getExpenses , deleteExpense ,updateExpense} from "../controllers/expenseControllers.js"
import protect from "../middlewares/authMiddleware.js"

const router = express.Router();

router.route("/")
    .get(protect , getExpenses)
    .post(protect , createExpense);

router.route("/:id")
    .put(protect, updateExpense)
    .delete(protect, deleteExpense)

export default router;