# FinBoard Installation & Setup Guide

## 📋 System Requirements

- **Node.js**: 16.8 or higher
- **npm**: 7.0 or higher (or yarn/pnpm)
- **Modern Browser**: Chrome, Firefox, Safari, or Edge (latest versions)
- **Operating System**: Windows, macOS, or Linux

## 🔧 Step-by-Step Installation

### Step 1: Navigate to Project Directory
```bash
cd "c:\Users\HP\Downloads\GROW ASSIGMNET WEB INTERN\finboard"
```

### Step 2: Install Dependencies
```bash
npm install
```

This will install all required packages listed in `package.json`:
- React & React DOM
- Next.js
- Redux & Redux Toolkit
- Tailwind CSS
- Recharts
- Axios
- react-beautiful-dnd

**Installation typically takes 2-5 minutes depending on internet speed.**

### Step 3: Start Development Server
```bash
npm run dev
```

Output will show:
```
▲ Next.js 14.0.0
- Local:        http://localhost:3000
```

### Step 4: Open in Browser
Navigate to: `http://localhost:3000`

## 🎯 First Run Checklist

- [ ] Application loads without errors
- [ ] Header displays "FinBoard" title
- [ ] Theme toggle button (☀️/🌙) is visible
- [ ] "Add Widget" button is functional
- [ ] Empty dashboard message appears
- [ ] Browser console shows no critical errors

## 📦 Available npm Scripts

```bash
# Start development server with hot-reload
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

## 🔑 Getting API Keys

### For Stock Data (Finnhub)
1. Visit: https://finnhub.io/api
2. Sign up for free account
3. Get API key from dashboard
4. Free tier: 60 API calls/minute

**Example URL:**
```
https://finnhub.io/api/v1/quote?symbol=AAPL&token=YOUR_API_KEY
```

### For Cryptocurrency (CoinGecko)
1. Visit: https://www.coingecko.com/api
2. No authentication needed
3. Free tier: 10-50 calls/minute

**Example URL:**
```
https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd
```

### For Stock Data (Alpha Vantage)
1. Visit: https://www.alphavantage.co/
2. Sign up for free API key
3. Free tier: 5 API calls/minute

**Example URL:**
```
https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=IBM&apikey=YOUR_KEY
```

## 🧪 Testing the Application

### Test Widget 1: Bitcoin Price
1. Click "+ Add Widget"
2. Widget Name: `Bitcoin Price`
3. API URL: `https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd`
4. Refresh Interval: 60 seconds
5. Click "✓ Test API"
6. Select: `bitcoin.usd` field
7. Click "✓ Add Widget"

### Test Widget 2: Multiple Assets
1. Click "+ Add Widget"
2. Widget Name: `Crypto Markets`
3. API URL: `https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,cardano&vs_currencies=usd`
4. Display Mode: Table
5. Select multiple fields
6. Click "✓ Add Widget"

## 📁 File Structure After Installation

```
finboard/
├── node_modules/              # Installed dependencies
├── .next/                      # Build cache (auto-generated)
├── app/
│   ├── components/
│   ├── hooks/
│   ├── store/
│   ├── utils/
│   ├── styles/
│   ├── layout.tsx
│   ├── page.tsx
│   └── api/
├── public/
├── package.json
├── package-lock.json
├── tsconfig.json
├── tailwind.config.js
├── next.config.js
├── README.md
└── .gitignore
```

## ⚙️ Configuration Files

### package.json
- Defines all dependencies and build scripts
- Configure Node version requirements
- Add new packages: `npm install package-name`

### tsconfig.json
- TypeScript compiler configuration
- Path aliases for imports
- Strict type checking settings

### tailwind.config.js
- Tailwind CSS theme customization
- Define custom colors and spacing
- Configure responsive breakpoints

### next.config.js
- Next.js specific settings
- Configure optimization options
- Add custom Webpack configuration

## 🌐 Environment Variables

Create `.env.local` in project root:

```bash
# .env.local (DO NOT commit to git)
NEXT_PUBLIC_API_TIMEOUT=10000
NEXT_PUBLIC_CACHE_DURATION=300000
```

**Note:** The `.env.local` file is in `.gitignore` and won't be tracked by git.

## 🚀 Deployment

### Deploy to Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Deploy to Netlify
1. Build the project: `npm run build`
2. Connect repository to Netlify
3. Set build command: `npm run build`
4. Set publish directory: `.next`

### Deploy to AWS
1. Build: `npm run build`
2. Use AWS Amplify or S3 + CloudFront
3. Configure environment variables in deployment

## 🔍 Troubleshooting Installation

### Issue: "Command not found: npm"
- **Solution**: Install Node.js from https://nodejs.org/
- Verify: `node --version` and `npm --version`

### Issue: Port 3000 Already in Use
- **Solution**: `npm run dev -- -p 3001`
- Or kill process: `lsof -ti:3000 | xargs kill -9` (macOS/Linux)

### Issue: CORS Errors
- **Solution**: API must support CORS or use CORS proxy
- Try: `https://cors-anywhere.herokuapp.com/YOUR_API_URL`

### Issue: Out of Memory
- **Solution**: Increase Node memory
- Command: `NODE_OPTIONS=--max_old_space_size=4096 npm run dev`

### Issue: Dependencies Not Installing
- **Solution**: Clear cache and reinstall
```bash
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

## 📚 Additional Resources

- **Next.js Docs**: https://nextjs.org/docs
- **React Docs**: https://react.dev
- **Redux Toolkit**: https://redux-toolkit.js.org/
- **Tailwind CSS**: https://tailwindcss.com/
- **TypeScript**: https://www.typescriptlang.org/

## 🎓 Learning Path

1. Understand the Redux store structure (`app/store/`)
2. Learn component structure (`app/components/`)
3. Explore API utilities (`app/utils/api.ts`)
4. Review data persistence logic (`app/utils/storage.ts`)
5. Customize Tailwind theme (`tailwind.config.js`)

## ✅ Development Best Practices

1. **Always run `npm install`** after pulling changes
2. **Use `npm run lint`** before committing
3. **Test on multiple screen sizes** (responsive design)
4. **Clear browser cache** if styles aren't updating
5. **Check browser console** for errors (F12)

## 🤝 Need Help?

1. Check browser console (F12) for errors
2. Review logs in terminal running `npm run dev`
3. Verify API endpoint is accessible
4. Test API URL in browser or Postman
5. Check internet connection

## 📝 Next Steps

After installation:
1. Create your first widget
2. Explore different display modes
3. Test export/import functionality
4. Try dark theme toggle
5. Add more widgets for a complete dashboard

---

**Installation Complete! 🎉**

Start building your finance dashboard now with `npm run dev`
