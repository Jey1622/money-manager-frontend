import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getTransactions = (filters = {}) => {
  const params = new URLSearchParams();
  Object.keys(filters).forEach(key => {
    if (filters[key]) params.append(key, filters[key]);
  });
  return api.get(`/getAllTransactions?${params.toString()}`);
};

export const getTransactionById = (id) => api.get(`/transaction/getTransaction/${id}`);
export const createTransaction = (data) => api.post('/transaction/create', data);
export const updateTransaction = (id, data) => api.post(`/transaction/updateTransaction/${id}`, data);
export const deleteTransaction = (id) => api.post(`/transaction/deleteTransaction/${id}`);

export const getSummary = (filters = {}) => {
  const params = new URLSearchParams();
  Object.keys(filters).forEach(key => {
    if (filters[key]) params.append(key, filters[key]);
  });
  return api.get(`/summary?${params.toString()}`);
};

export const getAccounts = () => api.get('/account/get');
export const createAccount = (data) => api.post('/account/create', data);
export const updateAccount = (id, data) => api.post(`/account/update/${id}`, data);
export const deleteAccount = (id) => api.post(`/account/delete/${id}`);

export const getCategories = () => api.get('/categories');

export default api;