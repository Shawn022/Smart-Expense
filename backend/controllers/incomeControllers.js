import Income from "../models/income.js"

export const addIncome = async (req , res) => {
    const {source , amount } = req.body;

    if(!source || !amount) {
        res.status(401).json({message: "All fields are required"});
    }

    const income = await Income.create({
        user: req.user._id,
        source,
        amount
    });

    res.status(201).json(income);
}

export const deleteIncome = async (req ,res)=>{
    const income = await Income.findById(req.params.id);

    if(!income || !income.user.toString() !== req.user._id.toString() ){
        res.status(401).json({message: "Not Authorised"});
    }

    await income.deleteOne();
    res.json({message:"Income removed"});
};

export const getIncomes = async (req, res) => {
    const incomes = await Income.find({user: req.user._id}).sort("-createdAt");
    res.json(incomes);
}