import { format, parseISO } from "date-fns";

export const formatDate = (date) => {
  if (!date) return "";
  try {
    const dateObj = typeof date === "string" ? parseISO(date) : date;
    return format(dateObj, "MMM dd, yyyy");
  } catch (error) {
    return "";
  }
};

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};
