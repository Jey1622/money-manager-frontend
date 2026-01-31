import React from "react";
import { TrendingUp, TrendingDown, Wallet, Calendar } from "lucide-react";
import { formatCurrency } from "../utils/helpers";

const Dashboard = (summary, period) => {
  const { totalIncome , totalExpense , balance  } = summary.summary || {};
  const cards = [
    {
      title: "Total Income",
      amount: totalIncome,
      icon: TrendingUp,
      bgColor: "bg-green-50",
      textColor: "text-green-600",
    },
    {
      title: "Total Expense",
      amount: totalExpense,
      icon: TrendingDown,
      bgColor: "bg-red-50",
      textColor: "text-red-600",
    },
    {
      title: "Balance",
      amount: balance,
      icon: Wallet,
      bgColor: balance >= 0 ? "bg-blue-50" : "bg-orange-50",
      textColor: balance >= 0 ? "text-blue-600" : "text-orange-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      {cards.map((card, index) => (
        <div
          key={index}
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition"
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`p-3 rounded-lg ${card.bgColor}`}>
              <card.icon className={card.textColor} size={24} />
            </div>

            <div className="flex items-center text-sm text-gray-500">
              <Calendar size={16} className="mr-1" />
              <span className="capitalize">{period || "All time"}</span>
            </div>
          </div>

          <h3 className="text-gray-600 text-sm font-medium mb-1">
            {card.title}
          </h3>

          <p className={`text-2xl font-bold ${card.textColor}`}>
            {formatCurrency(card.amount)}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
