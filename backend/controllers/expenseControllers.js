import e from "express";
import Expense from "../models/expenses.js"

export const createExpense = async (req, res) => {
    const { title, amount, category } = req.body;

    if (!title || !amount || !category) {
        return res.status(401).json({ message: "All fields are required" });
    }

    const expense = await Expense.create({
        user: req.user._id,
        title,
        amount,
        category
    })

    res.status(201).json(expense);
}

export const getExpenses = async (req, res) => {
    const expenses = await Expense.find({ user: req.user._id })
    res.json(expenses || [])
}

export const updateExpense = async (req, res) => {
    const expense = await Expense.findById(req.params.id);

    if (!expense) {
        return res.status(401).json({ message: "Expense not found" });
    }

    if (expense.user.toString() !== req.user._id.toString()) {
        return res.status(401).json({ message: "Not Authorised" });
    }

    expense.title = req.body.title || expense.title;
    expense.amount = req.body.amount || expense.amount;
    expense.category = req.body.category || expense.category;

    const updatedExpense = await expense.save();
    res.json(updatedExpense);
}

export const deleteExpense = async (req,res) =>{
    const expense = await Expense.findById(req.params.id);

    if (!expense) {
        return res.status(401).json({ message: "Expense not found" });
    }

    if (expense.user.toString() !== req.user._id.toString()) {
        return res.status(401).json({ message: "Not Authorised" });
    }

    await expense.deleteOne();
    res.json({message: "Expense removed"})
} 


