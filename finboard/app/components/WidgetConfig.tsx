'use client';

import React, { useState } from 'react';
import { Widget } from '@/app/store/dashboardSlice';
import FieldSelector from './FieldSelector';
import { extractFieldsFromResponse } from '@/app/utils/api';

interface WidgetConfigProps {
  widget: Widget;
  onClose: () => void;
  onUpdate: (updates: Partial<Widget>) => void;
  theme: 'light' | 'dark';
}

export default function WidgetConfig({
  widget,
  onClose,
  onUpdate,
  theme,
}: WidgetConfigProps) {
  const [widgetName, setWidgetName] = useState(widget.name);
  const [refreshInterval, setRefreshInterval] = useState(String(widget.refreshInterval));
  const [displayMode, setDisplayMode] = useState(widget.displayMode);
  const [selectedFields, setSelectedFields] = useState(widget.selectedFields);

  const availableFields = widget.data ? extractFieldsFromResponse(widget.data) : [];

  const handleSave = () => {
    onUpdate({
      name: widgetName,
      refreshInterval: Math.max(1, parseInt(refreshInterval) || 30),
      displayMode,
      selectedFields,
    });
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[9999] p-4 animate-fade-in">
      <div className={`rounded-3xl shadow-2xl max-w-2xl w-full h-[85vh] flex flex-col border-2 transform animate-scale-up ${
        theme === 'dark' 
          ? 'bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 border-cyan-500/30' 
          : 'bg-gradient-to-br from-white via-slate-50 to-white border-cyan-400/30'
      }`}>
        {/* Header - Fixed */}
        <div className={`flex items-center justify-between p-8 border-b backdrop-blur-sm shrink-0 ${
          theme === 'dark' ? 'border-slate-700/50 bg-slate-900/95' : 'border-slate-200 bg-white/95'
        }`}>
          <h2 className={`text-2xl font-black ${theme === 'dark' ? 'text-cyan-400' : 'text-cyan-600'}`}>
            ⚙️ Configure Widget
          </h2>
          <button
            onClick={onClose}
            className={`p-2 rounded-lg hover:opacity-75 transition ${
              theme === 'dark' ? 'hover:bg-slate-700 text-slate-300' : 'hover:bg-slate-200 text-slate-700'
            }`}
            title="Close"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Scrollable Content - Middle */}
        <div className="flex-1 overflow-y-auto p-8 space-y-6">
          <div>
            <label className={`block text-sm font-black mb-3 uppercase tracking-wide ${
              theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
            }`}>
              📝 Widget Name
            </label>
            <input
              type="text"
              value={widgetName}
              onChange={(e) => setWidgetName(e.target.value)}
              className={`w-full px-4 py-3 rounded-xl border-2 transition focus:outline-none focus:ring-2 focus:ring-cyan-500 ${
                theme === 'dark'
                  ? 'bg-slate-700/50 border-slate-600 text-white placeholder-slate-400'
                  : 'bg-white border-slate-300 text-slate-900 placeholder-slate-500'
              }`}
              placeholder="e.g., Bitcoin Price"
            />
          </div>

          <div>
            <label className={`block text-sm font-black mb-3 uppercase tracking-wide ${
              theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
            }`}>
              🔄 Refresh Interval (seconds)
            </label>
            <input
              type="number"
              value={refreshInterval}
              onChange={(e) => setRefreshInterval(e.target.value)}
              min="1"
              max="3600"
              className={`w-full px-4 py-3 rounded-xl border-2 transition focus:outline-none focus:ring-2 focus:ring-cyan-500 ${
                theme === 'dark'
                  ? 'bg-slate-700/50 border-slate-600 text-white'
                  : 'bg-white border-slate-300 text-slate-900'
              }`}
            />
            <p className={`text-xs mt-2 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
              How often to fetch data from the API (1-3600 seconds)
            </p>
          </div>

          <div>
            <label className={`block text-sm font-black mb-3 uppercase tracking-wide ${
              theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
            }`}>
              📊 Display Mode
            </label>
            <div className="flex gap-3 flex-wrap">
              {(['card', 'table', 'chart'] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setDisplayMode(mode)}
                  className={`px-6 py-3 rounded-xl font-bold transition transform hover:scale-105 capitalize flex items-center gap-2 ${
                    displayMode === mode
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/50'
                      : theme === 'dark'
                      ? 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                      : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                  }`}
                >
                  {mode === 'card' && '📇'}
                  {mode === 'table' && '📋'}
                  {mode === 'chart' && '📈'}
                  <span className="text-sm">{mode}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className={`block text-sm font-black mb-3 uppercase tracking-wide ${
              theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
            }`}>
              ✓ Select Fields to Display
            </label>
            <FieldSelector
              fields={availableFields}
              selectedFields={selectedFields}
              onChange={setSelectedFields}
              theme={theme}
            />
          </div>
        </div>

        {/* Fixed Footer - Always Visible */}
        <div className={`flex gap-4 p-8 border-t-2 backdrop-blur-sm shrink-0 ${
          theme === 'dark'
            ? 'border-slate-700/50 bg-slate-900/95'
            : 'border-slate-200 bg-white/95'
        }`}>
          <button
            onClick={onClose}
            className={`flex-1 px-6 py-3 rounded-xl font-bold transition ${
              theme === 'dark'
                ? 'bg-slate-700 hover:bg-slate-600 text-white'
                : 'bg-slate-200 hover:bg-slate-300 text-slate-900'
            }`}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-6 py-3 rounded-xl font-bold transition shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            ✓ Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
