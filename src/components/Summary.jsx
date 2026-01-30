import React from "react";
import { formatCurrency } from "../utils/helpers";
import { getCategoryIcon } from "../utils/Constants";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884D8",
  "#82ca9d",
  "#ffc658",
  "#ff7c7c",
  "#8dd1e1",
  "#d084d0",
];

const Summary = ({ summary }) => {
  if (!summary || !summary.categoryBreakdown) {
    return null;
  }
  const { categoryBreakdown } = summary;

  const maxAmount = Math.max(...categoryBreakdown.map((item) => item.total));

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-6">
        Category Summary
      </h3>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-gray-600 mb-3">
            Expense Distribution
          </h4>
          {categoryBreakdown.map((item, index) => {
            const percentage = (item.total / summary.totalExpense) * 100;
            const barWidth = (item.total / maxAmount) * 100;

            return (
              <div key={item._id} className="space-y-1">
                <div className="flex justify-between items-center text-sm">
                  <span className="font-medium text-gray-700">
                    {getCategoryIcon(item._id)} {item._id}
                  </span>
                  <span className="text-gray-600">
                    {percentage.toFixed(1)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-6 overflow-hidden">
                  <div
                    className="h-full rounded-full flex items-center justify-end pr-2 text-white text-xs font-medium"
                    style={{
                      width: `${barWidth}%`,
                      backgroundColor: COLORS[index % COLORS.length],
                      minWidth: barWidth > 10 ? "auto" : "10%",
                    }}
                  >
                    {barWidth > 10 && formatCurrency(item.total)}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="space-y-3">
          <h4 className="text-sm font-medium text-gray-600 mb-3">
            Detailed Breakdown
          </h4>
          {categoryBreakdown.map((item, index) => (
            <div
              key={item._id}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
            >
              <div className="flex items-center">
                <div
                  className="w-4 h-4 rounded-full mr-3"
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                />
                <span className="mr-2">{getCategoryIcon(item._id)}</span>
                <div>
                  <p className="font-medium text-gray-800">{item._id}</p>
                  <p className="text-xs text-gray-500">
                    {item.count} transactions
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-800">
                  {formatCurrency(item.total)}
                </p>
                <p className="text-xs text-gray-500">
                  {((item.total / summary.totalExpense) * 100).toFixed(1)}%
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Summary;
