import './css/market_screener.css'
import React, { useState,useEffect} from 'react';
import axios from 'axios';
import Screener from './Screener';
import StockPriceChart from './reusableModule/stockPriceChart.jsx'

function MarketScreener(){
    const baseURL = import.meta.env.VITE_API_BASE_URL; // ✅ Moved here
    const [stockCode, setStockCode] = useState('^KLSE'); // Example stock code
    const [selectedRange, setSelectedRange] = useState('1mo'); // Example date range
    const [historicalStockPrice, setHistoricalStockPrice] = useState([]);
    const [formattedHistoricalPrice, setFormattedData] = useState([]);

    const dateRanges = [
        { label: '1M', value: '1mo' },
        { label: '3M', value: '3mo' },
        { label: '6M', value: '6mo' },
        { label: 'YTD', value: 'YTD' },
        { label: '1Y', value: '1y' },
        { label: '5Y', value: '5y' },
        { label: 'Max', value: 'Max' },]

  
    const navItems = ['Screener']
    const data = [
        { month: 'Jan', index: 1570 },
        { month: 'Feb', index: 1600 },
        { month: 'Mar', index: 1620 },
        { month: 'Apr', index: 1580 },
        { month: 'May', index: 1610 },
        { month: 'Jun', index: 1590 },
    ];
    const [activeTab,setActiveTab] = useState('Screener')
    const renderContent = () => {
        switch (activeTab) {
            case 'Screener':
                return <Screener />;
            default:
                return <Screener />;
        }
    };
    useEffect(() => {
        if (!stockCode) return;
    
        const params = new URLSearchParams();
        if (stockCode) params.append("stockCode", stockCode);
        if (selectedRange) params.append("dateRange", selectedRange);
    
        // Use environment variable for the base URL
        const baseURL = import.meta.env.VITE_API_BASE_URL;

    
        axios
            .get(`${baseURL}/api/stockPrice?${params.toString()}`)
            .then((response) => {
                let data = response.data;
                console.log('API Response:', data);
    
                // Convert data from a string if necessary
                if (typeof data === "string") {
                    try {
                        data = JSON.parse(data); // Convert string to JSON
                    } catch (error) {
                        console.error("Error parsing JSON:", error);
                    }
                }
    
                if (data && data[stockCode]) {
                    console.log('Historical Price:', data);
                    setHistoricalStockPrice(data[stockCode]);
                } else {
                    console.error("Unexpected data format:", typeof data);
                    setHistoricalStockPrice([]); // Set to an empty array if data is invalid
                }
            })
            .catch((error) => {
                console.error("Error fetching filtered data:", error);
                setHistoricalStockPrice([]); // Set to an empty array on error
            });
    }, [selectedRange]);

 useEffect(() => {
        if (historicalStockPrice && historicalStockPrice.historical_data) {
          const rawData = historicalStockPrice.historical_data;
      
          const formatted = rawData.map((item, index, arr) => {
            const date = new Date(item.date).toLocaleDateString("en-GB"); // Format as "DD/MM/YYYY"
            const volume = item.volume / 1000; // Convert to thousands
      
            // Compare with previous day's closing price to determine color
            let volumeColor = "#999"; // default color
            if (index > 0) {
              const prevClose = arr[index - 1].adjclose;
              const currClose = item.adjclose;
              volumeColor = currClose > prevClose ? "#28a745" : "#dc3545"; // green or red
            }
      
            return {
              ...item,
              date,
              volume,
              volumeColor
            };
          });
          setFormattedData(formatted);
        }
      }, [historicalStockPrice]);

     return(
        <>
        <div className="market_container">
            <div className="stock-price-chart">
               <div className='date-range'>
                   { dateRanges.map((range) => (
                       <button
                       key={range.value}
                       className={`date-button ${selectedRange === range.value ? "active" : ""}`}
                       onClick={() => setSelectedRange(range.value)}>
                       {range.label} </button>
                   ))}
                </div>
                  <StockPriceChart data={formattedHistoricalPrice}></StockPriceChart>
               
                 
            </div>
            <div className="market_body">
                <div className="nav">
                    <nav>
                        <ul className="nav-menu">
                                {navItems.map((item) => (
                            <li
                                key={item}
                                className={`nav_button ${activeTab === item ? "active" : ""}`}
                                onClick={() => setActiveTab(item)}>
                                {item}
                            </li>))}                  
                        </ul>
                    </nav>
                </div>
                <div className="content ">
                    {renderContent()}
                </div>
            </div>
        </div>
        </>
     )
}

export default MarketScreener
