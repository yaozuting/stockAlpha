import React from 'react';
import { useState,useEffect } from "react";
import DonutChart from '../tools/donutChart';
import WordCloudChart from './wordCloud';
import './css/news.css'
import CompanyBarChart from './barChart';


function NewsStatistic({news}) {
  const [newsData, setNewsData] = useState({});
    const [selectedSector, setSelectedSector] = useState('');
    const [selectedCompany, setSelectedCompany] = useState('');
 
    const selectedSectorData = (selectedSector) => {
        const data = newsData?.news.filter(item => item.Sector === selectedSector);
        if (data.length > 0) {
         return data || [];
    }};
    const selectedCompanyData = (selectedCompany) => {
      const data = newsData?.news.filter(item => item['Related_Stock']?.includes(selectedCompany));
      if (data.length > 0) {
       return data || [];
  }};

    useEffect(()=>{
      setNewsData(news)
   },[news]);
   
   function isDate(value) {
    const date = new Date(value);
    return !isNaN(date.getTime()); // Returns true if the value is a valid date
  }
  

   if (!newsData || !newsData.news) return null;

   return (
    <>
   
      {newsData&&  (
       <div className="news_statistic">
        <div className="firstRow">
          <div>
            <h3>Date:</h3>
            {newsData?.latest_date  && (
              <p>{isDate(newsData?.latest_date)? new Date(newsData?.latest_date).toISOString().split('T')[0]:newsData?.latest_date}</p>
            )}
          </div>
          <div>
            <h3>Number of News:</h3>
            <p>{newsData.number_of_news}</p>
          </div>
          <div>
            <h3>Sentiment:</h3>
            <p style={{
              color: newsData.sentiment === 'positive' ? 'red' : newsData.sentiment === 'negative' ? 'green' : 'grey'
            }}>
              {newsData.sentiment}
            </p>
          </div>
        </div>
      
        <div className="secondRow">
          <h2 className="text-xl font-bold mb-4">News WordCloud</h2>
          <WordCloudChart data={newsData.word_Cloud} />
        </div>
      
        <div className="thirdRow">
          <div>
            <h3>Sector Distribution</h3>
            <div className='graph-container'>
              <DonutChart data={newsData.sector_distribution} />
            </div>
            <select id="sector" value={selectedSector} onChange={(e) => setSelectedSector(e.target.value)}>
              <option value="">-- Select Sector --</option>
              {newsData?.sector_distribution &&
                Object.keys(newsData.sector_distribution).map((item, index) => (
                  <option key={index} value={item}>{item}</option>  //turn to object
              ))}

            </select>
            <div className='news-item-container'>
              {selectedSector && selectedSectorData(selectedSector).map((item, index) => (
                <div key={index} className="news_item">
                  <a href={item.News_Hyperlinks} target="_blank" rel="noopener noreferrer">
                    {item.Title}
                  </a>
                </div>
              ))}
            </div>
          </div>
     
          <div>
            <h3>Company Distribution</h3>
            <div className='graph-container'>
              <CompanyBarChart data={newsData.company_distribution} />
            </div>
            <select id="company" value={selectedCompany} onChange={(e) => setSelectedCompany(e.target.value)}>
              <option value="">-- Select Company --</option>
              {newsData.company_distribution.filter(item => item.name).map((item, index) => (
                <option key={index} value={item.name}>
                  {item.name}
                </option>
              ))}
            </select>
            <div className='news-item-container'>
              {selectedCompany && selectedCompanyData(selectedCompany).map((item, index) => (
                <div key={index} className="news_item">
                  <a href={item.News_Hyperlinks} target="_blank" rel="noopener noreferrer">
                    {item.Title}
                  </a>
                </div>
              ))}
            </div>
         </div>

       </div>
     </div>
      )}
    </>
  );
  
}
export default NewsStatistic;
