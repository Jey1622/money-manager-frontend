import { useState } from "react";
import "./App.css";
import { Plus } from "lucide-react";
import Dashboard from "./components/Dashboard";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}

      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">💰 Money Manager</h1>
              <p className="text-sm text-gray-600 mt-1">Manage your finances with ease</p>
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
        <Dashboard summary={{}} period={{}}/>
      </main>
    </div>
  );
}

export default App;
