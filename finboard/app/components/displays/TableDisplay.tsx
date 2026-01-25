'use client';

import React, { useState } from 'react';
import { formatValue } from '@/app/utils/formatters';

interface TableDisplayProps {
  data: Record<string, any>;
  theme: 'light' | 'dark';
}

export default function TableDisplay({ data, theme }: TableDisplayProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const itemsPerPage = 10;

  let entries = Object.entries(data);

  // Apply search filter
  if (searchTerm.trim()) {
    const lowerSearch = searchTerm.toLowerCase();
    entries = entries.filter(([key, value]) => 
      key.toLowerCase().includes(lowerSearch) || 
      String(value).toLowerCase().includes(lowerSearch)
    );
  }

  if (entries.length === 0) {
    return (
      <div className={`text-center text-sm py-8 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
        📭 No data to display
      </div>
    );
  }

  const totalPages = Math.ceil(entries.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedEntries = entries.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="space-y-4">
      {/* Search */}
      <div>
        <input
          type="text"
          placeholder="🔍 Search data..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          className={`w-full px-3 py-2 rounded-lg border-2 transition focus:outline-none focus:ring-2 focus:ring-green-500 text-sm ${
            theme === 'dark'
              ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400'
              : 'bg-white border-slate-300 text-slate-900 placeholder-slate-500'
          }`}
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border" style={{
        borderColor: theme === 'dark' ? '#475569' : '#e2e8f0'
      }}>
        <table className={`w-full text-sm border-collapse ${
          theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
        }`}>
          <thead>
            <tr className={theme === 'dark' ? 'bg-slate-700' : 'bg-slate-100'}>
              <th className={`text-left p-3 font-bold ${
                theme === 'dark' ? 'border-slate-600' : 'border-slate-200'
              }`}>
                Field
              </th>
              <th className={`text-left p-3 font-bold ${
                theme === 'dark' ? 'border-slate-600' : 'border-slate-200'
              }`}>
                Value
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedEntries.map(([key, value]) => (
              <tr
                key={key}
                className={`border-b transition ${
                  theme === 'dark'
                    ? 'border-slate-700 hover:bg-slate-700'
                    : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                <td className="p-3 font-semibold">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </td>
                <td className="p-3 text-green-500 font-medium">
                  {formatValue(value, key)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-2">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition ${
              currentPage === 1
                ? 'opacity-50 cursor-not-allowed'
                : ''
            } ${
              theme === 'dark'
                ? 'bg-slate-700 hover:bg-slate-600'
                : 'bg-slate-200 hover:bg-slate-300'
            }`}
          >
            ← Prev
          </button>
          <span className={`text-sm font-semibold px-3 ${
            theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
          }`}>
            {currentPage} / {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition ${
              currentPage === totalPages
                ? 'opacity-50 cursor-not-allowed'
                : ''
            } ${
              theme === 'dark'
                ? 'bg-slate-700 hover:bg-slate-600'
                : 'bg-slate-200 hover:bg-slate-300'
            }`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
