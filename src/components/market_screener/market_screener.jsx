import './css/market_screener.css'
import React, { useState,useEffect} from 'react';
import axios from 'axios';
import Screener from './Screener';
import DonutChart from '../tools/donutChart'

function MarketScreener(){
    const [marketData,setMarketData] = useState([])
    const [sentiment,setSentiment] = useState({})
    const navItems = ['Screener']
    const [activeTab,setActiveTab] = useState('Screener')
    const renderContent = () => {
        switch (activeTab) {
            case 'Screener':
                return <Screener marketData={marketData}/>;
            default:
                return <Screener marketData={marketData}/>;
        }
    };
    useEffect(() => {
            axios.get(`http://127.0.0.1:5000/api/screener`)
                .then((response) => {
                    let data = response.data;
                    if (typeof data === 'string') {
                        try {
                            data = JSON.parse(data);  // Convert string to array
                        } catch (e) {
                            console.error("Failed to parse JSON string:", e);
                            data = [];  // fallback
                        }
                    }
                    // Check if data is an array and set it
                    if (Array.isArray(data)) {
                        console.log('API Response:', data);
                        data = data.map((item) => {
                            // Convert numeric values to numbers and format them
                            return {
                                ...item,
                                Volume: item.Volume.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 }),
                                'MCap.(M)': item['MCap.(M)'].toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 }),
                            };
                        })
                        setMarketData(data);
                        
                        let positive = 0;
                        let neutral = 0;
                        let negative = 0;
                        
                        data.forEach((item) => {
                          const change = parseFloat(item?.Change);
                          
                          if (change > 0) {
                            positive += 1;
                          } else if (change === 0) {
                            neutral += 1;
                          } else {
                            negative += 1;
                          }
                        });
                        
                        setSentiment({
                          positive,
                          neutral,
                          negative,
                        });
                        
                       
                    } else {
                        console.error('Unexpected data format:', data);
                    }
                    // console.log('Filtered Data:', data);
                })
                .catch((error) => {
                    console.error('Error fetching filtered data:', error);
                });
       
    }, []);
    

     return(
        <>
        <div className="market_container">
            <div className="stock-price-chart">
               <DonutChart data={sentiment} ></DonutChart>
                 
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
