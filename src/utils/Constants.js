export const getCategoryIcon = (category) => {
  const icons = {
    'Fuel': '⛽',
    'Movie': '🎬',
    'Food': '🍔',
    'Loan': '💰',
    'Medical': '🏥',
    'Shopping': '🛒',
    'Travel': '✈️',
    'Utilities': '💡',
    'Rent': '🏠',
    'Entertainment': '🎮',
    'Education': '📚',
    'Insurance': '🛡️',
    'Groceries': '🛒',
    'Transportation': '🚗',
    'Salary': '💼',
    'Freelance': '💻',
    'Business': '🏢',
    'Investment': '📈',
    'Rental': '🏘️',
    'Gift': '🎁',
    'Bonus': '🎉',
    'Others': '📌'
  };
  return icons[category] || '📌';
};