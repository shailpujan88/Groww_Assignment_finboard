# FinBoard - Customizable Real-Time Finance Dashboard

A stunning, modern finance dashboard application built with Next.js 14, Redux Toolkit, and Tailwind CSS. Create custom widgets by connecting to any financial API and monitor real-time data with an intuitive drag-and-drop interface.

## ✨ Highlights

### Visual Excellence
- **Beautiful Modern UI**: Sleek dark and light themes with smooth animations
- **Responsive Design**: Works perfectly on mobile, tablet, and desktop  
- **Animated Transitions**: Fade-in, slide, and scale animations for every interaction
- **Gradient Effects**: Modern gradient backgrounds and text effects
- **Interactive Feedback**: Hover effects, loading states, and smooth transitions

### 🌟 Core Features

#### Widget Management
- ✅ **Drag-and-Drop** - Reorganize widgets freely
- ✅ **Multiple Display Modes** - Cards, Tables, and Charts
- ✅ **Real-time Updates** - Configurable refresh intervals (1s - 1h)
- ✅ **Quick Add** - One-click widget creation modal

#### API Integration  
- ✅ **Any JSON API** - Connect to crypto, stock, finance APIs
- ✅ **Dynamic Fields** - Auto-detect and select data fields
- ✅ **Smart Caching** - 5-minute intelligent cache
- ✅ **Error Handling** - Graceful error messages

#### Data Visualization
- ✅ **Card View** - Animated grid cards with gradients
- ✅ **Table View** - Paginated data display
- ✅ **Chart View** - Beautiful bar charts
- ✅ **Responsive** - Mobile, tablet, and desktop optimized

#### Theme & Appearance
- ✅ **Dark/Light Mode** - Toggle instantly
- ✅ **Smooth Animations** - Every interaction feels polished
- ✅ **Professional Design** - Slate, green, and emerald colors
- ✅ **Loading States** - Skeleton loaders and spinners
- **Widget Management System**
  - Add, remove, and rearrange widgets with drag-and-drop
  - Three display modes: Card, Table, and Chart
  - Customizable widget names and refresh intervals
  - Real-time data updates with automatic polling

- **API Integration**
  - Support for any JSON API endpoint
  - Dynamic field extraction and selection
  - Intelligent API response caching (5-minute cache)
  - Rate limiting and error handling

- **Data Visualization**
  - Card view: Display multiple metrics in a grid
  - Table view: Paginated data display with 10 items per page
  - Chart view: Bar charts for numeric data visualization
  - Responsive design for all screen sizes

- **State Management**
  - Redux Toolkit for predictable state management
  - Browser LocalStorage for data persistence
  - Complete dashboard restoration on page refresh

- **User Experience**
  - Light and Dark theme toggle
  - Real-time loading and error states
  - Intuitive modal interfaces
  - Responsive grid layout

### Advanced Features
- **Data Persistence**
  - Auto-save dashboard configuration to LocalStorage
  - Export dashboard as JSON
  - Import previously saved dashboard configurations
  - Clear all widgets with confirmation

- **Data Formatting**
  - Auto-detect currency, percentage, and numeric formats
  - Human-readable large numbers (K, M, B)
  - Date and time formatting
  - Smart field value formatting

## 📋 Prerequisites

- Node.js 16.8 or later
- npm or yarn package manager

## 🚀 Installation

1. **Clone or extract the project**
```bash
cd finboard
```

2. **Install dependencies**
```bash
npm install
```

3. **Start the development server**
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## 🎯 Getting Started

### Adding Your First Widget

1. Click the **+ Add Widget** button
2. Enter a widget name (e.g., "Bitcoin Price")
3. Provide an API URL that returns JSON data
4. Set the refresh interval (in seconds)
5. Click **✓ Test API** to validate the endpoint
6. Select the fields you want to display
7. Choose a display mode (Card, Table, or Chart)
8. Click **✓ Add Widget**

### Example API URLs to Test

**Note:** Replace placeholders with actual API keys or use public APIs

- **Stock Data**: `https://api.example.com/stock/AAPL`
- **Cryptocurrency**: `https://api.coinbase.com/v2/exchange-rates?currency=BTC`
- **Market Data**: `https://api.example.com/market/summary`

### Recommended Free APIs

- **Finnhub** (Stocks): https://finnhub.io/api/v1/quote?symbol=AAPL&token=YOUR_KEY
- **CoinGecko** (Crypto): https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd
- **Alpha Vantage** (Stocks): https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=IBM&apikey=YOUR_KEY

## 🏗️ Project Structure

```
finboard/
├── app/
│   ├── api/                    # API route handlers
│   ├── components/             # React components
│   │   ├── displays/          # Display mode components
│   │   ├── Dashboard.tsx      # Main dashboard component
│   │   ├── Widget.tsx         # Individual widget component
│   │   ├── AddWidgetModal.tsx # Modal for adding widgets
│   │   ├── WidgetConfig.tsx   # Widget configuration modal
│   │   ├── Header.tsx         # Top navigation bar
│   │   └── FieldSelector.tsx  # Field selection UI
│   ├── hooks/                  # Custom React hooks
│   │   └── useWidgetData.ts   # Data fetching hook
│   ├── store/                  # Redux store
│   │   ├── store.ts           # Store configuration
│   │   └── dashboardSlice.ts  # Dashboard reducer
│   ├── utils/                  # Utility functions
│   │   ├── api.ts             # API utilities
│   │   ├── cache.ts           # Caching system
│   │   ├── formatters.ts      # Data formatters
│   │   └── storage.ts         # LocalStorage utilities
│   ├── styles/                 # Global styles
│   │   └── globals.css        # Tailwind configuration
│   ├── layout.tsx             # Root layout with Redux provider
│   └── page.tsx               # Home page
├── public/                     # Static assets
├── package.json               # Dependencies
├── tsconfig.json              # TypeScript configuration
├── tailwind.config.js         # Tailwind CSS configuration
└── next.config.js             # Next.js configuration
```

## 🛠️ Technology Stack

- **Frontend Framework**: Next.js 14
- **UI Framework**: React 18
- **Styling**: Tailwind CSS
- **State Management**: Redux Toolkit
- **Data Visualization**: Recharts
- **Drag & Drop**: react-beautiful-dnd
- **HTTP Client**: Axios
- **Language**: TypeScript

## 📱 Widget Display Modes

### Card Mode
- Displays data as a grid of cards
- Each field shows a metric with its value
- Best for dashboards with multiple metrics

### Table Mode
- Paginated table view (10 items per page)
- Easy to scan and compare values
- Search and filter ready for extension

### Chart Mode
- Bar charts for numeric data
- Visual representation of values
- Theme-aware colors

## 🎨 Theming

The application supports Light and Dark themes:
- Click the theme toggle button (☀️/🌙) in the header
- Theme preference is saved to LocalStorage
- All components adapt to the selected theme

## 💾 Data Persistence

### Auto-Save
- Dashboard configuration is automatically saved to browser's LocalStorage
- Saves whenever widgets are added, removed, or rearranged
- Restores on page refresh or browser restart

### Manual Export/Import
- **Export**: Use the menu (⚙️) → Export Dashboard to download JSON
- **Import**: Use the menu (⚙️) → Import Dashboard to restore from file

## ⚙️ API Integration Best Practices

### Rate Limiting
- The app caches API responses for 5 minutes
- Adjust refresh intervals based on your API's rate limits
- Most APIs have documented rate limit policies

### Error Handling
- Displays clear error messages if API requests fail
- Shows rate limit errors with helpful guidance
- Automatically retries failed requests on manual refresh

### Common API Error Solutions
- **CORS Issues**: Use an API that supports CORS or use a CORS proxy
- **Rate Limiting**: Increase refresh interval or cache duration
- **Invalid URL**: Ensure URL is absolute (includes http:// or https://)
- **Auth Failures**: Verify API key is valid and included in URL

## 🔒 Security Considerations

- **API Keys**: Never hardcode API keys in the app
- **localStorage**: Use only for non-sensitive data
- **CORS**: Only connect to trusted APIs
- **Validation**: Always validate API responses before display

## 🚀 Optimization Tips

1. **Reduce API Calls**: Increase refresh intervals for stable data
2. **Cache Management**: The app automatically caches for 5 minutes
3. **Performance**: Limit number of active widgets
4. **Browser Storage**: Export old dashboards to backup configs

## 📊 Example Widget Configurations

### Bitcoin Price Widget
- **Name**: Bitcoin Price
- **URL**: `https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd`
- **Display Mode**: Card
- **Refresh**: 60 seconds

### Stock Performance Widget
- **Name**: Stock Data
- **URL**: `https://finnhub.io/api/v1/quote?symbol=AAPL&token=YOUR_KEY`
- **Display Mode**: Table
- **Refresh**: 30 seconds

## 🐛 Troubleshooting

### Widgets Not Loading
1. Check browser console for errors (F12)
2. Verify API URL is correct and accessible
3. Ensure API response is valid JSON
4. Check if API rate limit has been exceeded

### Data Not Updating
- Verify refresh interval setting
- Check browser's network tab for API calls
- Ensure API is responding with data

### LocalStorage Not Working
- Check if browser allows LocalStorage (may be disabled)
- Clear browser cache and try again
- Try exporting/importing configuration as backup

## 📝 Development

### Building for Production
```bash
npm run build
npm start
```

### Linting
```bash
npm run lint
```

## 🎓 Learning Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Recharts](https://recharts.org/)

## 📄 License

This project is part of the GROW internship program assignment.

## 🤝 Support

For issues or questions:
1. Check the FAQ section
2. Review the troubleshooting guide
3. Check browser console for error messages
4. Verify API configuration

## ✨ Future Enhancements

- Real-time updates using WebSockets
- Dashboard templates
- Advanced filtering and search
- Custom chart types
- Widget-specific settings
- API request history
- Performance metrics

---

**Happy tracking! 📈**
