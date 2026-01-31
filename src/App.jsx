import { useEffect, useState } from "react";
import "./App.css";
import { Plus } from "lucide-react";
import Dashboard from "./components/Dashboard";
import Summary from "./components/Summary";
import {
  getTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction,
  getSummary,
  getAccounts,
  getCategories,
} from "./services/api";
import Filters from "./components/Filters";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState({});
  const [accounts, setAccounts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    period: "month",
    type: "",
    category: "",
    division: "",
    startDate: "",
    endDate: "",
  });
  useEffect(() => {
    fetchData();
  }, [filters]);
  const fetchData = async () => {
    try {
      setLoading(true);

      const filterParams = {};
      if (filters.period) filterParams.period = filters.period;
      if (filters.type) filterParams.type = filters.type;
      if (filters.category) filterParams.category = filters.category;
      if (filters.division) filterParams.division = filters.division;
      if (filters.startDate && filters.endDate) {
        filterParams.startDate = filters.startDate;
        filterParams.endDate = filters.endDate;
      }

      const [transactionsRes, summaryRes, accountRes, categoriesRes] =
        await Promise.all([
          getTransactions(filterParams),
          getSummary(filterParams),
          getAccounts(),
          getCategories(),
        ]);

      setTransactions(transactionsRes.data);
      setSummary(summaryRes.data);
      setAccounts(accountRes.data);
      setCategories(categoriesRes.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("Failed to fetch data. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}

      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                💰 Money Manager
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                Manage your finances with ease
              </p>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition shadow-md hover:shadow-lg"
            >
              <Plus size={20} />
              <span className="font-medium text-gray-700">Add Transaction</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Dashboard summary={summary} period={filters.period} />

        <Filters
          filters={filters}
          onFilterChange={setFilters}
          categories={categories}
        />

        {summary.categoryBreakdown && summary.categoryBreakdown.length > 0 && (
          <div className="mb-6">
            <Summary summary={summary} />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
