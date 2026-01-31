export const getCategoryIcon = (category) => {
  const icons = {
    Fuel: "⛽",
    Movie: "🎬",
    Food: "🍔",
    Loan: "💰",
    Medical: "🏥",
    Shopping: "🛒",
    Travel: "✈️",
    Utilities: "💡",
    Rent: "🏠",
    Entertainment: "🎮",
    Education: "📚",
    Insurance: "🛡️",
    Groceries: "🛒",
    Transportation: "🚗",
    Salary: "💼",
    Freelance: "💻",
    Business: "🏢",
    Investment: "📈",
    Rental: "🏘️",
    Gift: "🎁",
    Bonus: "🎉",
    Others: "📌",
  };
  return icons[category] || "📌";
};

export const PERIODS = [
  { value: "week", label: "This Week" },
  { value: "month", label: "This Month" },
  { value: "year", label: "This Year" },
];

export const DIVISIONS = [
  { value: "office", label: "Office" },
  { value: "personal", label: "Personal" },
];
