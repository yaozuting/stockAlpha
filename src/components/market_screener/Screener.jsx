import React, { useState,useEffect } from 'react';
import './css/screener.css'
import axios from 'axios';
import Table from '../sortableTable/Table.jsx'

function Screener({marketData}){
    const [industry_sector,setIndustrySector] = useState([])
    const [market,setMarket] = useState([])
    const sector = industry_sector.flatMap(obj => Object.keys(obj))
    const [stockData, setData] = useState([]);
    const [selectedSector, setselectedSector] = useState('');
    const [selectedIndustry,setSelectedIndustry] = useState('')
    const [IndustryOptions, setIndustryOptions] = useState([]);
    const [capMin,setCapMin] = useState('');
    const [capMax,setCapMax] = useState('');
    const [submitCondition, setSubmitCondition] = useState({});

    const columns = [
        { label: "Name", accessor: "name" ,sortable:true},
        { label: "Code", accessor: "code" ,sortable:false},
        { label: "Sector", accessor: "sector" ,sortable:false},
        { label: "Industry", accessor: "industry" ,sortable:false},
        { label: "52week", accessor: "52week" ,sortable:false},
        { label: "Price", accessor: "price" ,sortable:true},
        { label: "Change", accessor: "Change" ,sortable:true},
        { label: "Change%", accessor: "change" ,sortable:true},
        { label: "Volume", accessor: "volume" ,sortable:true},
        { label: "MCap.(M)", accessor: "MCap" ,sortable:true},
        { label: "Weighted Volume", accessor: "Weighted Volume" ,sortable:true},
    ];
    useEffect(() => {
        // Use environment variable for the base URL
        const baseURL = import.meta.env.VITE_API_BASE_URL;

    
        axios.get(`${baseURL}/api/SectorIndustry`)
            .then((response) => {
                let data = response.data;
    
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
                setIndustrySector(Array.isArray(data) ? data : []);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);


   
    const handleSectorChange = (e) => {
        const selectedValue = e.target.value;
            setselectedSector(selectedValue);
            setSelectedIndustry('')
            // Find the corresponding sectors for the selected industry
            const result = industry_sector.find(obj => obj.hasOwnProperty(selectedValue));
            setIndustryOptions(result ? result[selectedValue] : []);
        };
    const handleIndustry = (e) =>{
        const selectedValue = e.target.value;
        setSelectedIndustry(selectedValue);
    }
    const handleCapMin = (e) => {
        const value = e.target.value;
        setCapMin(value); // allow both numbers and empty string
    };
    
    const handleCapMax = (e) => {
        const value = e.target.value;
        setCapMax(value); // same here
    };
    
    const handleSubmitCondition = () => {
        const min = parseFloat(capMin);
        const max = parseFloat(capMax);
        
        setSubmitCondition({
            sector: selectedSector,
            industry: selectedIndustry,
            min: isNaN(min) ? '' : min,
            max: isNaN(max) ? '' : max,
        });
    }
    
    useEffect(() => {
           if (!marketData || !marketData.length) return;
     
           // Safely create a copy of each item with 'WEIGHTED VOLUME'
           const editedData = marketData.map((item) => ({
              ...item,
              'Weighted Volume': Number(item['Price']) * Number(item['Volume'].replace(',','')),
           }));
       
           // Sort in descending order of 'Weighted Volume'
           const sortedData = editedData.sort((a, b) => b['Weighted Volume'] - a['Weighted Volume']);
     
     
           setMarket(sortedData);
    }, [marketData]);
    

    useEffect(() => {
        if (!market?.length) return;
       console.log(submitCondition)
      
       const filteredData = market.filter((item) => {
        const cap = item['MCap.(M)'].replace(',','');
        const marketCap = parseFloat(cap);
        const min = parseFloat(submitCondition.min);
        const max = parseFloat(submitCondition.max);
      
        console.log(typeof marketCap,typeof min)
        console.log(marketCap >= min)
        const sector = item.Sector?.trim().toLowerCase();
        const selectedSector = submitCondition.sector?.trim().toLowerCase();

        const industry = item.Industry?.trim().toLowerCase();
        const selectedIndustry = submitCondition.industry?.trim().toLowerCase();

        return (
          (!selectedSector || sector === selectedSector) &&
          (!selectedIndustry || industry === selectedIndustry) &&
          (isNaN(min) || marketCap >= min) &&
          (isNaN(max) || marketCap <= max)
        );
      });
    setData(filteredData)
    //   initialize
   
  
      }, [submitCondition, marketData]);
      


    
    return (
        <>
        <div className="screener_container">
            <div className="select-menu">
                    <p><strong>Profile</strong></p>           
                    <div className="row odd">
                        <label for="Sector">Sector:</label>
                        <select
                            name="Sector"
                            data-name="Sector"
                            value={selectedSector}
                            onChange={handleSectorChange}
                        >
                        <option value=""></option>
                        {sector.map((industry, index) => (
                                <option key={index} value={industry}>{industry} </option>))}
                        </select>
                    </div>
                    <div className="row even">
                        <label for="industry">Industry:</label>
                        <select name="industry" data-name="industry" onChange={handleIndustry}>
                            <option value=""></option>
                            {IndustryOptions.map((industry, index) => (
                                <option key={index} value={industry}>
                                    {industry}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="row odd">
                        <label for="market-cap">Market Capitalization(M):</label>
                        <div className="input-number">
                            <div>
                                <input data_name='capMin'type="number" placeholder='min' value={capMin} onChange={handleCapMin}   />
                            </div>
                            <div >
                                <input data_name='cap_max' type="number"  value={capMax}placeholder='max' onChange={handleCapMax}/>
                            </div>
                        </div>
                    </div>
                    <div className="buttons">
                        {/* <button className='reset' onClick={reset}>Reset</button> */}
                        <button className='submit' onClick={handleSubmitCondition}>Submit</button>
                    </div>
            </div>
        
            <div className="table_container">
                 <Table df={stockData} columns={columns}/>
            </div>
         </div>
        </>
    )
}

export default Screener
