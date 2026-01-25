# FinBoard - Customizable Finance Dashboard

A modern, responsive finance dashboard built with Next.js, React, Redux, and Recharts. Create custom widgets to monitor real-time financial data from various APIs.

## ✨ Features

### Core Features
- ✅ **Widget Management System** - Add, remove, and rearrange widgets with drag-and-drop
- ✅ **Multi-Display Modes** - Display data as Cards, Tables, or Charts
- ✅ **Real-time Data Updates** - Configurable refresh intervals for live data
- ✅ **API Integration** - Connect to any JSON-based REST API
- ✅ **Data Caching** - Intelligent caching to optimize API calls
- ✅ **Dark/Light Theme** - Toggle between dark and light modes
- ✅ **Data Persistence** - Dashboard state persists across sessions
- ✅ **Export/Import** - Backup and restore dashboard configurations
- ✅ **Responsive Design** - Works seamlessly on desktop, tablet, and mobile

### Advanced Features
- 🎨 **Dynamic Theme Switching** - Seamless light/dark mode toggle
- 📊 **Multiple Chart Types** - Line and bar charts with theme support
- 🔄 **API Proxy Route** - Handle CORS issues with built-in proxy
- 💾 **Local Storage Integration** - Automatic dashboard persistence
- 🎯 **Field Selection** - Interactive JSON explorer for choosing display fields
- 📱 **Responsive Grid Layout** - Adaptive columns based on screen size

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. **Clone or extract the project**
```bash
cd finboard
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env.local
```

4. **Start the development server**
```bash
npm run dev
```

5. **Open in browser**
```
http://localhost:3000
```

## 📖 Usage Guide

### Adding Your First Widget

1. Click **"+ Add Widget"** button in the header
2. Enter a widget name (e.g., "Bitcoin Price")
3. Paste your API URL (e.g., `https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd`)
4. Click **"✓ Test API"** to validate and fetch available fields
5. Select which fields to display
6. Choose a display mode (Card, Table, or Chart)
7. Click **"✓ Add Widget"**

### Supported APIs

#### Free APIs (No Key Required)
- **CoinGecko** - Cryptocurrency prices
  - URL: `https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd`
  
- **Open-Meteo** - Weather data
  - URL: `https://api.open-meteo.com/v1/forecast?latitude=40&longitude=-74&current=temperature`

#### APIs Requiring Keys
- **Finnhub** - Stock quotes (requires free API key from https://finnhub.io)
- **Alpha Vantage** - Stock data (requires free API key from https://www.alphavantage.co)
- **IEX Cloud** - Financial data (requires API key)

### Display Modes

#### 📇 Card Mode
Perfect for displaying key metrics. Shows fields as individual cards in a grid layout.
- Best for: Stock prices, currency values, single metrics
- Example: Bitcoin price, market cap, change percentage

#### 📋 Table Mode
Displays data in a paginated table with sortable columns.
- Best for: Multiple records, detailed data lists
- Example: Stock watchlist, currency pairs, market data

#### 📈 Chart Mode
Visualizes numeric data as bar or line charts.
- Best for: Trends, comparisons, time-series data
- Example: Price history, volume data, performance metrics

### Configuration

Each widget can be configured by clicking the ⚙️ icon:
- **Widget Name** - Edit the display name
- **Refresh Interval** - Set how often data updates (1-3600 seconds)
- **Display Mode** - Change between Card, Table, or Chart
- **Fields** - Select which fields to display

### Theme Management

- Click the 🌙 icon in the header to toggle between light and dark modes
- Your theme preference is saved automatically

### Dashboard Management

Use the ⚙️ Menu in the header for:
- **📥 Export Dashboard** - Download configuration as JSON
- **📤 Import Dashboard** - Load a previously exported configuration
- **🗑️ Clear All** - Reset the dashboard (cannot be undone)

## 🔧 API Integration Guide

### URL Format
Always use complete, absolute URLs:
```
✓ https://api.example.com/data
✗ /data
✗ api.example.com/data
```

### Testing APIs

**In Browser Console:**
```javascript
fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd')
  .then(r => r.json())
  .then(d => console.log(d))
```

**Using FinBoard:**
1. Click "+ Add Widget"
2. Enter API URL
3. Click "✓ Test API"
4. View response and select fields

### Common Patterns

**Simple Key-Value API:**
```json
{
  "symbol": "AAPL",
  "price": 150.25,
  "currency": "USD"
}
```
Fields: `symbol`, `price`, `currency`

**Nested API Response:**
```json
{
  "data": {
    "bitcoin": {
      "usd": 45000
    }
  }
}
```
Fields: `data.bitcoin.usd`

**Array API Response:**
```json
{
  "stocks": [
    { "symbol": "AAPL", "price": 150 },
    { "symbol": "GOOGL", "price": 140 }
  ]
}
```
Fields: `symbol`, `price`

## 📊 Example Workflows

### Crypto Dashboard
```
Widget 1: Bitcoin Price (Card mode)
- URL: https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd,eur
- Fields: bitcoin.usd, bitcoin.eur

Widget 2: Top Cryptocurrencies (Table mode)
- URL: https://api.coingecko.com/api/v3/simple/price?ids=ethereum,cardano,solana&vs_currencies=usd
- Refresh: 60 seconds

Widget 3: Bitcoin Price Trend (Chart mode)
- Custom data source
```

### Stock Portfolio Tracker
```
Widget 1: Apple Stock (Card mode)
- URL: https://finnhub.io/api/v1/quote?symbol=AAPL&token=YOUR_KEY
- Fields: c, h, l, o

Widget 2: Portfolio Summary (Table mode)
- Multiple widgets for each holding
```

## 🛠️ Technology Stack

- **Frontend Framework:** Next.js 14
- **UI Library:** React 18
- **State Management:** Redux Toolkit
- **Styling:** Tailwind CSS
- **Data Visualization:** Recharts
- **Drag-and-Drop:** React Beautiful DND
- **HTTP Client:** Axios
- **TypeScript:** Type-safe development

## 📁 Project Structure

```
finboard/
├── app/
│   ├── api/
│   │   └── proxy/
│   │       └── route.ts           # API proxy for CORS handling
│   ├── components/
│   │   ├── Dashboard.tsx          # Main dashboard component
│   │   ├── Header.tsx             # Header with controls
│   │   ├── Widget.tsx             # Widget container
│   │   ├── AddWidgetModal.tsx      # Add widget modal
│   │   ├── WidgetConfig.tsx        # Widget configuration
│   │   ├── WidgetDisplay.tsx       # Widget display manager
│   │   ├── FieldSelector.tsx       # Field selection UI
│   │   └── displays/
│   │       ├── CardDisplay.tsx     # Card view
│   │       ├── TableDisplay.tsx    # Table view
│   │       └── ChartDisplay.tsx    # Chart view
│   ├── hooks/
│   │   └── useWidgetData.ts        # Data fetching hook
│   ├── store/
│   │   ├── store.ts               # Redux store
│   │   └── dashboardSlice.ts       # Dashboard reducer
│   ├── utils/
│   │   ├── api.ts                 # API utilities
│   │   ├── cache.ts               # Caching logic
│   │   ├── formatters.ts          # Data formatting
│   │   └── storage.ts             # Local storage
│   ├── styles/
│   │   └── globals.css            # Global styles
│   ├── layout.tsx                 # Root layout
│   └── page.tsx                   # Home page
├── public/                         # Static files
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── next.config.js
```

## 🐛 Troubleshooting

### Issue: CORS Error
**Solution:** The app uses a proxy route at `/api/proxy` to handle CORS. Direct API calls are proxied automatically.

### Issue: API Rate Limit
**Solution:** 
- Increase the refresh interval
- Check your API's rate limits
- Consider upgrading to a paid tier
- Use caching (5-minute default)

### Issue: No Data Displays
**Solution:**
1. Check the API URL is correct
2. Verify the API returns valid JSON
3. Check browser console for error messages
4. Test the URL directly in your browser

### Issue: Widgets Not Persisting
**Solution:**
1. Check localStorage is enabled
2. Clear browser cache and try again
3. Check browser console for errors

## 🔐 API Key Management

**DO NOT hardcode API keys in the frontend!**

Options:
1. **Backend Proxy** (Recommended) - Create a backend route to handle API requests
2. **Environment Variables** - Store keys in `.env.local` (not shared in git)
3. **Authentication Service** - Use OAuth for user-specific data

Example with environment variable:
```typescript
// In .env.local
FINNHUB_API_KEY=your_key_here

// In your component
const apiKey = process.env.NEXT_PUBLIC_FINNHUB_API_KEY;
```

## 📈 Performance Tips

1. **Adjust Refresh Intervals** - Longer intervals reduce API calls
2. **Select Only Needed Fields** - Fewer fields = faster rendering
3. **Use Caching** - Enabled by default (5 minutes)
4. **Limit Widgets** - Start with 3-5 widgets for smooth performance
5. **Choose Appropriate Display Mode** - Cards are lightest, charts are heavier

## 🎨 Customization

### Adding Custom Display Modes
1. Create a new component in `app/components/displays/`
2. Import it in `WidgetDisplay.tsx`
3. Add case to display mode switch

### Modifying Theme Colors
Edit `app/styles/globals.css` and Tailwind configuration in `tailwind.config.js`

### Changing Cache Duration
Edit `CACHE_DURATION` in `app/utils/cache.ts` (default: 5 minutes)

## 📚 Additional Resources

- [API Integration Guide](./API_INTEGRATION_GUIDE.md)
- [Developer Guide](./DEVELOPER_GUIDE.md)
- [Next.js Documentation](https://nextjs.org/docs)
- [Redux Toolkit Guide](https://redux-toolkit.js.org/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

## 🚀 Deployment

### Deploy to Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Deploy to Netlify
```bash
npm run build
# Upload the .next folder to Netlify
```

### Deploy to AWS
```bash
npm run build
npm start
```

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 💡 Tips & Tricks

- **Keyboard Shortcuts:**
  - Drag widgets to rearrange
  - Click ⚙️ to configure
  - Click 🗑️ to delete

- **Best Practices:**
  - Test APIs in browser first
  - Use reasonable refresh intervals
  - Export dashboard configs regularly
  - Keep widget names descriptive

---

**Happy Dashboard Building! 📊✨**
