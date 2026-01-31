import { ArrowRightLeft, Banknote, CreditCard, DollarSign, Edit2, Trash2, Wallet } from "lucide-react";
import { formatCurrency } from "../utils/helpers";

const AccountsOverview = ({ accounts, onEdit, onDelete, onTransfer }) => {
  const getAccountIcon = (type) => {
    switch (type) {
      case "cash":
        return <Wallet size={24} />;
      case "bank":
        return <Banknote size={24} />;
      case "card":
        return <CreditCard size={24} />;
      default:
        return <DollarSign size={24} />;
    }
  };

  const getAccountColor = (type) => {
    switch (type) {
      case "cash":
        return "bg-green-500 ";
      case "bank":
        return "bg-blue-500 ";
      case "card":
        return "bg-purple-500 ";
      default:
        return "bg-gray-500 ";
    }
  };

  const totalBalance = accounts.reduce(
    (sum, account) => sum + account.balance,
    0,
  );

  if (accounts.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <Wallet size={48} className="mx-auto text-gray-400 mb-4" />
        <p className="text-gray-600 mb-2">No accounts found</p>
        <p className="text-sm text-gray-500">
          Add your first account to start tracking balances
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg shadow-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-primary-900 text-sm font-medium mb-1 text-gray-700">
              Total Balance
            </p>
            <h2 className="text-3xl font-bold text-gray-700">
              {formatCurrency(totalBalance)}
            </h2>
            <p className="text-primary-100 text-sm mt-2 text-gray-700">
              Across {accounts.length} account{accounts.length !== 1 ? "s" : ""}
            </p>
          </div>
          <div className="bg-green-500 bg-opacity-20 p-4 rounded-full">
            <Wallet size={32} />
          </div>
        </div>
      </div>

      {accounts.length >= 2 && (
        <button
          onClick={onTransfer}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-md"
        >
          <ArrowRightLeft size={20} />
          <span className="font-medium">Transfer Between Accounts</span>
        </button>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {accounts.map((account) => (
          <div
            key={account._id}
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition overflow-hidden"
          >
            <div className="p-5">
              <div className="flex items-start justify-between mb-4">
                <div
                  className={`${getAccountColor(account.type)} p-3 rounded-lg text-white`}
                >
                  {getAccountIcon(account.type)}
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={() => onEdit(account)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                    title="Edit account"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => onDelete(account._id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                    title="Delete account"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-800 text-lg mb-1">
                  {account.name}
                </h3>
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-3">
                  {account.type}
                </p>

                <div className="border-t pt-3">
                  <p className="text-sm text-gray-600 mb-1">Current Balance</p>
                  <p
                    className={`text-2xl font-bold ${
                      account.balance >= 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {formatCurrency(account.balance)}
                  </p>
                </div>
              </div>
            </div>

            <div
              className={`h-1 ${
                account.balance >= 0 ? "bg-green-500" : "bg-red-500"
              }`}
            />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-sm text-gray-600 mb-1">Positive Balances</p>
          <p className="text-xl font-bold text-green-600">
            {formatCurrency(
              accounts
                .filter((acc) => acc.balance > 0)
                .reduce((sum, acc) => sum + acc.balance, 0),
            )}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-sm text-gray-600 mb-1">Negative Balances</p>
          <p className="text-xl font-bold text-red-600">
            {formatCurrency(
              accounts
                .filter((acc) => acc.balance < 0)
                .reduce((sum, acc) => sum + acc.balance, 0),
            )}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-sm text-gray-600 mb-1">Number of Accounts</p>
          <p className="text-xl font-bold text-gray-800">{accounts.length}</p>
        </div>
      </div>
    </div>
  );
};

export default AccountsOverview;
