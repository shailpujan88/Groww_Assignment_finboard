// Format currency values
export const formatCurrency = (value: number, currency = 'USD'): string => {
  if (typeof value !== 'number') return String(value);
  
  try {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  } catch {
    return `$${value.toFixed(2)}`;
  }
};

// Format percentage values
export const formatPercentage = (value: number): string => {
  if (typeof value !== 'number') return String(value);
  return `${(value).toFixed(2)}%`;
};

// Format large numbers with K, M, B suffix
export const formatNumber = (value: number): string => {
  if (typeof value !== 'number') return String(value);
  
  if (value >= 1_000_000_000) {
    return (value / 1_000_000_000).toFixed(2) + 'B';
  }
  if (value >= 1_000_000) {
    return (value / 1_000_000).toFixed(2) + 'M';
  }
  if (value >= 1_000) {
    return (value / 1_000).toFixed(2) + 'K';
  }
  return value.toFixed(2);
};

// Format date
export const formatDate = (date: Date | string, format = 'short'): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  
  if (isNaN(d.getTime())) return String(date);
  
  if (format === 'short') {
    return d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  }
  
  if (format === 'long') {
    return d.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  }
  
  return d.toISOString();
};

// Format time
export const formatTime = (date: Date | string): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  
  if (isNaN(d.getTime())) return String(date);
  
  return d.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
};

// Auto-detect format based on value
export const formatValue = (value: any, fieldName = ''): string => {
  if (value === null || value === undefined) {
    return '-';
  }

  if (typeof value === 'boolean') {
    return value ? 'Yes' : 'No';
  }

  if (typeof value === 'number') {
    // Check field name for hints
    const lowerName = fieldName.toLowerCase();
    
    if (lowerName.includes('percent') || lowerName.includes('rate') || lowerName.includes('yield')) {
      return formatPercentage(value);
    }
    
    if (lowerName.includes('price') || lowerName.includes('cost') || lowerName.includes('value') || lowerName.includes('amount')) {
      return formatCurrency(value);
    }
    
    if (lowerName.includes('volume') || lowerName.includes('count') || lowerName.includes('size')) {
      return formatNumber(value);
    }
    
    return value.toFixed(2);
  }

  if (value instanceof Date) {
    return formatDate(value);
  }

  if (typeof value === 'object') {
    if (Array.isArray(value)) {
      return `[${value.length} items]`;
    }
    return '[Object]';
  }

  return String(value);
};
