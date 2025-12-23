import { useState, useEffect } from 'react';
import { createExpense, updateExpense } from '../api/expenseApi';

const ExpenseForm = ({ editingExpense, clearEdit, onAdd, onUpdate }) => {
    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState("");

    useEffect(() => {
        if (editingExpense) {
            setTitle(editingExpense.title);
            setAmount(editingExpense.amount);
            setCategory(editingExpense.category);
        }
    }, [editingExpense]);

    const submitHandler = async (e) => {
        e.preventDefault();

        if (editingExpense) {
            const { data } = await updateExpense(editingExpense._id, { title, amount, category });
            onUpdate(data);
        } else {
            const { data } = await createExpense({ title, amount, category });
            onAdd(data)
        }
        setTitle("");
        setAmount("");
        setCategory("");
        clearEdit();

    };

    return (
        <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">
                        {editingExpense ? "Edit Expense" : "Add New Expense"}
                    </h3>



                </div>
                <form onSubmit={submitHandler} className="space-y-4">
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                            Title
                        </label>
                        <input
                            id="title"
                            type="text"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            placeholder="Enter expense title"
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
                            Amount
                        </label>
                        <input
                            id="amount"
                            type="number"
                            value={amount}
                            onChange={e => setAmount(e.target.value)}
                            placeholder="Enter amount"
                            required
                            min="0"
                            step="0.01"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                            Category
                        </label>
                        <input
                            id="category"
                            type="text"
                            value={category}
                            onChange={e => setCategory(e.target.value)}
                            placeholder="Enter category"
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    <div className="flex space-x-2 pt-4">
                        <button
                            type="submit"
                            className="flex-1 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-200"
                        >
                            {editingExpense ? "Update Expense" : "Add Expense"}
                        </button>
                        <button
                            type="button"
                            onClick={clearEdit}
                            className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition duration-200"
                        >
                            Cancel
                        </button>

                    </div>
                </form>
            </div>
        </div>
    )
}

export default ExpenseForm;