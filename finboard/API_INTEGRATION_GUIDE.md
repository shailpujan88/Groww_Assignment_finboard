# FinBoard API Integration Guide

## Overview

FinBoard is designed to work with any JSON-based REST API. This guide explains how to integrate various financial APIs and handle different data structures.

## 📋 Supported API Types

### 1. Simple Key-Value APIs
**Example**: Stock price APIs returning flat JSON objects

```json
{
  "symbol": "AAPL",
  "price": 150.25,
  "currency": "USD",
  "change": 2.5
}
```

**How to use:**
- Select fields: `symbol`, `price`, `currency`, `change`
- Display mode: Card (recommended for simple metrics)

### 2. Nested JSON APIs
**Example**: Complex market data with nested structures

```json
{
  "data": {
    "bitcoin": {
      "usd": 45000,
      "eur": 41000
    }
  }
}
```

**How to use:**
- Field paths are extracted as: `data.bitcoin.usd`, `data.bitcoin.eur`
- Select the full path to access nested values

### 3. Array-Based APIs
**Example**: List of multiple assets

```json
{
  "stocks": [
    { "symbol": "AAPL", "price": 150 },
    { "symbol": "GOOGL", "price": 140 }
  ]
}
```

**How to use:**
- First item is analyzed for field extraction
- Fields available: `stocks` (array reference)

## 🔗 Popular Financial APIs

### CoinGecko (Cryptocurrency - Free)
**Endpoint**: https://api.coingecko.com/api/v3/simple/price

**Parameters:**
- `ids`: Comma-separated crypto IDs (bitcoin, ethereum, cardano)
- `vs_currencies`: Target currency (usd, eur, gbp)

**Example URL:**
```
https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd
```

**Response Example:**
```json
{
  "bitcoin": {
    "usd": 45000,
    "eur": 41000
  },
  "ethereum": {
    "usd": 2500,
    "eur": 2300
  }
}
```

**Recommended Fields to Select:**
- `bitcoin.usd`
- `ethereum.usd`

**Rate Limit:** 10-50 calls/minute (free tier)

---

### Finnhub (Stocks - Requires Key)
**Website**: https://finnhub.io

**Endpoint**: https://finnhub.io/api/v1/quote

**Required Parameters:**
- `symbol`: Stock ticker (AAPL, GOOGL, etc.)
- `token`: Your API key

**Example URL:**
```
https://finnhub.io/api/v1/quote?symbol=AAPL&token=YOUR_API_KEY
```

**Response Example:**
```json
{
  "c": 150.25,
  "h": 151.50,
  "l": 149.00,
  "o": 150.00,
  "pc": 149.75,
  "t": 1633024800
}
```

**Field Meanings:**
- `c`: Current price
- `h`: High price (today)
- `l`: Low price (today)
- `o`: Opening price
- `pc`: Previous close

**Rate Limit:** 60 calls/minute (free tier)

---

### Alpha Vantage (Stocks - Requires Key)
**Website**: https://www.alphavantage.co

**Endpoint**: https://www.alphavantage.co/query

**Required Parameters:**
- `function`: API function (GLOBAL_QUOTE, TIME_SERIES_DAILY)
- `symbol`: Stock ticker
- `apikey`: Your API key

**Example URL:**
```
https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=IBM&apikey=YOUR_KEY
```

**Response Example:**
```json
{
  "Global Quote": {
    "01. symbol": "IBM",
    "02. open": "140.0000",
    "03. high": "142.5000",
    "04. low": "139.5000",
    "05. price": "141.2500",
    "06. volume": "2500000",
    "10. change percent": "1.23%"
  }
}
```

**Rate Limit:** 5 calls/minute (free tier)

---

### Yahoo Finance (Stocks - No Auth)
**Note:** Requires unofficial API or third-party service

**Alternative**: Use RapidAPI's Yahoo Finance endpoint
- Endpoint: `https://api.coingecko.com/` (free alternative)

---

## 🎯 API Integration Best Practices

### 1. URL Validation
Always use complete, absolute URLs:
```
✓ https://api.example.com/data
✗ /data
✗ api.example.com/data
```

### 2. CORS Handling
If your API doesn't support CORS, you have options:

**Option A: Use a CORS Proxy** (not recommended for production)
```
https://cors-anywhere.herokuapp.com/https://api.example.com/data
```

**Option B: Create a Backend Proxy**
Set up your own backend route:
```
/api/proxy?url=https://api.example.com/data
```

**Option C: Find CORS-enabled APIs**
- CoinGecko ✓ (CORS enabled)
- Finnhub ✓ (CORS enabled)
- Alpha Vantage ✗ (No CORS)

### 3. Authentication
For APIs requiring authentication:

**API Key in URL:**
```
https://api.example.com/data?apikey=YOUR_KEY
```

**Note:** Avoid hardcoding keys in frontend code. Consider:
- Using environment variables
- Creating a backend proxy
- Using OAuth for user-specific data

### 4. Response Structure
FinBoard handles different structures automatically:

**Flat Response:**
```json
{ "field1": "value1", "field2": "value2" }
```

**Nested Response:**
```json
{
  "data": {
    "field1": "value1"
  }
}
```

Both work! FinBoard extracts all available fields.

## 📊 Field Extraction Examples

### Example 1: CoinGecko Response
```json
{
  "bitcoin": {
    "usd": 45000,
    "eur": 41000
  }
}
```

**Extracted Fields:**
- `bitcoin.usd`
- `bitcoin.eur`

---

### Example 2: Stock Quote Response
```json
{
  "symbol": "AAPL",
  "quote": {
    "price": 150.25,
    "change": 2.50
  }
}
```

**Extracted Fields:**
- `symbol`
- `quote.price`
- `quote.change`

---

## ✅ Testing Your API

### Using Browser Console
```javascript
fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd')
  .then(r => r.json())
  .then(d => console.log(d))
```

### Using Postman
1. Download: https://www.postman.com/downloads/
2. Create new request
3. Paste your API URL
4. Click Send
5. Review response

### Using FinBoard
1. Click "+ Add Widget"
2. Enter your API URL
3. Click "✓ Test API"
4. If successful, fields appear automatically

## 🔄 Refresh Intervals Guide

**Recommended intervals based on data type:**

| Data Type | Update Frequency | Suggested Interval |
|-----------|------------------|-------------------|
| Cryptocurrency | Real-time | 30-60 seconds |
| Stock Quotes | Every minute | 60-120 seconds |
| Daily Data | Daily | 3600 seconds (1 hour) |
| Weekly Data | Weekly | 86400 seconds (1 day) |
| Economic Data | Monthly | 604800 seconds (1 week) |

**Rate Limit Calculation:**
- **Refresh Interval**: 60 seconds
- **Calls per hour**: 60 ÷ 60 = 60 calls
- **Calls per day**: 60 × 24 = 1440 calls

Check your API's rate limit and adjust accordingly!

## 🐛 Common Integration Issues

### Issue 1: CORS Error
```
Access to XMLHttpRequest at 'https://api.example.com' 
from origin 'http://localhost:3000' has been blocked
```

**Solutions:**
- Use a CORS-enabled API (CoinGecko, Finnhub)
- Create a backend proxy
- Use CORS proxy (development only)

### Issue 2: Rate Limit Error (429)
```
{"error": "Too many requests"}
```

**Solutions:**
- Increase refresh interval
- Reduce number of widgets
- Use API caching
- Upgrade to paid tier

### Issue 3: Invalid JSON Response
```
Unexpected token < in JSON at position 0
```

**Solutions:**
- Verify API URL is correct
- Check if API requires authentication
- Ensure API returns JSON (not HTML)
- Test URL in browser directly

### Issue 4: Empty or Null Data
```
"data": null or "data": {}
```

**Solutions:**
- Verify API parameters (symbol, currency, etc.)
- Check API documentation
- Test with sample URLs provided by API
- Verify API key is valid

## 🎓 Example Workflows

### Workflow 1: Multi-Currency Crypto Dashboard
1. **Widget 1**: Bitcoin Price
   - URL: `https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd,eur`
   - Mode: Card
   - Fields: `bitcoin.usd`, `bitcoin.eur`

2. **Widget 2**: Ethereum & Cardano
   - URL: `https://api.coingecko.com/api/v3/simple/price?ids=ethereum,cardano&vs_currencies=usd`
   - Mode: Table
   - Fields: All available

### Workflow 2: Stock Portfolio Tracker
1. **Widget 1**: Apple Stock
   - URL: `https://finnhub.io/api/v1/quote?symbol=AAPL&token=KEY`
   - Mode: Card
   - Fields: Current price, change, high/low

2. **Widget 2**: Multiple Stocks
   - Create separate widgets for each stock
   - Use consistent display mode for comparison

## 📚 Additional Resources

- [CoinGecko API Docs](https://www.coingecko.com/api/documentations/v3)
- [Finnhub API Docs](https://finnhub.io/docs/api)
- [Alpha Vantage Docs](https://www.alphavantage.co/documentation/)
- [REST API Best Practices](https://restfulapi.net/)
- [JSON Format Guide](https://www.json.org/)

## 🚀 Next Steps

1. Choose your first API
2. Get API key if required
3. Test the API endpoint
4. Add widget to FinBoard
5. Customize display mode
6. Set appropriate refresh interval

---

**Happy integrating! 🎉**
