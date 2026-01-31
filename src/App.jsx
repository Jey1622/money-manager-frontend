import { useState } from "react";
import "./App.css";
import { Receipt, Wallet } from "lucide-react";
import TransactionPage from "./page/TransactionPage";
import AccountPage from "./page/AccountPage";

function App() {
  const [currentPage, setCurrentPage] = useState("transactions");

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-2">
                <span className="text-2xl">💰</span>
                <h1 className="text-xl font-bold text-gray-900">
                  Money Manager
                </h1>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setCurrentPage("transactions")}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition ${
                    currentPage === "transactions"
                      ? "bg-primary-100 text-primary-700"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <Receipt size={18} />
                  <span>Transactions</span>
                </button>

                <button
                  onClick={() => setCurrentPage("accounts")}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition ${
                    currentPage === "accounts"
                      ? "bg-primary-100 text-primary-700"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <Wallet size={18} />
                  <span>Accounts</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Page Content */}
      {currentPage === "transactions" ? <TransactionPage /> : <AccountPage />}
    </div>
  );
}

export default App;
