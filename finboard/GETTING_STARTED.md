# 🚀 FinBoard - Quick Start Guide

## ✨ Project Status: COMPLETE & RUNNING ✨

Your **Customizable Finance Dashboard** is fully built and running at **`http://localhost:3001`**

---

## 🎯 What You Have

A complete, production-ready finance dashboard with:
- ✅ Real-time widget management
- ✅ Multi-display modes (Cards, Tables, Charts)
- ✅ API integration from any source
- ✅ Dark/Light themes
- ✅ Drag-and-drop rearranging
- ✅ Export/Import configurations
- ✅ Full persistence (auto-save)

---

## 🏃 Running the App

### **Option 1: Development Server** (Recommended)

```bash
cd finboard
npm run dev
```

Then open: **http://localhost:3001**

### **Option 2: Production Build**

```bash
cd finboard
npm run build
npm start
```

---

## 📋 First Time Setup

### 1. **Install Dependencies** (if not done)
```bash
cd finboard
npm install
```

### 2. **Start the Server**
```bash
npm run dev
```

### 3. **Open in Browser**
Visit: **http://localhost:3001**

---

## 📊 Add Your First Widget in 2 Minutes

### Step 1: Click "+ Add Widget"
Look for the green button in the header

### Step 2: Fill in Details
```
Widget Name:  Bitcoin Price
API URL:      https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd
Refresh:      60 seconds
```

### Step 3: Test the API
Click **"✓ Test API"** to validate

### Step 4: Select Fields
The app auto-detects available fields:
- `bitcoin` → `bitcoin.usd` ✓

### Step 5: Choose Display
- 📇 **Card** - Metric cards (best for single values)
- 📋 **Table** - Data table (best for lists)
- 📈 **Chart** - Bar chart (best for trends)

### Step 6: Create!
Click **"✓ Add Widget"**

That's it! 🎉

---

## 🔗 Recommended APIs to Try

### **Free - No Key Required**

#### Bitcoin/Crypto
```
https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd
```

#### Weather
```
https://api.open-meteo.com/v1/forecast?latitude=40&longitude=-74&current=temperature
```

#### Public Data
```
https://api.github.com/users/octocat
```

### **Requires Free API Key**

- **Finnhub** (Stocks) - https://finnhub.io
- **Alpha Vantage** (Stock Data) - https://www.alphavantage.co

---

## 🎮 Features to Try

### 1️⃣ **Drag & Drop Widgets**
- Click and hold a widget
- Drag to new position
- Release to rearrange

### 2️⃣ **Edit Widget Settings**
- Click ⚙️ on any widget
- Change name, refresh rate, fields, or display mode
- Click "Save Changes"

### 3️⃣ **Toggle Theme**
- Click 🌙 in header
- Switch between light & dark modes
- Theme auto-saves

### 4️⃣ **Export Your Dashboard**
- Click Menu (⚙️) → "📥 Export Dashboard"
- Saves as JSON file
- Share with others!

### 5️⃣ **Import Configuration**
- Click Menu → "📤 Import Dashboard"
- Select saved JSON file
- Restores all widgets instantly

---

## 🛠️ Project Structure

```
finboard/
├── app/
│   ├── api/proxy/route.ts          ← API proxy for CORS
│   ├── components/                 ← React components
│   ├── hooks/                      ← Custom hooks
│   ├── store/                      ← Redux state
│   ├── utils/                      ← Helpers (API, cache, etc)
│   ├── styles/                     ← CSS
│   └── page.tsx                    ← Main page
├── public/                          ← Static files
├── package.json                     ← Dependencies
├── tsconfig.json                    ← TypeScript config
├── tailwind.config.js               ← Tailwind setup
└── .env.local                       ← Environment vars
```

---

## 🔧 Configuration

**File: `.env.local`**

```env
# API Timeout (milliseconds)
NEXT_PUBLIC_API_TIMEOUT=10000

# Cache Duration (milliseconds) 
NEXT_PUBLIC_CACHE_DURATION=300000

# Use proxy for CORS
NEXT_PUBLIC_USE_PROXY=true
```

---

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| Port 3000 busy? | Server auto-uses 3001 |
| API test fails? | Check URL in browser first |
| No data shows? | Verify API returns JSON |
| Theme not saving? | Enable localStorage |
| Widgets gone? | Check export/import feature |

---

## 📚 Complete Documentation

- **[README.md](./README.md)** - Full feature overview
- **[API_INTEGRATION_GUIDE.md](./API_INTEGRATION_GUIDE.md)** - API integration details
- **[SETUP_INSTRUCTIONS.md](./SETUP_INSTRUCTIONS.md)** - Detailed setup guide
- **[COMPLETION_SUMMARY.md](./COMPLETION_SUMMARY.md)** - Project completion details

---

## 🎯 Next Steps

1. ✅ **Start the server** - `npm run dev`
2. ✅ **Add a test widget** - Try the Bitcoin API
3. ✅ **Explore features** - Try drag-drop, export, themes
4. ✅ **Add more widgets** - Connect to your APIs
5. ✅ **Deploy** - When ready, deploy to Vercel/Netlify

---

## 🚀 Ready to Deploy?

### **Vercel** (Easiest)
```bash
npm install -g vercel
vercel
```

### **Netlify**
```bash
npm run build
# Upload .next folder to Netlify
```

---

## 💡 Pro Tips

- Use **shorter refresh intervals** (30-60s) for live data
- Use **longer intervals** (300-600s) to avoid rate limits
- **Card mode** loads fastest for single metrics
- **Export often** to backup your dashboard setup
- Test APIs in browser first before adding widgets

---

## 🎉 You're All Set!

Your dashboard is **production-ready** and waiting for your data.

### Start Now:
```bash
npm run dev
```

Then visit: **http://localhost:3001**

---

**Happy Dashboard Building! 📊✨**

Need help? Check the documentation files or test an API first in your browser.
