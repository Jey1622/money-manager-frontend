import { useEffect, useState } from "react";
import { Loader, Plus } from "lucide-react";
import Dashboard from "../components/Dashboard";
import Summary from "../components/Summary";
import {
  getTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction,
  getSummary,
  getAccounts,
  getCategories,
} from "../services/api";
import Filters from "../components/Filters";
import TransactionList from "../components/TransactionList";
import TransactionModel from "../components/TransactionModel";

const TransactionPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState({});
  const [selectedTransaction, setSelectedTransaction] = useState(null);
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

  const handleEditTransaction = async (transaction) => {
    setSelectedTransaction(transaction);
    setIsModalOpen(true);
  };

  const handleDeleteTransaction = async (id) => {
    if (window.confirm("Are you sure you want to delete this transaction?")) {
      try {
        await deleteTransaction(id);
        fetchData();
      } catch (error) {
        console.error("Error deleting transaction:", error);
        alert("Failed to delete transaction. Please try again.");
      }
    }
  };

  const handleAddTransaction = async (data) => {
    try {
      if (selectedTransaction) {
        await updateTransaction(selectedTransaction._id, data);
      } else {
        await createTransaction(data);
      }
      setIsModalOpen(false);
      setSelectedTransaction(null);
      fetchData();
    } catch (error) {
      console.error("Error saving transaction:", error);
      if (error.response && error.response.status === 403) {
        alert(
          "Edit not allowed. Transactions can only be edited within 12 hours of creation.",
        );
      } else {
        alert("Failed to save transaction. Please try again.");
      }
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTransaction(null);
  };

  if (loading && transactions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader className="animate-spin text-primary-600" size={48} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className=" mt-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                💵 Transaction
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                Manage your finances with ease
              </p>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 px-6 py-3 bg-primary-600 rounded-lg hover:bg-primary-700 transition shadow-md hover:shadow-lg"
            >
              <Plus size={20} className=" text-green-500" />
              <span className="font-medium text-gray-700">Add Transaction</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Dashboard summary={summary.data} period={filters.period} />

        <Filters
          filters={filters}
          onFilterChange={setFilters}
          categories={categories}
        />

        {summary.categoryBreakdown && summary.categoryBreakdown.length > 0 && (
          <div className="mb-6">
            <Summary summary={summary.data} />
          </div>
        )}

        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Transaction History
          </h2>
          {loading ? (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <Loader
                className="animate-spin text-primary-600 mx-auto"
                size={32}
              />
            </div>
          ) : (
            <TransactionList
              transactions={transactions.data}
              onEdit={handleEditTransaction}
              onDelete={handleDeleteTransaction}
            />
          )}
        </div>
      </main>

      <TransactionModel
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleAddTransaction}
        transaction={selectedTransaction}
        accounts={accounts}
      />
    </div>
  );
};

export default TransactionPage;
