import { useState } from 'react'
import { addIncome, deleteIncome } from '../api/incomeApi'

const IncomeList = ({ incomes, setIncomes , loadAnalytics }) => {
    const [showForm, setShowForm] = useState(false)
    const [formData, setFormData] = useState({
        source: '',
        amount: ''
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await addIncome(formData)
            setIncomes(prev => [...prev, response.data])
            setFormData({
                source: '',
                amount: ''
            })
            loadAnalytics();
            setShowForm(false)
        } catch (error) {
            console.error('Error adding income:', error)
        }
    }

    const handleDelete = async (id) => {
        try {
            await deleteIncome(id)
            setIncomes(prev => prev.filter(income => income._id !== id))
        } catch (error) {
            console.error('Error deleting income:', error)
        }
    }

    return (
        <div className="space-y-6">
            <div className="text-center">
                <button
                    onClick={() => setShowForm(true)}
                    className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition duration-200 font-semibold shadow-md hover:shadow-lg"
                >
                    ➕ Add Income
                </button>
            </div>

            {showForm && (
                <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
                        <h2 className="text-2xl font-bold mb-4 text-gray-800">Add Income</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Source</label>
                                <input
                                    type="text"
                                    name="source"
                                    value={formData.source}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                    placeholder="e.g., Salary, Freelance"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
                                <input
                                    type="number"
                                    name="amount"
                                    value={formData.amount}
                                    onChange={handleInputChange}
                                    required
                                    min="0"
                                    step="0.01"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                    placeholder="0.00"
                                />
                            </div>
                            <div className="flex space-x-3 pt-4">
                                <button
                                    type="submit"
                                    className="flex-1 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition duration-200"
                                >
                                    Add Income
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setShowForm(false)}
                                    className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition duration-200"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <div className="space-y-4 pr-30 pl-30 p-5 h-[50vh] max-h-[55vh] overflow-y-scroll">
                {incomes.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">No incomes found. Add your first income above!</p>
                ) : (
                    incomes.map((income) => (
                        <div key={income._id} className="bg-white p-4 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition duration-200">
                            <div className="flex justify-between items-center">
                                <div className="flex-1">
                                    <h4 className="text-lg font-semibold text-gray-800 capitalize">{income.source}</h4>
                                    <p className="text-sm text-gray-600">Added on : {(new Date(income.date)).toDateString()}</p>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <span className="text-xl font-bold text-green-600">₹{income.amount}</span>
                                    <button
                                        onClick={() => handleDelete(income._id)}
                                        className="bg-red-300 text-white p-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-200 focus:ring-offset-2 transition duration-200"
                                        title="Delete income"
                                    >
                                        ❌
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}

export default IncomeList
