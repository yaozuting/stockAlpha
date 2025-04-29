import React ,{useState,useEffect,lazy,Suspense}from 'react';
import axios from 'axios';
import './css/Stockinfo.css'
import './css/StockDashBoardbottom.css'
import StockPriceChart from '../market_screener/reusableModule/stockPriceChart';
import Loading from '../tools/loading';

// Lazy load tab content components
const Financial = lazy(() => import("./Financial"));
// const Holding = lazy(() => import("./Holding"));
const CompanyManagement = lazy(() => import("./CompanyManagement"));
const Competition = lazy(() => import("./Competition"));

//date range for stock price
const predefinedRanges = ['5d', '1mo', '6mo', '1y', '5y', 'max'];

function StockDashBoard(code){
    console.log(code)
    const [stockCode,setStockCode] = useState(null)
    const [stockData,setStockData] = useState({})
    const [formattedData, setFormattedData] = useState([]);
    const [NewsData,setNewsData] = useState({})
    const [selectedRange, setSelectedRange] = useState('1mo');
    const [historicalStockPrice, setHistoricalStockPrice] = useState({});

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
      
    
      useEffect(() => {
        if (!stockCode) return;
        setSelectedRange('1mo'); // Reset to default range when stockCode changes
    
        const params = new URLSearchParams();
        if (stockCode) params.append("stockCode", stockCode);
    
        // Use environment variable for the base URL
        const baseURL = import.meta.env.VITE_API_BASE_URL;
    
        // Fetch company news and stock data concurrently
        const fetchCompanyNews = axios.get(`${baseURL}/api/companyNews?${params.toString()}`);
        const fetchStockData = axios.get(`${baseURL}/api/stock?${params.toString()}`);
    
        Promise.all([fetchCompanyNews, fetchStockData])
            .then(([newsResponse, stockResponse]) => {
                // Handle company news response
                let newsData = newsResponse.data;
                if (typeof newsData === "string") {
                    try {
                        newsData = JSON.parse(newsData);
                    } catch (error) {
                        console.error("Error parsing company news JSON:", error);
                    }
                }
                if (newsData) {
                    console.log("Company News:", newsData);
                    setNewsData(newsData);
                } else {
                    console.error("Unexpected company news format:", newsData);
                }
    
                // Handle stock data response
                let stockData = stockResponse.data;
                if (typeof stockData === "string") {
                    try {
                        stockData = JSON.parse(stockData);
                    } catch (error) {
                        console.error("Error parsing stock data JSON:", error);
                    }
                }
                if (stockData) {
                    console.log("Stock Data:", stockData);
                    setStockData(stockData[stockCode]);
                } else {
                    console.error("Unexpected stock data format:", stockData);
                }
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, [stockCode]);
    
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
                console.log(typeof data);
                console.log(data);
    
                // Convert data from a string if necessary
                if (typeof data === "string") {
                    try {
                        data = JSON.parse(data); // Convert string to JSON
                    } catch (error) {
                        console.error("Error parsing JSON:", error);
                    }
                }
                if (data) {
                    console.log(data);
                    setHistoricalStockPrice(data[stockCode]);
                } else {
                    console.error("Unexpected data format:", data);
                }
            })
            .catch((error) => {
                console.error("Error fetching filtered data:", error);
            });
    }, [selectedRange, stockCode]);
  
  
   useEffect(()=>{
     setStockCode(code.code)
   },[code])

    const navItems = [
        { id: "financial", title: "Financial", component: Financial},
        // { id: "holding", title: "Holding", component: Holding},
        { id: "companyManagement", title: "Company Management", component: CompanyManagement },
        { id: "competition", title: "Competition", component: Competition},
      ];
    const [activeTab, setActiveTab] = useState(navItems[0].id);

      // Find the active component dynamically
    const ActiveComponent = navItems.find((item) => item.id === activeTab)?.component;
     console.log(stockData)
    
    if((!stockCode)){
        return <h3>Plz select a company</h3>
    }
    if (!stockData || !formattedData || !Object.keys(stockData).length || !formattedData.length) {
        return <Loading></Loading>; // Return nothing if stockData or formattedData is invalid
    }
   

    return (
        <>
        <div>
            <div className="info_row">
                 {typeof stockData === "object" ? (
                    <>
                    {/* Stock Name & Price */}
                    <div className="stock-header">
                        <h2 className="stock-name">{stockData.price?.longName}</h2>
                        <span className="stock-price">
                        RM{stockData.price?.regularMarketPrice}{" "}
                        <span
                            className={`stock-change ${
                            stockData.price?.regularMarketChangePercent > 0
                                ? "positive"
                                : "negative"
                            }`}
                        >
                           ({(stockData.price?.regularMarketChangePercent * 100)?.toFixed(2)}%)
                        </span>
                        </span>
                    </div>

                    {/* Sector & Industry */}
                    <div className="stock-sector">
                        <span>{stockData.summary_profile?.sector}</span> |{" "}
                        <span>{stockData.summary_profile?.industry}</span>
                    </div>

                    {/* Business Summary */}
                    <p className="stock-summary">{stockData.summary_profile?.longBusinessSummary}</p>

                    {/* Website */}
                    <p className="stock-website">
                        Website:{" "}
                        <a
                        href={stockData.summary_profile?.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        >
                        {stockData.summary_profile?.website}
                        </a>
                    </p>
                    <p>Market Cap: RM{(stockData.summary_detail?.marketCap / 1_000_000)?.toLocaleString(undefined, { maximumFractionDigits: 2 })} mil</p>

                    {/* Upcoming Earnings Date */}
                    <p className="stock-earnings">
                        <strong>Upcoming Earnings Date:</strong>{" "}
                        {stockData.earnings?.earningsChart?.earningsDate
                        ?.slice(0, 2)
                        ?.join(" - ")}
                    </p>
                    </>
                ) : (
                    <p className="loading-text">Loading...</p>
                )}
            </div>   
           
             <div className="stock-summary-wrapper">
                  
                        <div className='stock-price-chart'>
                            <div className='dateRangeButtons'>
                                {predefinedRanges.map((range) => (
                                    <button
                                    key={range}
                                    className={`range-btn ${range === selectedRange ? 'active' : ''}`}
                                    onClick={() => setSelectedRange(range)}
                                    >
                                    {range.toUpperCase()}
                                    </button>
                                ))}
                            </div>
                            <StockPriceChart data={formattedData}></StockPriceChart>
                        </div>
                        <div className='stock-price-summary'>
                    {historicalStockPrice?.historical_data?.length > 0 ? (() => {
                        const data = historicalStockPrice.historical_data;

                        const startDate = new Date(data[0].date);
                        const endDate = new Date(data[data.length - 1].date);
                        const startPrice = data[0]?.adjclose;
                        const latestPrice = data[data.length - 1]?.adjclose;
                        const priceChange = ((latestPrice - startPrice) / startPrice) * 100;

                        const highestPrice = Math.max(...data.map(item => item.adjclose));
                        const lowestPrice = Math.min(...data.map(item => item.adjclose));
                        const highestDate = new Date(data.find(item => item.adjclose === highestPrice)?.date);
                        const lowestDate = new Date(data.find(item => item.adjclose === lowestPrice)?.date);

                        const highestVolume = Math.max(...data.map(item => item.volume));
                        const lowestVolume = Math.min(...data.map(item => item.volume));
                        const highestVolumeDate = new Date(data.find(item => item.volume === highestVolume)?.date);
                        const lowestVolumeDate = new Date(data.find(item => item.volume === lowestVolume)?.date);

                        return (
                        <div className="summary-table-vertical-container">
                            
                            {/* Price Movement Table */}
                            <table className="summary-vertical-table">
                            <thead>
                                <tr><th colSpan="3">Price Movement</th></tr>
                            </thead>
                            <tbody>
                                <tr>
                                <td>Start Price</td>
                                <td>RM {startPrice?.toFixed(2)}</td>
                                <td>{startDate.toLocaleDateString("en-GB")}</td>
                                </tr>
                                <tr>
                                <td>Latest Price</td>
                                <td>RM {latestPrice?.toFixed(2)}</td>
                                <td>{endDate.toLocaleDateString("en-GB")}</td>
                                </tr>
                                <tr>
                                <td>Change (%)</td>
                                <td style={{ color: priceChange >= 0 ? 'green' : 'red' }}>
                                    {priceChange.toFixed(2)}%
                                </td>
                                <td>-</td>
                                </tr>
                            </tbody>
                            </table>

                            {/* Price Extremes Table */}
                            <table className="summary-vertical-table">
                            <thead>
                                <tr><th colSpan="3">Price Extremes</th></tr>
                            </thead>
                            <tbody>
                                <tr>
                                <td>Highest Price</td>
                                <td>RM {highestPrice.toFixed(2)}</td>
                                <td>{highestDate.toLocaleDateString("en-GB")}</td>
                                </tr>
                                <tr>
                                <td>Lowest Price</td>
                                <td>RM {lowestPrice.toFixed(2)}</td>
                                <td>{lowestDate.toLocaleDateString("en-GB")}</td>
                                </tr>
                            </tbody>
                            </table>

                            {/* Volume Extremes Table */}
                            <table className="summary-vertical-table">
                            <thead>
                                <tr><th colSpan="3">Volume Extremes</th></tr>
                            </thead>
                            <tbody>
                                <tr>
                                <td>Highest Volume</td>
                                <td>{highestVolume.toLocaleString()}</td>
                                <td>{highestVolumeDate.toLocaleDateString("en-GB")}</td>
                                </tr>
                                <tr>
                                <td>Lowest Volume</td>
                                <td>{lowestVolume.toLocaleString()}</td>
                                <td>{lowestVolumeDate.toLocaleDateString("en-GB")}</td>
                                </tr>
                            </tbody>
                            </table>

                        </div>
                        );
                    })() : (
                        <p>No data available</p>
                    )}
                    </div>
                </div>




                    {/* Navigation Buttons */}
                <div className="tab-buttons">
                        {navItems.map((item) => (
                        <button
                            key={item.id}
                            className={activeTab === item.id ? "active" : ""}
                            onClick={() => setActiveTab(item.id)}
                        >
                            {item.title}
                        </button>
                        ))}
                    </div>

                {/* content */}
                <div className="ContentContainer">
                    <div className="tab-content">
                        <Suspense fallback={<p>Loading...</p>}>
                        {stockData && stockData.balance_sheet ? (
                            <ActiveComponent data={stockData} />
                        ) : (
                            <p>Loading data...</p>
                        )}
                                        
                        </Suspense>
                    </div>
              
             
                    <div className='NewsColumns'>
                        <div className='annoucementCol'>
                            <h2>Announcements</h2>
                            <div className='scrollable'>
                                {NewsData.announcements &&
                                NewsData.announcements.map((dict, index) => (
                                    <div key={index} className="news-card">
                                    <a href={dict.url} target="_blank" rel="noopener noreferrer">
                                        {dict.Announcement}
                                    </a>
                                    <img
                                        src="https://www.bursamalaysia.com/sites/5bb54be15f36ca0af339077a/theme/images/logo.png?1741962961"
                                        alt="bursa"
                                    />
                                    <p>{dict.Date}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className='ComNewsCol'>
                            <h2>Company News</h2>
                            <div className='scrollable'>
                                {NewsData['companyNews'] &&
                                NewsData['companyNews'].map((dict, index) => (
                                    <div key={index} className="news-card">
                                    <a href={dict.link} target="_blank" rel="noopener noreferrer">
                                        {dict.title}
                                    </a>
                                    <img
                                        src="https://chromeunboxed.com/wp-content/uploads/2021/09/Google-News-Feature-750x420.jpg"
                                        alt="bursa"
                                    />
                                    <p>{dict.date}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
               </div>
         </div>
        
    </>
   ) }


export default StockDashBoard