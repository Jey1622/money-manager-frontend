import { Loader, Plus } from "lucide-react";
import AccountsOverview from "../components/AccountsOverview";
import AccountModel from "../components/AccountModel";
import TransferModel from "../components/TransferModel";
import {
  createAccount,
  createTransaction,
  deleteAccount,
  getAccounts,
  updateAccount,
} from "../services/api";
import { useEffect, useState } from "react";
import { set } from "date-fns";

const AccountPage = () => {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);

  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    try {
      setLoading(true);
      const response = await getAccounts();
      setAccounts(response.data);
    } catch (error) {
      console.error("Error fetching accounts:", error);
      alert("Failed to fetch accounts. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddAccount = async (data) => {
    try {
      if (selectedAccount) {
        await updateAccount(selectedAccount._id, data);
      } else {
        await createAccount(data);
      }
      setIsAccountModalOpen(false);
      setSelectedAccount(null);
      fetchAccounts();
    } catch (error) {
      console.error("Error saving account:", error);
      alert("Failed to save account. Please try again.");
    }
  };

  const handleDeleteAccount = async (id) => {
    if (
      window.confirm(
        "Are you sure you want to delete this account?All associated transactions will lose account reference.",
      )
    ) {
      try {
        await deleteAccount(id);
        fetchAccounts();
      } catch (error) {
        console.error("Error deleting account:", error);
        alert("Failed to delete account. Please try again.");
      }
    }
  };

  const handleEditAccount = (account) => {
    setSelectedAccount(account);
    setIsAccountModalOpen(true);
  };

  const handleTransfer = async (data) => {
    try {
      await createTransaction(data);
      setIsTransferModalOpen(false);
      fetchAccounts();
    } catch (error) {
      console.error("Error creating transaction:", error);
      alert("Failed to create transaction. Please try again.");
    }
  };

  const handleCloseAccountModal = () => {
    setIsAccountModalOpen(false);
    setSelectedAccount(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader className="animate-spin text-primary-600" size={48} />
      </div>
    );
  }

  return(
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">💳 Accounts</h1>
              <p className="text-sm text-gray-600 mt-1">Manage your accounts and balances</p>
            </div>
            <button
              onClick={() => setIsAccountModalOpen(true)}
              className="flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition shadow-md hover:shadow-lg"
            >
              <Plus size={20} className=" text-green-500"/>
              <span className="font-medium text-gray-900">Add Account</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AccountsOverview
          accounts={accounts.data}
          onEdit={handleEditAccount}
          onDelete={handleDeleteAccount}
          onTransfer={() => setIsTransferModalOpen(true)}
        />
      </main>

      <AccountModel
        isOpen={isAccountModalOpen}
        onClose={handleCloseAccountModal}
        onSubmit={handleAddAccount}
        account={selectedAccount}
      />

      <TransferModel
        isOpen={isTransferModalOpen}
        onClose={() => setIsTransferModalOpen(false)}
        onSubmit={handleTransfer}
        accounts={accounts.data}
      />
    </div>
  )
};

export default AccountPage;
