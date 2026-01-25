# 🚀 FinBoard Quick Start Guide

## 30-Second Setup

### 1. Install & Run
```bash
cd finboard
npm install
npm run dev
```

### 2. Open Browser
```
http://localhost:3000
```

### 3. Add Your First Widget
- Click **"+ Add Widget"**
- Enter name and API URL
- Click **"✓ Test API"**
- Select fields and display mode
- Click **"✓ Add Widget"**

---

## 📌 Example APIs to Try

### Bitcoin Price (No Key Needed)
```
URL: https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd
Display Mode: Card
```

### Weather Data (No Key Needed)
```
URL: https://api.open-meteo.com/v1/forecast?latitude=40&longitude=-74&current=temperature
Display Mode: Card
```

### Random Users (No Key Needed)
```
URL: https://randomuser.me/api/
Display Mode: Table
```

### Bitcoin Price
```
https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd
```
Fields: `bitcoin.usd`

### Multiple Cryptocurrencies
```
https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,cardano&vs_currencies=usd
```
Fields: Select all → Display as Table

### Global Market Data
```
https://api.coingecko.com/api/v3/global
```
Fields: Top 5 available

## ⚙️ Common Configurations

### Update Frequency Guide
- **Stocks**: 60-120 seconds (updates every 1-2 minutes)
- **Crypto**: 30-60 seconds (real-time feel)
- **Daily Data**: 3600 seconds (1 hour)

### Display Modes
- **Card** 📇: Best for metrics & dashboard overviews
- **Table** 📋: Best for comparing multiple items
- **Chart** 📈: Best for numeric trends

## 🎨 Theming

Click the **☀️/🌙** button to switch between:
- ☀️ **Light Mode**: Bright, professional look
- 🌙 **Dark Mode**: Easy on the eyes at night

Your preference auto-saves!

## 💾 Save Your Dashboard

### Auto-Save
- Dashboard saves automatically every time you add/remove widgets
- Survives browser refresh and restart

### Manual Export
1. Click **⚙️ Menu** → **📥 Export Dashboard**
2. JSON file downloads
3. Save it somewhere safe

### Manual Import
1. Click **⚙️ Menu** → **📤 Import Dashboard**
2. Select previously saved JSON file
3. Dashboard restores completely

## 🐛 Troubleshooting

### "API connection failed"
- ✓ Check your internet connection
- ✓ Verify API URL is correct
- ✓ Try API URL in browser address bar

### "CORS Error"
- Use a different API (CoinGecko works!)
- Or contact your API provider about CORS support

### "No fields appear"
- Make sure API returns valid JSON
- Test URL in browser first
- Check API documentation for correct parameters

### Widget doesn't update
- Check refresh interval setting
- Open DevTools (F12) → Network tab
- Verify API is still accessible

## 🔗 Useful Resources

| Resource | Link |
|----------|------|
| CoinGecko API | https://coingecko.com/api |
| Finnhub API | https://finnhub.io/api |
| Full Docs | `README.md` in project |
| API Guide | `API_INTEGRATION_GUIDE.md` |
| Setup Help | `SETUP_GUIDE.md` |
| Dev Docs | `DEVELOPER_GUIDE.md` |

## 📱 Mobile Support

FinBoard works great on mobile:
- Widgets stack vertically
- Touch-friendly buttons
- Full functionality available
- Responsive design

## 🎓 Next Steps

1. **Explore**: Try different display modes
2. **Experiment**: Add multiple widgets
3. **Customize**: Configure refresh intervals
4. **Share**: Export your dashboard
5. **Learn**: Check out the full documentation

## 🆘 Need Help?

1. Open browser DevTools (**F12**)
2. Check **Console** tab for errors
3. Review error messages carefully
4. Check **Network** tab for failed requests
5. Verify API URL and parameters

## 💡 Pro Tips

- 💡 Use **Card mode** for a dashboard overview
- 💡 Use **Table mode** to compare similar items
- 💡 Set **longer intervals** for rarely-changing data
- 💡 Set **shorter intervals** for real-time data
- 💡 **Export regularly** to backup your work
- 💡 Use **dark mode** to reduce eye strain

## ✨ Features Highlight

| Feature | Benefit |
|---------|---------|
| Drag-and-drop | Customize your layout |
| Multiple APIs | Combine data sources |
| Auto-refresh | Always current data |
| Caching | Faster loads, fewer API calls |
| Theme toggle | Comfortable viewing |
| Export/Import | Never lose your setup |
| Real-time updates | Stay informed |
| Responsive design | Works anywhere |

---

## 🚀 You're All Set!

Your finance dashboard is ready to use. 

**Happy tracking!** 📊✨

---

**Questions?** Check the full documentation files in the project root.
