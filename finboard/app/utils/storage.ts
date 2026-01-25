const STORAGE_KEY = 'finboard-dashboard';

export interface StorageData {
  widgets: any[];
  theme: 'light' | 'dark';
  lastUpdated: number;
}

export const saveToLocalStorage = (data: any): void => {
  try {
    const storageData: StorageData = {
      widgets: data.widgets || [],
      theme: data.theme || 'dark',
      lastUpdated: Date.now(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(storageData));
  } catch (error) {
    console.error('Failed to save to localStorage:', error);
  }
};

export const loadFromLocalStorage = (): StorageData | null => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Failed to load from localStorage:', error);
    return null;
  }
};

export const clearLocalStorage = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear localStorage:', error);
  }
};

export const exportDashboard = (data: any): string => {
  return JSON.stringify(data, null, 2);
};

export const importDashboard = (jsonString: string): any => {
  try {
    return JSON.parse(jsonString);
  } catch (error) {
    throw new Error('Invalid dashboard configuration format');
  }
};

export const downloadDashboard = (data: any, filename = 'dashboard-config.json'): void => {
  const element = document.createElement('a');
  element.setAttribute('href', `data:text/plain;charset=utf-8,${encodeURIComponent(exportDashboard(data))}`);
  element.setAttribute('download', filename);
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
};
