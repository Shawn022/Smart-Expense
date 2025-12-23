import Expense from "../models/expenses.js"
import mongoose from "mongoose"
import Income from "../models/income.js";

export const categoryAnalytics = async (req, res) => {
    const data = await Expense.aggregate([
        {
            $match: {
                user: new mongoose.Types.ObjectId(req.user._id)
            },
        },
        {
            $group : {
                _id:"$category",
                totalAmount : {$sum: "$amount"}
            }
        },
        {
            $project:{
                category: "$_id",
                amount : "$totalAmount",
                _id:0
            }
        }
    ]);

    res.json(data);
}

export const monthlyAnalytics = async (req , res)=>{
    const data= await Expense.aggregate([
        {
            $match:{
                user: new mongoose.Types.ObjectId(req.user._id)
            }
        },
        {
            $group:{
                _id : {$month : "$date"},
                totalAmount: {$sum: "$amount"}
            }
        },
        {
            $project:{
                month : "$_id",
                amount: "$totalAmount",
                _id:0
            }
        },
        {
            $sort:{month : 1}
        }
    ])

    res.json(data);
}

export const totalExpense = async (req,res) => {
    const data = await Expense.aggregate([
        {
            $match:{
                user: new mongoose.Types.ObjectId(req.user._id)
            }
        },
        {
            $group:{
                _id:null,
                totalAmount:{$sum : "$amount"}
            }
        }
    ]);

    res.json(data);
}

export const netBalance = async (req,res) => {
    const expense = await Expense.aggregate([
        {
            $match:{
                user: new mongoose.Types.ObjectId(req.user._id)
            }
        },
        {
            $group:{
                _id:null,
                total:{$sum : "$amount"}
            }
        }
    ]);

    const income = await Income.aggregate([
        {
            $match:{
                user : new mongoose.Types.ObjectId(req.user._id)
            }
        },
        {
            $group:{
                _id:null,
                total:{$sum : "$amount"}
            }
        }
    ]);

    const totalExpense = expense[0]?.total || 0;
    const totalIncome = income[0]?.total || 0;

    res.json({
        income:totalIncome,
        expense: totalExpense,
        balance: totalIncome - totalExpense
    });
}

export const totalIncome = async (req , res) => {
    const data = await Income.aggregate([
        {
            $match:{
                user : new mongoose.Types.ObjectId(req.user._id)
            }
        },
        {
            $group:{
                _id:null,
                total:{$sum : "$amount"}
            }
        }
    ]);

    res.json(data);
}