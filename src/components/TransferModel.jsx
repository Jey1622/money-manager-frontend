import { X, ArrowRight } from "lucide-react";
import { useState } from "react";

const TransferModel = ({ isOpen, onClose, onSubmit, accounts }) => {
  const [formData, setFormData] = useState({
    fromAccount: "",
    toAccount: "",
    amount: "",
    description: "",
    date: new Date().toISOString().slice(0, 16),
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.fromAccount === formData.toAccount) {
      alert("Source and destination accounts must be different");
      return;
    }

    onSubmit({
      type: "transfer",
      amount: parseFloat(formData.amount),
      fromAccount: formData.fromAccount,
      toAccount: formData.toAccount,
      description: formData.description,
      date: new Date(formData.date),
      category: "Transfer",
      division: "personal",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleClose = () => {
    setFormData({
      fromAccount: "",
      toAccount: "",
      amount: "",
      description: "",
      date: new Date().toISOString().slice(0, 16),
    });
    onClose();
  };

  if (!isOpen) return null;

  const fromAccountData = accounts.find(
    (acc) => acc.name === formData.fromAccount,
  );
  const toAccountData = accounts.find((acc) => acc.name === formData.toAccount);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-800">
            Transfer Money
          </h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              From Account *
            </label>
            <select
              name="fromAccount"
              value={formData.fromAccount}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="">Select source account</option>
              {accounts.map((account) => (
                <option key={account._id} value={account.name}>
                  {account.name} (₹{account.balance.toLocaleString("en-IN")})
                </option>
              ))}
            </select>
            {fromAccountData &&
              fromAccountData.balance < parseFloat(formData.amount || 0) && (
                <p className="text-xs text-red-600 mt-1">
                  ⚠️ Insufficient balance
                </p>
              )}
          </div>

          <div className="flex justify-center">
            <div className="bg-gray-100 p-2 rounded-full">
              <ArrowRight className="text-gray-600" size={20} />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              To Account *
            </label>
            <select
              name="toAccount"
              value={formData.toAccount}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="">Select destination account</option>
              {accounts.map((account) => (
                <option key={account._id} value={account.name}>
                  {account.name} (₹{account.balance.toLocaleString("en-IN")})
                </option>
              ))}
            </select>
          </div>

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
              min="0.01"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Enter amount to transfer"
            />
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
              placeholder="e.g., Moving money to savings"
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

          {/* {formData.fromAccount && formData.toAccount && formData.amount && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <p className="text-sm text-blue-800 font-medium mb-2">
                Transfer Summary:
              </p>
              <div className="space-y-1 text-sm text-blue-700">
                <p>
                  From:{" "}
                  <span className="font-semibold">{formData.fromAccount}</span>
                </p>
                <p>
                  To:{" "}
                  <span className="font-semibold">{formData.toAccount}</span>
                </p>
                <p>
                  Amount:{" "}
                  <span className="font-semibold">
                    ₹{parseFloat(formData.amount).toLocaleString("en-IN")}
                  </span>
                </p>
              </div>
            </div>
          )} */}

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 px-4 py-2 border border-gray-700 rounded-lg text-gray-700 hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={
                fromAccountData &&
                fromAccountData.balance < parseFloat(formData.amount || 0)
              }
              className="flex-1 px-4 py-2 bg-primary-600 border border-primary-700 text-gray-700 rounded-lg hover:bg-primary-700 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Transfer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TransferModel;