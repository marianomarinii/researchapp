# Crypto Research Dashboard

A Streamlit-based dashboard for cryptocurrency research and portfolio management.

## Features

- Real-time market overview
- AUM (Assets Under Management) list with detailed coin information
- KPI and Blog link management for each coin
- Interactive price charts
- Search and filtering capabilities
- Market metrics from CoinGecko API

## Setup

1. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Run the application:
```bash
streamlit run app.py
```

The application will be available at `http://localhost:8501`

## Data Sources

- CoinGecko API for cryptocurrency data
- DeFiLlama API for DeFi protocol data

## Usage

1. Use the sidebar to search for specific coins or filter by market cap
2. Click on any coin in the AUM list to view detailed information
3. Add KPI and Blog links to track important resources for each coin
4. View real-time price charts and market metrics

## Note

This application uses free API endpoints which may have rate limits. Consider implementing API key authentication for production use.
