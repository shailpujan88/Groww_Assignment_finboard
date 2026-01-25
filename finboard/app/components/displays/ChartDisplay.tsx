'use client';

import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface ChartDisplayProps {
  data: Record<string, any>;
  theme: 'light' | 'dark';
}

export default function ChartDisplay({ data, theme }: ChartDisplayProps) {
  // Convert data to chart-friendly format
  const entries = Object.entries(data);
  const chartData = entries.map(([key, value]) => ({
    name: key.length > 15 ? key.substring(0, 12) + '...' : key,
    value: typeof value === 'number' ? value : 0,
    fullName: key,
  }));

  if (chartData.length === 0) {
    return (
      <div className={`text-center text-sm py-12 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
        <div className="text-3xl mb-2">📊</div>
        <p className="font-semibold">No numeric data to display</p>
      </div>
    );
  }

  const hasNumericData = chartData.some(item => item.value !== 0);

  if (!hasNumericData) {
    return (
      <div className={`text-center text-sm py-12 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
        <div className="text-3xl mb-2">📭</div>
        <p className="font-semibold">No numeric data available</p>
      </div>
    );
  }

  return (
    <div className="w-full h-80 rounded-2xl overflow-hidden border-2 transition" style={{
      backgroundColor: theme === 'dark' ? '#0f172a' : '#ffffff',
      borderColor: theme === 'dark' ? 'rgba(6, 182, 212, 0.5)' : 'rgba(6, 182, 212, 0.3)',
      boxShadow: theme === 'dark' ? '0 0 20px rgba(6, 182, 212, 0.3), inset 0 0 20px rgba(6, 182, 212, 0.05)' : 'none'
    }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={{ top: 20, right: 20, left: 0, bottom: 60 }}
        >
          <defs>
            <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity={1} />
              <stop offset="100%" stopColor="#0d9488" stopOpacity={1} />
            </linearGradient>
          </defs>
          <CartesianGrid 
            stroke={theme === 'dark' ? '#334155' : '#e2e8f0'} 
            strokeDasharray="5 5"
          />
          <XAxis
            dataKey="name"
            stroke={theme === 'dark' ? '#94a3b8' : '#64748b'}
            style={{ fontSize: '12px', fontWeight: 'bold' }}
            angle={-45}
            textAnchor="end"
            height={100}
          />
          <YAxis stroke={theme === 'dark' ? '#94a3b8' : '#64748b'} style={{ fontSize: '12px' }} />
          <Tooltip
            contentStyle={{
              backgroundColor: theme === 'dark' ? '#1e293b' : '#ffffff',
              border: `2px solid #06b6d4`,
              borderRadius: '12px',
              color: theme === 'dark' ? '#e2e8f0' : '#1e293b',
              boxShadow: '0 10px 25px rgba(6, 182, 212, 0.3)'
            }}
            labelStyle={{
              color: theme === 'dark' ? '#e2e8f0' : '#1e293b',
              fontWeight: 'bold'
            }}
            formatter={(value: any) => [
              typeof value === 'number' ? value.toFixed(2) : value,
              'Value'
            ]}
          />
          <Bar 
            dataKey="value" 
            fill="url(#barGradient)" 
            radius={[12, 12, 0, 0]}
            animationDuration={1000}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
