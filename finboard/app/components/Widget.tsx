'use client';

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeWidget, updateWidget } from '@/app/store/dashboardSlice';
import { RootState, AppDispatch } from '@/app/store/store';
import { useWidgetData } from '@/app/hooks/useWidgetData';
import { Widget as WidgetType } from '@/app/store/dashboardSlice';
import WidgetDisplay from './WidgetDisplay';
import WidgetConfig from './WidgetConfig';
import WidgetModal from './WidgetModal';

interface WidgetProps {
  widget: WidgetType;
}

export default function Widget({ widget }: WidgetProps) {
  const dispatch = useDispatch<AppDispatch>();
  const theme = useSelector((state: RootState) => state.dashboard.theme);
  const [showConfig, setShowConfig] = React.useState(false);
  const [showModal, setShowModal] = React.useState(false);

  // Use the custom hook to fetch data
  useWidgetData(widget.id, widget.apiUrl, widget.refreshInterval);

  const handleRemove = () => {
    if (confirm(`Remove widget "${widget.name}"?`)) {
      dispatch(removeWidget(widget.id));
    }
  };

  const handleUpdateWidget = (updates: Partial<WidgetType>) => {
    dispatch(updateWidget({ ...widget, ...updates }));
    setShowConfig(false);
  };

  return (
    <>
      <div 
        className={`group rounded-3xl overflow-hidden transition-all duration-400 animate-fade-in-scale cursor-pointer ${
          theme === 'dark'
            ? 'bg-gradient-to-br from-slate-900/40 to-slate-950/60 border-2 border-cyan-500/40 hover:border-cyan-400/80 shadow-2xl hover:shadow-cyan-500/30 hover:shadow-2xl'
            : 'bg-gradient-to-br from-white/70 to-slate-50/70 border-2 border-slate-200/50 hover:border-cyan-500/50 shadow-xl hover:shadow-cyan-500/20'
        } transform hover:scale-[1.03] hover:-translate-y-2`}>
        {/* Header */}
        <div className={`flex items-center justify-between p-6 border-b backdrop-blur-sm ${
          theme === 'dark' ? 'border-slate-700/50 bg-slate-800/40' : 'border-slate-200/50 bg-white/40'
        }`}>
          <div className="flex-1 cursor-pointer" onClick={() => setShowModal(true)}>
            <h3 className="font-black text-lg tracking-tight group-hover:text-cyan-400 transition duration-300">{widget.name}</h3>
            <p className={`text-sm font-bold mt-1 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
              🔄 {widget.refreshInterval}s refresh
            </p>
          </div>
          <div 
            className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-x-2 group-hover:translate-x-0"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowConfig(true);
              }}
              className={`btn-premium p-3 rounded-xl font-semibold transition ${
                theme === 'dark' 
                  ? 'bg-blue-500/30 hover:bg-blue-500/50 text-blue-400' 
                  : 'bg-blue-100/50 hover:bg-blue-200/50 text-blue-600'
              }`}
              title="Configure"
            >
              ⚙️
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleRemove();
              }}
              className={`btn-premium p-3 rounded-xl font-semibold text-red-500 transition ${
                theme === 'dark' 
                  ? 'bg-red-500/20 hover:bg-red-500/40' 
                  : 'bg-red-100/50 hover:bg-red-200/50'
              }`}
              title="Remove"
            >
              🗑️
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-7 min-h-[220px] cursor-pointer" onClick={() => setShowModal(true)}>
          <WidgetDisplay widget={widget} theme={theme} />
        </div>

        {/* Config Modal */}
        {showConfig && (
          <WidgetConfig
            widget={widget}
            onClose={() => setShowConfig(false)}
            onUpdate={handleUpdateWidget}
            theme={theme}
          />
        )}
      </div>

      {/* Widget View Modal */}
      {showModal && (
        <WidgetModal
          widget={widget}
          onClose={() => setShowModal(false)}
          theme={theme}
        />
      )}
    </>
  );
}
