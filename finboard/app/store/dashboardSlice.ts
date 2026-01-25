import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Widget {
  id: string;
  name: string;
  apiUrl: string;
  refreshInterval: number;
  displayMode: 'card' | 'table' | 'chart';
  selectedFields: string[];
  data: Record<string, any> | null;
  loading: boolean;
  error: string | null;
  position: number;
}

export interface DashboardState {
  widgets: Widget[];
  theme: 'light' | 'dark';
}

const initialState: DashboardState = {
  widgets: [],
  theme: 'dark',
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    addWidget: (state, action: PayloadAction<Widget>) => {
      state.widgets.push(action.payload);
    },
    removeWidget: (state, action: PayloadAction<string>) => {
      state.widgets = state.widgets.filter(w => w.id !== action.payload);
    },
    updateWidget: (state, action: PayloadAction<Widget>) => {
      const index = state.widgets.findIndex(w => w.id === action.payload.id);
      if (index !== -1) {
        state.widgets[index] = action.payload;
      }
    },
    updateWidgetData: (state, action: PayloadAction<{ id: string; data: Record<string, any> }>) => {
      const widget = state.widgets.find(w => w.id === action.payload.id);
      if (widget) {
        widget.data = action.payload.data;
        widget.loading = false;
        widget.error = null;
      }
    },
    setWidgetLoading: (state, action: PayloadAction<string>) => {
      const widget = state.widgets.find(w => w.id === action.payload);
      if (widget) {
        widget.loading = true;
      }
    },
    setWidgetError: (state, action: PayloadAction<{ id: string; error: string }>) => {
      const widget = state.widgets.find(w => w.id === action.payload.id);
      if (widget) {
        widget.error = action.payload.error;
        widget.loading = false;
      }
    },
    reorderWidgets: (state, action: PayloadAction<Widget[]>) => {
      state.widgets = action.payload;
    },
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },
    loadDashboard: (_state, action: PayloadAction<DashboardState>) => {
      return action.payload;
    },
  },
});

export const {
  addWidget,
  removeWidget,
  updateWidget,
  updateWidgetData,
  setWidgetLoading,
  setWidgetError,
  reorderWidgets,
  toggleTheme,
  loadDashboard,
} = dashboardSlice.actions;

export default dashboardSlice.reducer;
