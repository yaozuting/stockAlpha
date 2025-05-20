import React ,{useState,useEffect} from 'react';
import NewsFeed from './News_feed.jsx'
import NewsStatistic from './News_statistic.jsx'
import './css/news.css'
import axios from 'axios';
import DateSelector from '../tools/DatePicker.jsx';


function News() {
    const [newsData,setNewsData] = useState([]);
    const [startDate,setStartDate] = useState(null)
    const [endDate,setEndDate] = useState(null)
    const [searchText,setSearchText] = useState('')
    const [searchSector,setSearchSector] = useState('')
    const baseURL = import.meta.env.VITE_API_BASE_URL;
    const [isClicked,setIsClicked] = useState(false)

    const industries = [
      'Construction',
      'Property',
      'Consumer Products & Services',
      'Energy',
      'Financial Services',
      'Health Care',
      'Industrial Products & Services',
      'Plantation',
      'Property',
      'REIT',
      'Technology',
      'Telecommunications & Media',
      'Transportation & Logistics',
      'Utilities',
      'Unknown'
    ]

    useEffect(() => {
        // Use environment variable for the base URL
    
        axios.get(`${baseURL}/api/news`, {
            headers: { 
                'Content-Type': 'application/json; charset=utf-8' 
            }
        })
            .then((response) => {
                let data = response.data;
                console.log('news', data);
    
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
    
                // Check if data is valid and set it
                setNewsData(data ? data : {});
                console.log('Parsed Data:', newsData);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);
    const searchForm = (
     <div className="search-container">

         <span  title='Filtering'   onClick={()=> setIsClicked(prev => !prev)}class="material-symbols-outlined">search</span>

       
        {isClicked && 
          <form onSubmit={(e) => {
              e.preventDefault(); // Prevent page reload
            
              const filters = {
                  keyword: searchText ? searchText :null,
                  sector: searchSector ? searchSector :null,
                  start_date: startDate ? startDate.toISOString() : null,
                  end_date: endDate ? endDate.toISOString(): null
                };
            
              axios.post(`${baseURL}/api/news`, filters, {
                headers: {
                  'Content-Type': 'application/json; charset=utf-8',
                },
              })
              .then((response) => {
                setNewsData(response.data);
                console.log('response',response)
              })
              .catch((error) => {
                console.error("Error fetching filtered news:", error);
              });
            }}>
              <div>
                <label>Keyword : </label>
                <input type="text" placeholder="Search..." value={searchText} onChange={(e) => setSearchText(e.target.value)} />
             </div> 
              
            <div>
              <label>Sector : </label>
              <select
                name="sector-options"
                id="sector-options"
                value={searchSector} // Bind the state to the select element
                onChange={(e) => setSearchSector(e.target.value)} // Update state on change
              >
                
                <option value="">--Select--</option>
                {industries.map((element, index) => (
                  <option key={index} value={element}>{element}</option>
                ))}
              </select>
            </div>
            <div className="date-range">
              <label>Start Date : </label>
              <DateSelector setDate={setStartDate} />
            
              <label>End Date : </label>
              <DateSelector setDate={setEndDate} />
            </div>
              <button type="submit"><span class="material-symbols-outlined">
search_insights
</span></button>
             
            </form>
          }
        </div>
      );
      
      return (
        <>
          <div className="News_container">
            {searchForm}
            {Array.isArray(newsData?.news) && newsData.news.length > 0  ? (
              <>
                <NewsFeed news={newsData} />
                <NewsStatistic news={newsData} />
              </>
            ) : (
              <p>No data found</p>
            )}
          </div>
        </>
      );
}
export default  News;
