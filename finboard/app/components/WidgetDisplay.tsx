'use client';

import React from 'react';
import { Widget } from '@/app/store/dashboardSlice';
import { getNestedValue } from '@/app/utils/api';
import CardDisplay from './displays/CardDisplay';
import TableDisplay from './displays/TableDisplay';
import ChartDisplay from './displays/ChartDisplay';

interface WidgetDisplayProps {
  widget: Widget;
  theme: 'light' | 'dark';
}

export default function WidgetDisplay({ widget, theme }: WidgetDisplayProps) {
  if (widget.loading) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="relative w-16 h-16 mb-6">
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-green-500 border-r-green-500 animate-spin"></div>
          <div className="absolute inset-2 rounded-full border-4 border-transparent border-b-emerald-500 animate-spin" style={{animationDirection: 'reverse'}}></div>
        </div>
        <p className={`text-sm font-bold ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
          Loading data...
        </p>
        <p className={`text-xs mt-2 animate-pulse ${theme === 'dark' ? 'text-slate-500' : 'text-slate-500'}`}>
          Fetching from API
        </p>
      </div>
    );
  }

  if (widget.error) {
    return (
      <div className={`p-5 rounded-xl text-sm border-2 ${
        theme === 'dark'
          ? 'bg-red-900 bg-opacity-20 border-red-700 text-red-300'
          : 'bg-red-100 border-red-400 text-red-700'
      }`}>
        <p className="font-bold mb-2">⚠️ Error Loading Data</p>
        <p className="text-xs leading-relaxed break-words">{widget.error}</p>
      </div>
    );
  }

  if (!widget.data) {
    return (
      <div className={`p-8 rounded-xl text-center text-sm ${
        theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
      }`}>
        📭 No data available
      </div>
    );
  }

  // Get values for selected fields
  const displayData = widget.selectedFields.reduce((acc, field) => {
    if (widget.data) {
      acc[field] = getNestedValue(widget.data, field);
    }
    return acc;
  }, {} as Record<string, any>);

  switch (widget.displayMode) {
    case 'card':
      return <CardDisplay data={displayData} theme={theme} />;
    case 'table':
      return <TableDisplay data={displayData} theme={theme} />;
    case 'chart':
      return <ChartDisplay data={displayData} theme={theme} />;
    default:
      return <CardDisplay data={displayData} theme={theme} />;
  }
}
