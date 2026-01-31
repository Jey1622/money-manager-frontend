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

export const getCategoryColor = (category) => {
  const colors = {
    'Fuel': 'bg-yellow-100 text-yellow-800',
    'Movie': 'bg-purple-100 text-purple-800',
    'Food': 'bg-orange-100 text-orange-800',
    'Loan': 'bg-red-100 text-red-800',
    'Medical': 'bg-pink-100 text-pink-800',
    'Shopping': 'bg-blue-100 text-blue-800',
    'Travel': 'bg-cyan-100 text-cyan-800',
    'Utilities': 'bg-green-100 text-green-800',
    'Rent': 'bg-indigo-100 text-indigo-800',
    'Entertainment': 'bg-violet-100 text-violet-800',
    'Education': 'bg-amber-100 text-amber-800',
    'Insurance': 'bg-teal-100 text-teal-800',
    'Groceries': 'bg-lime-100 text-lime-800',
    'Transportation': 'bg-sky-100 text-sky-800',
    'Salary': 'bg-emerald-100 text-emerald-800',
    'Freelance': 'bg-blue-100 text-blue-800',
    'Business': 'bg-slate-100 text-slate-800',
    'Investment': 'bg-green-100 text-green-800',
    'Rental': 'bg-purple-100 text-purple-800',
    'Gift': 'bg-pink-100 text-pink-800',
    'Bonus': 'bg-yellow-100 text-yellow-800',
    'Others': 'bg-gray-100 text-gray-800'
  };
  return colors[category] || 'bg-gray-100 text-gray-800';
};

export const EXPENSE_CATEGORIES = [
  'Fuel',
  'Movie',
  'Food',
  'Loan',
  'Medical',
  'Shopping',
  'Travel',
  'Utilities',
  'Rent',
  'Entertainment',
  'Education',
  'Insurance',
  'Groceries',
  'Transportation',
  'Others'
];

export const INCOME_CATEGORIES = [
  'Salary',
  'Freelance',
  'Business',
  'Investment',
  'Rental',
  'Gift',
  'Bonus',
  'Others'
];

export const ACCOUNT_TYPES = [
  { value: 'cash', label: 'Cash' },
  { value: 'bank', label: 'Bank' },
  { value: 'card', label: 'Card' },
  { value: 'other', label: 'Other' }
];