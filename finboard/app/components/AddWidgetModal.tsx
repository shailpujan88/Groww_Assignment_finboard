'use client';

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addWidget } from '@/app/store/dashboardSlice';
import { fetchApiData, validateApiUrl, extractFieldsFromResponse } from '@/app/utils/api';
import { RootState, AppDispatch, store } from '@/app/store/store';
import { saveToLocalStorage } from '@/app/utils/storage';
import FieldSelector from './FieldSelector';

interface AddWidgetModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme: 'light' | 'dark';
}

export default function AddWidgetModal({ isOpen, onClose, theme }: AddWidgetModalProps) {
  const dispatch = useDispatch<AppDispatch>();
  const widgets = useSelector((state: RootState) => state.dashboard.widgets);
  const [widgetName, setWidgetName] = useState('');
  const [apiUrl, setApiUrl] = useState('');
  const [refreshInterval, setRefreshInterval] = useState('30');
  const [displayMode, setDisplayMode] = useState<'card' | 'table' | 'chart'>('card');
  const [selectedFields, setSelectedFields] = useState<string[]>([]);
  const [availableFields, setAvailableFields] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState<'basic' | 'fields'>('basic');
  const [apiResponse, setApiResponse] = useState<Record<string, any> | null>(null);

  const handleTestApi = async () => {
    setError(null);
    setLoading(true);

    if (!apiUrl.trim()) {
      setError('Please enter an API URL');
      setLoading(false);
      return;
    }

    if (!validateApiUrl(apiUrl)) {
      setError('Invalid URL format');
      setLoading(false);
      return;
    }

    try {
      const data = await fetchApiData(apiUrl);
      setApiResponse(data);
      const fields = extractFieldsFromResponse(data);
      setAvailableFields(fields);
      setSelectedFields(fields.slice(0, 5)); // Select first 5 fields by default
      setStep('fields');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch API data';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleAddWidget = () => {
    setError(null);

    if (!widgetName.trim()) {
      setError('Widget name is required');
      return;
    }

    if (!apiUrl.trim()) {
      setError('API URL is required');
      return;
    }

    if (selectedFields.length === 0) {
      setError('Please select at least one field to display');
      return;
    }

    const newWidget = {
      id: `widget-${Date.now()}`,
      name: widgetName.trim(),
      apiUrl: apiUrl.trim(),
      refreshInterval: Math.max(1, parseInt(refreshInterval) || 30),
      displayMode,
      selectedFields,
      data: apiResponse,
      loading: false,
      error: null,
      position: widgets.length,
    };

    dispatch(addWidget(newWidget));
    handleClose();
  };

  const handleClose = () => {
    setWidgetName('');
    setApiUrl('');
    setRefreshInterval('30');
    setDisplayMode('card');
    setSelectedFields([]);
    setAvailableFields([]);
    setError(null);
    setStep('basic');
    setApiResponse(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-lg flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className={`rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border-2 ${
        theme === 'dark' ? 'bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700' : 'bg-gradient-to-br from-white to-slate-50 border-slate-200'
      }`}>
        {/* Header */}
        <div className={`sticky top-0 flex items-center justify-between p-8 border-b backdrop-blur-sm ${
          theme === 'dark' ? 'border-slate-700 bg-slate-900/80' : 'border-slate-200 bg-white/80'
        }`}>
          <div>
            <h2 className="text-3xl font-black">
              {step === 'basic' ? '✨ Add New Widget' : '🎯 Select Fields'}
            </h2>
            <p className={`text-sm font-semibold mt-1 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
              {step === 'basic' 
                ? 'Connect to any financial API and monitor data'
                : 'Choose which data to display in your widget'}
            </p>
          </div>
          <button
            onClick={handleClose}
            className={`p-2 hover:opacity-75 transition text-2xl transform hover:scale-110 rounded-lg ${
              theme === 'dark' ? 'hover:bg-slate-700' : 'hover:bg-slate-200'
            }`}
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-8 space-y-6">
          {step === 'basic' ? (
            <>
              <div className="animate-slide-in-left">
                <label className={`block text-sm font-black mb-3 tracking-wider ${
                  theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                }`}>
                  📝 WIDGET NAME
                </label>
                <input
                  type="text"
                  value={widgetName}
                  onChange={(e) => setWidgetName(e.target.value)}
                  placeholder="e.g., Bitcoin Price Tracker"
                  className={`w-full px-5 py-3 rounded-xl border-2 transition focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                    theme === 'dark'
                      ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400'
                      : 'bg-white border-slate-300 text-slate-900 placeholder-slate-500'
                  }`}
                />
              </div>

              <div className="animate-slide-in-left" style={{ animationDelay: '50ms' }}>
                <label className={`block text-sm font-black mb-3 tracking-wider ${
                  theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                }`}>
                  🔗 API URL
                </label>
                <input
                  type="text"
                  value={apiUrl}
                  onChange={(e) => setApiUrl(e.target.value)}
                  placeholder="e.g., https://api.example.com/data"
                  className={`w-full px-5 py-3 rounded-xl border-2 transition focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                    theme === 'dark'
                      ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400'
                      : 'bg-white border-slate-300 text-slate-900 placeholder-slate-500'
                  }`}
                />
              </div>

              <div className="animate-slide-in-left" style={{ animationDelay: '100ms' }}>
                <label className={`block text-sm font-black mb-3 tracking-wider ${
                  theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                }`}>
                  ⏱️ REFRESH INTERVAL (SECONDS)</label>
                <input
                  type="number"
                  value={refreshInterval}
                  onChange={(e) => setRefreshInterval(e.target.value)}
                  min="1"
                  max="3600"
                  className={`w-full px-5 py-3 rounded-xl border-2 transition focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                    theme === 'dark'
                      ? 'bg-slate-700 border-slate-600 text-white'
                      : 'bg-white border-slate-300 text-slate-900'
                  }`}
                />
              </div>

              {error && (
                <div className={`border-2 rounded-xl p-4 text-sm font-semibold animate-slide-in-left ${
                  theme === 'dark' 
                    ? 'bg-red-900/20 border-red-700 text-red-300' 
                    : 'bg-red-100 border-red-400 text-red-700'
                }`}>
                  ⚠️ {error}
                </div>
              )}

              <button
                onClick={handleTestApi}
                disabled={loading}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 disabled:from-slate-500 disabled:to-slate-600 text-white px-6 py-3 rounded-xl font-bold transition transform hover:scale-105 active:scale-95 text-lg"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="animate-spin">⏳</span> Testing API...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <span>✓</span> Test API Connection
                  </span>
                )}
              </button>
            </>
          ) : (
            <>
              <div className="animate-scale-in">
                <label className={`block text-sm font-black mb-3 tracking-wider ${
                  theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                }`}>
                  📊 DISPLAY MODE
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {(['card', 'table', 'chart'] as const).map((mode) => (
                    <button
                      key={mode}
                      onClick={() => setDisplayMode(mode)}
                      className={`px-4 py-3 rounded-xl font-bold transition transform hover:scale-105 active:scale-95 ${
                        displayMode === mode
                          ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg'
                          : theme === 'dark'
                          ? 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                          : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                      }`}
                    >
                      <div className="text-2xl mb-1">
                        {mode === 'card' && '📇'}
                        {mode === 'table' && '📋'}
                        {mode === 'chart' && '📈'}
                      </div>
                      <div className="text-xs capitalize font-bold">{mode}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="animate-scale-in" style={{ animationDelay: '100ms' }}>
                <label className={`block text-sm font-black mb-3 tracking-wider ${
                  theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                }`}>
                  🎯 SELECT FIELDS TO DISPLAY
                </label>
                <FieldSelector
                  fields={availableFields}
                  selectedFields={selectedFields}
                  onChange={setSelectedFields}
                  theme={theme}
                />
              </div>

              {error && (
                <div className={`border-2 rounded-xl p-4 text-sm font-semibold animate-slide-in-left ${
                  theme === 'dark' 
                    ? 'bg-red-900/20 border-red-700 text-red-300' 
                    : 'bg-red-100 border-red-400 text-red-700'
                }`}>
                  ⚠️ {error}
                </div>
              )}

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setStep('basic')}
                  className={`flex-1 px-6 py-3 rounded-xl font-bold transition transform hover:scale-105 active:scale-95 ${
                    theme === 'dark'
                      ? 'bg-slate-700 hover:bg-slate-600 text-white'
                      : 'bg-slate-200 hover:bg-slate-300 text-slate-900'
                  }`}
                >
                  ← Back
                </button>
                <button
                  onClick={handleAddWidget}
                  className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-6 py-3 rounded-xl font-bold transition transform hover:scale-105 active:scale-95 shadow-lg text-lg"
                >
                  <span className="flex items-center justify-center gap-2">
                    <span>✨</span> Add Widget
                  </span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
