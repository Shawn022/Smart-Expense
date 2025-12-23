import Balance from "./balance";

const ExpenseList = ({ expenses, onEdit, onDelete , balance }) => {

    return (
        <div className="space-y-4 pr-30 pl-30 p-5 max-h-[55vh] overflow-y-scroll">
            <Balance income={balance.income} expense={balance.expense} balance={balance.balance} />
            {expenses.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No expenses found. Add your first expense above!</p>
            ) : (
                expenses.map((exp) => (
                    <div key={exp._id} className="bg-white p-4 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition duration-200">
                        <div className="flex justify-between items-center">
                            <div className="flex-1">
                                <h4 className="text-lg font-semibold text-gray-800">{exp.title}</h4>
                                <p className="text-sm text-gray-600 capitalize">{exp.category} . {(new Date(exp.date)).toDateString()}</p>
                            </div>
                            <div className="flex items-center space-x-2">
                                <span className="text-xl font-bold text-green-600">₹{exp.amount}</span>
                                <button
                                    onClick={() => onEdit(exp)}
                                    className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200"
                                    title="Edit expense"
                                >
                                    ✏️
                                </button>
                                <button
                                    onClick={() => onDelete(exp._id)}
                                    className="bg-red-300 text-white p-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-200 focus:ring-offset-2 transition duration-200"
                                    title="Delete expense"
                                >
                                    ❌
                                </button>
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>
    )
}

export default ExpenseList;