'use client';

import React from 'react';

interface FieldSelectorProps {
  fields: string[];
  selectedFields: string[];
  onChange: (fields: string[]) => void;
  theme: 'light' | 'dark';
}

export default function FieldSelector({
  fields,
  selectedFields,
  onChange,
  theme,
}: FieldSelectorProps) {
  const handleToggleField = (field: string) => {
    const updated = selectedFields.includes(field)
      ? selectedFields.filter(f => f !== field)
      : [...selectedFields, field];
    onChange(updated);
  };

  const handleSelectAll = () => {
    onChange(selectedFields.length === fields.length ? [] : fields);
  };

  return (
    <div className={`rounded-lg border p-4 ${
      theme === 'dark' ? 'border-slate-600 bg-slate-700' : 'border-slate-300 bg-slate-50'
    }`}>
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-semibold">Available Fields</span>
        <button
          onClick={handleSelectAll}
          className="text-xs px-2 py-1 rounded bg-green-500 hover:bg-green-600 text-white transition"
        >
          {selectedFields.length === fields.length ? 'Clear' : 'Select All'}
        </button>
      </div>

      <div className="max-h-48 overflow-y-auto space-y-2">
        {fields.length === 0 ? (
          <p className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
            No fields available
          </p>
        ) : (
          fields.map((field) => (
            <label key={field} className="flex items-center gap-2 cursor-pointer hover:opacity-75 transition min-w-0">
              <input
                type="checkbox"
                checked={selectedFields.includes(field)}
                onChange={() => handleToggleField(field)}
                className="w-4 h-4 rounded accent-green-500 shrink-0"
              />
              <span className={`text-sm truncate ${
                theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
              }`} title={field}>
                {field}
              </span>
            </label>
          ))
        )}
      </div>

      <div className={`text-xs mt-2 p-2 rounded ${
        theme === 'dark' ? 'bg-slate-600 text-slate-300' : 'bg-slate-200 text-slate-700'
      }`}>
        {selectedFields.length} / {fields.length} fields selected
      </div>
    </div>
  );
}
