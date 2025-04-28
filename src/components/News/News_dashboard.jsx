import React ,{useState,useEffect} from 'react';
import NewsFeed from './News_feed.jsx'
import NewsStatistic from './News_statistic.jsx'
import './css/news.css'
import axios from 'axios';

function News() {
    const [newsData,setNewsData] = useState([]);

    useEffect(() => {
        axios.get('http://127.0.0.1:5000/api/news', {
            headers: { 
                'Content-Type': 'application/json; charset=utf-8' 
            }
        })
            .then((response) => {
                let data = response.data;
                console.log('news',data)
                // Check if data is a string and parse it safely
                if (typeof data === 'string') {
                    try {
                        // Replace "NaN" with "null" or "N/A" before parsing
                        data = JSON.parse(data.replace(/NaN/g, '"N/A"'));
                    } catch (error) {
                        console.error('Error parsing data:', error);
                        return;
                    }
                }
    
                // Check if data is an array and set it
                setNewsData(data ? data : {});
                console.log('Parsed Data:', newsData);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    return(
        <>
          <div className='News_container'>
              <NewsFeed news={newsData} />
              <NewsStatistic news={newsData}></NewsStatistic>
          </div>
        </>
    );
}
export default  News;