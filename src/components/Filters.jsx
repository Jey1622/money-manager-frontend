import React from 'react';
import{ PERIODS , DIVISIONS } from '../utils/Constants';
import { Calendar, Filter } from 'lucide-react';

const Filters=({filters, onFilterChange, categories})=>{
    const handlePeriodChange = (e) => {
    const period = e.target.value;
    onFilterChange({ ...filters, period, startDate: '', endDate: '' });
  };

  const handleDateRangeChange = (field, value) => {
    onFilterChange({ ...filters, [field]: value, period: '' });
  };

  const handleFilterChange = (field, value) => {
    onFilterChange({ ...filters, [field]: value });
  };

  const resetFilters = () => {
    onFilterChange({
      period: '',
      type: '',
      category: '',
      division: '',
      startDate: '',
      endDate: ''
    });
  };

  return(
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Filter size={20} className="text-gray-600 mr-2" />
          <h3 className="text-lg font-semibold text-gray-800">Filters</h3>
        </div>
        <button
          onClick={resetFilters}
          className="text-sm text-primary-600 hover:text-primary-700 font-medium"
        >
          Reset All
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <Calendar size={14} className="inline mr-1" />
            Period
          </label>
          <select
            value={filters.period || ''}
            onChange={handlePeriodChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
          >
            <option value="">All Time</option>
            {PERIODS.map((period) => (
              <option key={period.value} value={period.value}>
                {period.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Type
          </label>
          <select
            value={filters.type || ''}
            onChange={(e) => handleFilterChange('type', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
          >
            <option value="">All</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <select
            value={filters.category || ''}
            onChange={(e) => handleFilterChange('category', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
          >
            <option value="">All</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Division
          </label>
          <select
            value={filters.division || ''}
            onChange={(e) => handleFilterChange('division', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
          >
            <option value="">All</option>
            {DIVISIONS.map((div) => (
              <option key={div.value} value={div.value}>
                {div.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Custom Range
          </label>
          <div className="flex gap-2">
            <input
              type="date"
              value={filters.startDate || ''}
              onChange={(e) => handleDateRangeChange('startDate', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
            />
          </div>
        </div>

        <div className="md:col-start-5">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            &nbsp;
          </label>
          <input
            type="date"
            value={filters.endDate || ''}
            onChange={(e) => handleDateRangeChange('endDate', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
          />
        </div>
      </div>
    </div>
  )
}

export default Filters;
