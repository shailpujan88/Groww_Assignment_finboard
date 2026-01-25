# FinBoard Developer Documentation

## 🏗️ Architecture Overview

FinBoard follows a modern, scalable architecture with clear separation of concerns:

```
┌─────────────────────────────────────────┐
│         Next.js Frontend                │
│         (React + TypeScript)            │
└────────────────┬────────────────────────┘
                 │
    ┌────────────┼────────────┐
    │            │            │
    v            v            v
┌──────────┐ ┌──────────┐ ┌──────────┐
│ Redux    │ │ Custom   │ │ Utility  │
│ Store    │ │ Hooks    │ │ Functions│
└─────┬────┘ └────┬─────┘ └────┬─────┘
      │            │            │
      └────────────┼────────────┘
                   │
              ┌────v────┐
              │ Components
              │ (UI Layer)
              └────┬─────┘
                   │
         ┌─────────┼─────────┐
         │         │         │
         v         v         v
    ┌────────┐ ┌──────┐ ┌─────────┐
    │ Storage│ │ Cache│ │Browser  │
    └────────┘ └──────┘ └─────────┘
```

## 📁 File Organization

### State Management (`app/store/`)
- **dashboardSlice.ts**: Redux reducer with actions
- **store.ts**: Redux store configuration

### Components (`app/components/`)
- **Dashboard.tsx**: Main dashboard container
- **Widget.tsx**: Individual widget wrapper
- **AddWidgetModal.tsx**: Modal for creating widgets
- **WidgetConfig.tsx**: Widget configuration modal
- **WidgetDisplay.tsx**: Widget content router
- **Header.tsx**: Navigation and controls
- **FieldSelector.tsx**: Field selection UI
- **displays/**: Display mode components
  - CardDisplay.tsx
  - TableDisplay.tsx
  - ChartDisplay.tsx

### Utilities (`app/utils/`)
- **api.ts**: API fetching and data manipulation
- **cache.ts**: In-memory caching system
- **formatters.ts**: Data formatting utilities
- **storage.ts**: LocalStorage management

### Hooks (`app/hooks/`)
- **useWidgetData.ts**: Data fetching hook

### Styling (`app/styles/`)
- **globals.css**: Tailwind + global styles

## 🔄 Data Flow

### Adding a Widget
1. User clicks "+ Add Widget"
2. AddWidgetModal opens
3. User enters details (name, URL, refresh interval)
4. API is tested with `fetchApiData()`
5. Fields are extracted with `extractFieldsFromResponse()`
6. User selects fields and display mode
7. `addWidget()` action dispatches
8. Redux updates state
9. State saved to localStorage
10. Widget renders with data

### Data Updates
1. Widget mounts → `useWidgetData` hook activates
2. Initial `fetchApiData()` call
3. Response cached in memory
4. `updateWidgetData()` action dispatches
5. Redux state updates
6. Component re-renders
7. Interval timer starts for periodic refresh

### Theme Toggle
1. User clicks theme button
2. `toggleTheme()` action dispatches
3. State changes to opposite theme
4. All components observe theme change
5. CSS classes update
6. Tailwind CSS applies new styles
7. LocalStorage saves preference

## 💾 State Structure

```typescript
interface DashboardState {
  widgets: Widget[];
  theme: 'light' | 'dark';
}

interface Widget {
  id: string;                    // Unique identifier
  name: string;                  // User-defined name
  apiUrl: string;               // API endpoint
  refreshInterval: number;      // Seconds between updates
  displayMode: 'card'|'table'|'chart';
  selectedFields: string[];     // User-selected fields
  data: Record<string, any>;    // API response data
  loading: boolean;             // Loading state
  error: string | null;         // Error message
  position: number;             // Grid position
}
```

## 🎨 Component Patterns

### Functional Component with Hooks
```typescript
'use client';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/app/store/store';

export default function MyComponent() {
  const dispatch = useDispatch<AppDispatch>();
  const state = useSelector((state: RootState) => state.dashboard);
  
  // Component logic here
  return (/* JSX */);
}
```

### Custom Hook Pattern
```typescript
export const useWidgetData = (id: string, url: string, interval: number) => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    // Setup effect
    return () => {
      // Cleanup
    };
  }, [id, url, interval, dispatch]);

  return fetchFunction;
};
```

## 🧪 Testing Patterns

### Testing Components
```typescript
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '@/app/store/store';

test('renders widget', () => {
  render(
    <Provider store={store}>
      <Widget widget={mockWidget} />
    </Provider>
  );
  expect(screen.getByText(mockWidget.name)).toBeInTheDocument();
});
```

### Testing Redux Actions
```typescript
import dashboardReducer, { addWidget } from '@/app/store/dashboardSlice';

test('adds widget to state', () => {
  const initialState = { widgets: [], theme: 'dark' };
  const newWidget = { /* ... */ };
  
  const action = addWidget(newWidget);
  const newState = dashboardReducer(initialState, action);
  
  expect(newState.widgets).toHaveLength(1);
  expect(newState.widgets[0]).toEqual(newWidget);
});
```

## 📝 Code Quality Guidelines

### TypeScript Best Practices
```typescript
// ✓ Good: Explicit types
interface Props {
  data: Record<string, any>;
  theme: 'light' | 'dark';
  onUpdate: (config: WidgetConfig) => void;
}

// ✗ Avoid: Using 'any' without necessity
const handleData = (data: any) => { /* ... */ };
```

### Component Organization
```typescript
// ✓ Good: Clear component structure
export default function ComponentName() {
  // State and hooks
  const [state, setState] = useState();
  const dispatch = useDispatch();

  // Callbacks
  const handleAction = useCallback(() => {
    // logic
  }, [dependencies]);

  // Effects
  useEffect(() => {
    // side effects
  }, [dependencies]);

  // Render
  return (/* JSX */);
}
```

### Error Handling
```typescript
// ✓ Good: Comprehensive error handling
try {
  const data = await fetchApiData(url);
  dispatch(updateWidgetData({ id, data }));
} catch (error) {
  const message = error instanceof Error 
    ? error.message 
    : 'Unknown error';
  dispatch(setWidgetError({ id, error: message }));
}
```

## 🚀 Performance Optimization

### Code Splitting
Next.js automatically code-splits at the page level:
```typescript
// Components loaded on-demand
const Modal = dynamic(() => import('./Modal'));
```

### Memoization
```typescript
import { memo, useMemo, useCallback } from 'react';

// Prevent unnecessary re-renders
const Widget = memo(function Widget({ widget }: Props) {
  // Component code
});

// Memoize expensive computations
const formatted = useMemo(() => {
  return expensiveOperation(data);
}, [data]);

// Stable callback references
const handleClick = useCallback(() => {
  // logic
}, [dependencies]);
```

### API Caching
```typescript
// 5-minute cache automatically applied
const data = await fetchApiData(url, useCache = true);

// Manual cache management available
import { setInCache, getFromCache, clearCache } from '@/app/utils/cache';
```

## 🔐 Security Practices

### Never Commit Secrets
```bash
# ✗ Bad: Commit API key
const API_KEY = "sk_live_51234567890";

# ✓ Good: Use environment variables
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
```

### Validate User Input
```typescript
// Always validate before use
if (!validateApiUrl(url)) {
  throw new Error('Invalid URL format');
}
```

### Sanitize Dynamic Content
```typescript
// Be careful with user-provided field names
const safeFieldName = fieldName.replace(/[^a-zA-Z0-9_.]/g, '');
```

## 📊 Debugging Tips

### Enable Redux DevTools
1. Install Redux DevTools browser extension
2. Actions and state changes visible in browser DevTools

### Console Logging
```typescript
// Use console wisely
console.log('Widget data:', widget); // Development
console.error('API Error:', error);  // Errors
console.warn('Deprecated API');      // Warnings
```

### React DevTools
1. Install React DevTools browser extension
2. Inspect component tree and props
3. Track render performance

### Network Tab Debugging
1. Open DevTools → Network tab
2. Monitor API requests
3. Check response status and headers
4. View response payload

## 🔄 Git Workflow

### Commit Messages
```bash
# Good commit messages
git commit -m "feat: add theme toggle functionality"
git commit -m "fix: prevent widget data race condition"
git commit -m "docs: update API integration guide"
git commit -m "style: apply Tailwind CSS formatting"
```

### Branch Naming
```bash
# Feature branch
git checkout -b feature/widget-export

# Bug fix branch
git checkout -b fix/api-cache-issue

# Documentation
git checkout -b docs/setup-guide
```

## 📈 Scalability Considerations

### Current Architecture Handles:
- ✓ 100+ widgets on dashboard
- ✓ Real-time updates every 30 seconds
- ✓ 5-minute response caching
- ✓ LocalStorage persistence (~5MB limit)

### Future Improvements:
1. **Backend API**: Move data fetching server-side
2. **WebSockets**: Real-time data with socket.io
3. **Database**: Persist user configurations
4. **Authentication**: Multi-user support
5. **Pagination**: Handle large datasets
6. **Compression**: Optimize bundle size

## 🧪 Testing Setup

```bash
# Install testing libraries
npm install --save-dev jest @testing-library/react

# Create test file
touch app/components/__tests__/Widget.test.tsx

# Run tests
npm test
```

## 📚 Further Reading

- [Next.js Documentation](https://nextjs.org/docs)
- [Redux Toolkit Guide](https://redux-toolkit.js.org/usage/usage-guide)
- [React Best Practices](https://react.dev/learn)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

---

**Happy developing! 🚀**
