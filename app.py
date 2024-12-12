import streamlit as st
import pandas as pd
import requests
import plotly.graph_objects as go
from datetime import datetime
import json

# Configure the page
st.set_page_config(
    page_title="Crypto Research Dashboard",
    page_icon="📊",
    layout="wide"
)

# API endpoints
COINGECKO_API = "https://api.coingecko.com/api/v3"
DEFILLAMA_API = "https://api.llama.fi"

# Cache API calls
@st.cache_data(ttl=300)  # Cache for 5 minutes
def get_top_coins():
    response = requests.get(
        f"{COINGECKO_API}/coins/markets",
        params={
            "vs_currency": "usd",
            "order": "market_cap_desc",
            "per_page": 100,
            "sparkline": False
        }
    )
    return response.json()

@st.cache_data(ttl=300)
def get_market_data():
    response = requests.get(f"{COINGECKO_API}/global")
    return response.json()

# Sidebar for filters and search
st.sidebar.title("Filters")
search_term = st.sidebar.text_input("Search Coins", "")
min_market_cap = st.sidebar.number_input("Min Market Cap (USD)", min_value=0, value=0)

# Main content
st.title("Crypto Research Dashboard")

# Get data
coins_data = get_top_coins()
market_data = get_market_data()

# Create DataFrame
df = pd.DataFrame(coins_data)

# Filter data
if search_term:
    df = df[df['name'].str.contains(search_term, case=False) | 
            df['symbol'].str.contains(search_term, case=False)]
if min_market_cap > 0:
    df = df[df['market_cap'] >= min_market_cap]

# Market Overview Section
st.header("Market Overview")
col1, col2, col3 = st.columns(3)

with col1:
    total_market_cap = market_data['data']['total_market_cap']['usd']
    st.metric(
        "Total Market Cap",
        f"${total_market_cap/1e9:.2f}B",
        f"{market_data['data']['market_cap_change_percentage_24h_usd']:.2f}%"
    )

with col2:
    total_volume = market_data['data']['total_volume']['usd']
    st.metric("24h Volume", f"${total_volume/1e9:.2f}B")

with col3:
    btc_dominance = market_data['data']['market_cap_percentage']['btc']
    st.metric("BTC Dominance", f"{btc_dominance:.2f}%")

# AUM List Section
st.header("AUM List")

# Create an expandable table for each coin
for _, coin in df.iterrows():
    with st.expander(f"{coin['name']} ({coin['symbol'].upper()})"):
        col1, col2 = st.columns([2, 1])
        
        with col1:
            st.image(coin['image'], width=50)
            st.write(f"**Price:** ${coin['current_price']:,.2f}")
            st.write(f"**Market Cap:** ${coin['market_cap']:,.2f}")
            st.write(f"**24h Change:** {coin['price_change_percentage_24h']:.2f}%")
        
        with col2:
            # KPI Links section
            st.subheader("KPI Links")
            if st.button(f"Add KPI Link for {coin['symbol'].upper()}", key=f"kpi_{coin['id']}"):
                st.text_input("KPI Title", key=f"kpi_title_{coin['id']}")
                st.text_input("KPI URL", key=f"kpi_url_{coin['id']}")
            
            # Blog Links section
            st.subheader("Blog Links")
            if st.button(f"Add Blog Link for {coin['symbol'].upper()}", key=f"blog_{coin['id']}"):
                st.text_input("Blog Title", key=f"blog_title_{coin['id']}")
                st.text_input("Blog URL", key=f"blog_url_{coin['id']}")

# Price Chart
st.header("Price Chart")
selected_coin = st.selectbox("Select Coin", df['name'].tolist())
selected_coin_data = df[df['name'] == selected_coin].iloc[0]

fig = go.Figure()
fig.add_trace(go.Indicator(
    mode="number+delta",
    value=selected_coin_data['current_price'],
    delta={'reference': selected_coin_data['current_price'] * (1 - selected_coin_data['price_change_percentage_24h']/100)},
    title={'text': f"{selected_coin} Price (USD)"}
))
st.plotly_chart(fig)

# Footer
st.markdown("---")
st.markdown("Data provided by CoinGecko API")
st.markdown(f"Last updated: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
