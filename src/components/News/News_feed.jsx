import React from 'react';
import { useState,useEffect } from "react";

function NewsFeed({news}) {
    const [NewsData,setNewsData] = useState([]);
    const [showIframe,setShowIframe] = useState(false);
    const [endNewsFeed,setEndFeed] = useState(10);

    const handleLoadMore = ()=>{
        console.log(endNewsFeed)
        setEndFeed(endNewsFeed+10)
    }
    
    useEffect(()=>{
       setNewsData(news.today_news)
       console.log('news',news.today_news)
    },[news]);

    return(
        <div className="news_feed">
            <div className='text'><p>News Feed</p></div>
            <ul>
                {NewsData && NewsData.length > 0 && 
                NewsData.slice(1,endNewsFeed).map((row,index)=>{
                 return (
                    <li key={index}>
                        <div className='news_scroll' >
                            <a href={row.News_Hyperlinks}  target="_blank" >{row.Title}</a>
                            <div className="img_box">
                                {(row.Sector != '-' && row.Sector != 'N/A') &&
                                <p className='sector'>{row.Sector}</p>}
                                {/* //  <input type="text" className='sector' />  */}
                                {row.Img && row.Img !== '-' ? (
                                    <img src={row.Img} alt="news_pic" />
                                ) : (
                                    <img src='https://www.klsescreener.com/v2/img/icon_navbar.png' alt="news_pic" />
                                )}
                            </div>
                            <p className='news_date'>{row.Published_Date}</p>
                        </div>
                       
                    </li>
                 )
                 })}
                 <div className='feed_bottom' onClick={handleLoadMore}>Load More...</div>
            </ul>
        </div>
    );
}
export default NewsFeed;