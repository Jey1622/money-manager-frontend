import { useEffect, useState } from "react";
import {
  EXPENSE_CATEGORIES,
  INCOME_CATEGORIES,
  DIVISIONS,
} from "../utils/Constants";
import { X } from "lucide-react";

const TransactionModel = ({
  transaction,
  onClose,
  onSubmit,
  isOpen,
  accounts,
}) => {
  const [activeTab, setActiveTab] = useState("expense");
  const [formData, setFormData] = useState({
    type: "expense",
    amount: "",
    category: "",
    division: "personal",
    description: "",
    date: new Date().toISOString().slice(0, 16),
    fromAccount: "",
    toAccount: "",
  });

  useEffect(() => {
    if (transaction) {
        setFormData({
            ...transaction,
            date:new Date(transaction.date).toISOString().slice(0,16)
        })
        setActiveTab(transaction.type);
    } else {
        setFormData({
            type: activeTab,
        amount: '',
        category: '',
        division: 'personal',
        description: '',
        date: new Date().toISOString().slice(0, 16),
        fromAccount: '',
        toAccount: ''
        })
    }
  }, [transaction,activeTab]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setFormData({ ...formData, type: tab, category: '' });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      amount: parseFloat(formData.amount),
      date: new Date(formData.date)
    });
  };

  if (!isOpen) return null;

  const categories = activeTab === 'income' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;
return(
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-800">
            {transaction ? 'Edit Transaction' : 'Add Transaction'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition"
          >
            <X size={24} />
          </button>
        </div>

        {!transaction && (
          <div className="flex border-b">
            <button
              className={`flex-1 py-3 px-4 font-medium transition ${
                activeTab === 'expense'
                  ? 'text-red-600 border-b-2 border-red-600 bg-red-50'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => handleTabChange('expense')}
            >
              Expense
            </button>
            <button
              className={`flex-1 py-3 px-4 font-medium transition ${
                activeTab === 'income'
                  ? 'text-green-600 border-b-2 border-green-600 bg-green-50'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => handleTabChange('income')}
            >
              Income
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Amount *
            </label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              required
              step="0.01"
              min="0"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Enter amount"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category *
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="">Select category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Division *
            </label>
            <div className="flex gap-4">
              {DIVISIONS.map((division) => (
                <label key={division.value} className="flex items-center">
                  <input
                    type="radio"
                    name="division"
                    value={division.value}
                    checked={formData.division === division.value}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-700">{division.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description *
            </label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Enter description"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date & Time *
            </label>
            <input
              type="datetime-local"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          {accounts && accounts.length > 0 && (
            <>
              {activeTab === 'expense' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    From Account
                  </label>
                  <select
                    name="fromAccount"
                    value={formData.fromAccount}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="">Select account</option>
                    {accounts.map((account) => (
                      <option key={account._id} value={account.name}>
                        {account.name} (₹{account.balance})
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {activeTab === 'income' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    To Account
                  </label>
                  <select
                    name="toAccount"
                    value={formData.toAccount}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="">Select account</option>
                    {accounts.map((account) => (
                      <option key={account._id} value={account.name}>
                        {account.name} (₹{account.balance})
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </>
          )}

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`flex-1 px-4 py-2 rounded-lg text-white transition ${
                activeTab === 'income'
                  ? 'bg-green-600 hover:bg-green-700'
                  : 'bg-red-600 hover:bg-red-700'
              }`}
            >
              {transaction ? 'Update' : 'Add'}
            </button>
          </div>
        </form>
      </div>
    </div>
)
};

export default TransactionModel;
