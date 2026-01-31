import React from "react";
import {
  formatDateTime,
  formatCurrency,
  isEditAllowed,
} from "../utils/helpers";
import { getCategoryColor, getCategoryIcon } from "../utils/Constants";
import { Clock, Edit2, Trash2 } from "lucide-react";

const TransactionList = ({ transactions, onEdit, onDelete }) => {
  if (!transactions || transactions.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <p className="text-gray-500">No transactions found</p>
      </div>
    );
  }

  return(
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date & Time
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Division
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {transactions.map((transaction) => {
              const canEdit = isEditAllowed(transaction.createdAt);
              
              return (
                <tr key={transaction._id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-900">
                      <Clock size={14} className="mr-2 text-gray-400" />
                      {formatDateTime(transaction.date)}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{transaction.description}</div>
                    {transaction.fromAccount && (
                      <div className="text-xs text-gray-500">From: {transaction.fromAccount}</div>
                    )}
                    {transaction.toAccount && (
                      <div className="text-xs text-gray-500">To: {transaction.toAccount}</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(transaction.category)}`}>
                      <span className="mr-1">{getCategoryIcon(transaction.category)}</span>
                      {transaction.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      transaction.division === 'office' 
                        ? 'bg-blue-100 text-blue-800' 
                        : 'bg-purple-100 text-purple-800'
                    }`}>
                      {transaction.division}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <span className={`text-sm font-semibold ${
                      transaction.type === 'income' 
                        ? 'text-green-600' 
                        : 'text-red-600'
                    }`}>
                      {transaction.type === 'income' ? '+' : '-'}
                      {formatCurrency(transaction.amount)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => onEdit(transaction)}
                        disabled={!canEdit}
                        className={`p-2 rounded-lg transition ${
                          canEdit 
                            ? 'text-blue-600 hover:bg-blue-50' 
                            : 'text-gray-300 cursor-not-allowed'
                        }`}
                        title={canEdit ? 'Edit' : 'Edit allowed within 12 hours'}
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => onDelete(transaction._id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
};

export default TransactionList;