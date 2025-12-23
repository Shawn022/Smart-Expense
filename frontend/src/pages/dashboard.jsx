import { useAuth } from "../context/authContext"
import { useEffect, useState } from 'react'
import { deleteExpense, getExpenses } from "../api/expenseApi";
import { monthlyTotals, categoryTotals, totalExpense , netBalance } from "../api/analyticsApi";
import {getIncomes} from "../api/incomeApi"
import ExpenseForm from "../components/expenseForm";
import ExpenseList from "../components/expenseList";
import IncomeList from "../components/incomeList"
import CategoryPieChart from "../components/CategoryPieChart";
import MonthlyBarChart from "../components/MonthlyBarChart";

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);
  const [incomes , setIncomes] = useState([]);

  const [form, setForm] = useState("", 0, "");
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(false);
  const [window, setWindow] = useState("expense");

  const [categoryData, setCategoryData] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);
  const [balance , setBalance] = useState({});
  const [total, setTotal] = useState(0);

  const { logout } = useAuth();

  useEffect(() => {
    const loadData = async () => {
      const res = await getExpenses();
      setExpenses(res.data);
      const res2 = await getIncomes();
      setIncomes(res2.data);
      console.log(res2.data) 
    };

    loadData();
    loadAnalytics();
  }, [])

  const loadAnalytics= async() => {
      setCategoryData(await categoryTotals());
      setMonthlyData(await monthlyTotals());
      setTotal(await totalExpense());
      const bal = await netBalance();
      setBalance(bal.data);
    }

  const addExpenseHandler = async (expense) => {
    setExpenses(prev => [...prev, expense]);
    loadAnalytics();
    setShowForm(false);
  }

  const updateExpenseHandler = async (updated) => {
    setExpenses(prev => prev.map(e => e._id === updated._id ? updated : e));
    loadAnalytics();
    setEditing(false);
    setShowForm(false);
  }

  const deleteExpenseHandler = async (id) => {
    await deleteExpense(id);
    setExpenses(prev => prev.filter(e => e._id !== id));
    loadAnalytics();
  }


  const isActive = (val) => {
    return (window === val) ? "bg-blue-500 text-white" : "text-gray-600 hover:text-gray-800 hover:bg-gray-50";
  }
  return (
    <>
      {showForm && (
        <ExpenseForm
          editingExpense={editing ? form : null}
          clearEdit={() => {
            setEditing(false);
            setShowForm(false);
          }}
          onAdd={addExpenseHandler}
          onUpdate={updateExpenseHandler}
        />
      )}
      <div className="bg-linear-to-br from-blue-50 to-indigo-100 min-h-screen">

        <header className="bg-white shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <h1 className="text-4xl font-bold text-gray-900">Smart Expense</h1>
              <div className="text-sm text-gray-600 flex gap-5">
                Welcome back!
                <button className="text-red-600 font-medium hover:text-red-300" onClick={() => logout()} >( LogOut? )</button>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-xl shadow-lg min-h-[75vh] max-h-[80vh]">

            <div className="flex border-b border-gray-200">
              <button
                className={`flex-1 py-4 px-6 text-center font-medium transition-colors duration-200 ${isActive("expense")}`}
                onClick={() => setWindow("expense")}
              >
                📋 Expense
              </button>

              <button
                className={`flex-1 py-4 px-6 text-center font-medium transition-colors duration-200 ${isActive("incomes")}`}
                onClick={() => setWindow("incomes")}
              >
                📋 Incomes
              </button>
              
              <button
                className={`flex-1 py-4 px-6 text-center font-medium transition-colors duration-200 ${isActive("monthly")}`}
                onClick={() => setWindow("monthly")}
              >
                📊 Monthly
              </button>
              <button
                className={`flex-1 py-4 px-6 text-center font-medium transition-colors duration-200 ${isActive("analytics")}`}
                onClick={() => setWindow("analytics")}
              >
                📈 Analytics
              </button>
            </div>

            <div className="p-6 min-h-125">

              {window === "expense" &&
                <div className="space-y-6">
                  <div className="text-center flex justify-between mr-30 ml-30">
                    <div className="p-2 text-xl border-2 rounded-xl shadow-lg"> Total: {total}</div>
                    <button
                      onClick={() => setShowForm(true)}
                      className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition duration-200 font-semibold shadow-md hover:shadow-lg"
                    >
                      ➕ Add Expense
                    </button>
                  </div>

                  <ExpenseList
                    expenses={expenses}
                    onEdit={(expense) => {
                      setForm(expense);
                      setEditing(true);
                      setShowForm(true);
                    }}
                    onDelete={deleteExpenseHandler}
                    balance={balance}
                  />
                </div>
              }

              {window === "incomes" &&
                <div className="space-y-6">
                  
                  <IncomeList
                    incomes={incomes}
                    setIncomes={setIncomes}
                    loadAnalytics = {loadAnalytics}
                  />
                </div>
              }


              {window === "monthly" &&
                <div className="flex justify-center items-center h-full">
                  <div className="text-center">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Monthly Expenses</h2>
                    {monthlyData.length > 0 ? (
                      <MonthlyBarChart data={monthlyData} />
                    ) : (
                      <p className="text-gray-500">No data available</p>
                    )}
                  </div>
                </div>
              }

              {window === "analytics" &&
                <div className="flex justify-center items-center h-full">
                  <div className="text-center">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Expense Categories</h2>
                    {categoryData.length > 0 ? (
                      <CategoryPieChart data={categoryData} />
                    ) : (
                      <p className="text-gray-500">No data available</p>
                    )}
                  </div>
                </div>
              }

            </div>

          </div>
        </div>

      </div>
    </>
  )
}

export default Dashboard;
