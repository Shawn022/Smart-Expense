import mongoose from "mongoose";

const incomeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    source: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
},
    { timestamps: true }
);

export default mongoose.model("Income" , incomeSchema);