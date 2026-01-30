'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { downloadDashboard, clearLocalStorage } from '@/app/utils/storage';
import { RootState, AppDispatch } from '@/app/store/store';
import { loadDashboard } from '@/app/store/dashboardSlice';

interface HeaderProps {
  onAddWidget: () => void;
  onToggleTheme: () => void;
  theme: 'light' | 'dark';
  onClearDashboard?: () => void;
}

export default function Header({ onAddWidget, onToggleTheme, theme, onClearDashboard }: HeaderProps) {
  const dispatch = useDispatch<AppDispatch>();
  const dashboardState = useSelector((state: RootState) => state.dashboard);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuOpen]);

  const handleExport = () => {
    downloadDashboard(dashboardState, `finboard-${new Date().toISOString().split('T')[0]}.json`);
  };

  const handleImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e: any) => {
      const file = e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (event: any) => {
        try {
          const imported = JSON.parse(event.target.result);
          dispatch(loadDashboard({
            widgets: imported.widgets || [],
            theme: imported.theme || 'dark',
          }));
          alert('Dashboard imported successfully!');
        } catch (error) {
          alert('Failed to import dashboard. Please check the file format.');
        }
      };
      reader.readAsText(file);
    };
    input.click();
  };

  const handleClearAll = () => {
    if (confirm('Are you sure you want to clear all widgets and reset the dashboard?')) {
      dispatch(loadDashboard({
        widgets: [],
        theme: 'dark',
      }));
      clearLocalStorage();
    }
  };

  return (
    <header className={`border-b transition-colors shadow-xl sticky top-0 z-50 backdrop-blur-lg ${
      theme === 'dark'
        ? 'bg-gradient-to-r from-slate-950/95 via-blue-950/95 to-slate-950/95 border-cyan-500/30'
        : 'bg-gradient-to-r from-white/95 via-slate-50/95 to-white/95 border-cyan-500/20'
    }`}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Branding */}
          <div className="flex items-center gap-4 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-300 animate-glow"></div>
              <div className="relative px-3 py-2 rounded-xl bg-slate-800">
                <span className="text-2xl animate-float">📈</span>
              </div>
            </div>
            <div>
              <h1 className="text-3xl font-black bg-gradient-to-r from-cyan-400 to-teal-500 bg-clip-text text-transparent animate-gradient">
                FinBoard
              </h1>
              <p className={`text-xs font-semibold tracking-wider ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                Real-time Finance Dashboard
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            {dashboardState.widgets.length > 0 && (
              <button
                onClick={onClearDashboard}
                className="bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-500 hover:to-slate-600 text-white px-6 py-2.5 rounded-lg font-bold text-sm transition shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-2 active:scale-95"
                title="Back to Welcome"
              >
                <span>←</span> Back
              </button>
            )}
            <button
              onClick={onAddWidget}
              className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-6 py-2.5 rounded-lg font-bold text-sm transition shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-2 active:scale-95"
            >
              <span>✨</span> Add Widget
            </button>

            {/* Theme Toggle */}
            <div className={`flex items-center gap-2 px-3 py-2 rounded-lg transition ${
              theme === 'dark' ? 'bg-slate-700/70' : 'bg-slate-100'
            }`}>
              <button
                onClick={onToggleTheme}
                className="p-2 hover:opacity-75 transition text-lg transform hover:scale-110"
                title="Toggle theme"
              >
                {theme === 'dark' ? '☀️' : '🌙'}
              </button>
            </div>

            {/* Menu Dropdown - click to open/close */}
            <div className="relative" ref={menuRef}>
              <button
                type="button"
                onClick={() => setMenuOpen((prev) => !prev)}
                className={`px-4 py-2.5 rounded-lg font-semibold transition transform hover:scale-105 active:scale-95 ${
                  theme === 'dark'
                    ? 'bg-slate-700 hover:bg-slate-600'
                    : 'bg-slate-200 hover:bg-slate-300'
                } ${menuOpen ? 'ring-2 ring-cyan-500' : ''}`}
                aria-expanded={menuOpen}
                aria-haspopup="true"
              >
                ⚙️ Menu
              </button>
              {menuOpen && (
                <div
                  className={`absolute right-0 mt-2 w-56 rounded-lg shadow-2xl z-[100] py-1 ${
                    theme === 'dark' ? 'bg-slate-800 border border-slate-700' : 'bg-white border border-slate-200'
                  }`}
                  role="menu"
                >
                  <button
                    type="button"
                    role="menuitem"
                    onClick={() => {
                      handleExport();
                      setMenuOpen(false);
                    }}
                    className={`w-full text-left px-4 py-3 transition flex items-center gap-3 border-b font-semibold ${
                      theme === 'dark' ? 'hover:bg-slate-700 border-slate-700 text-slate-100' : 'hover:bg-slate-100 border-slate-200'
                    }`}
                  >
                    <span className="text-lg">📥</span> Export Dashboard
                  </button>
                  <button
                    type="button"
                    role="menuitem"
                    onClick={() => {
                      handleImport();
                      setMenuOpen(false);
                    }}
                    className={`w-full text-left px-4 py-3 transition flex items-center gap-3 border-b font-semibold ${
                      theme === 'dark' ? 'hover:bg-slate-700 border-slate-700 text-slate-100' : 'hover:bg-slate-100 border-slate-200'
                    }`}
                  >
                    <span className="text-lg">📤</span> Import Dashboard
                  </button>
                  <button
                    type="button"
                    role="menuitem"
                    onClick={() => {
                      handleClearAll();
                      setMenuOpen(false);
                    }}
                    className={`w-full text-left px-4 py-3 transition flex items-center gap-3 font-semibold ${
                      theme === 'dark'
                        ? 'hover:bg-red-900/50 text-red-400'
                        : 'hover:bg-red-100 text-red-600'
                    }`}
                  >
                    <span className="text-lg">🗑️</span> Clear All
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
