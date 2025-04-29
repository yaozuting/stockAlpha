import React, { useState,useEffect } from 'react';
import './css/screener.css'
import axios from 'axios';
import Table from '../sortableTable/Table.jsx'

function Screener(){
    const [industry_sector,setIndustrySector] = useState([])
    const sector = industry_sector.flatMap(obj => Object.keys(obj))
    const [stockData, setData] = useState([]);
    const [selectedSector, setselectedSector] = useState('');
    const [selectedIndustry,setSelectedIndustry] = useState('')
    const [IndustryOptions, setIndustryOptions] = useState([]);
    const [capMin,setCapMin] = useState();
    const [capMax,setCapMax] = useState();
    const [submitCondition, setSubmitCondition] = useState({});

    const columns = [
        { label: "Name", accessor: "name" ,sortable:true},
        { label: "Code", accessor: "code" ,sortable:false},
        { label: "Sector", accessor: "sector" ,sortable:true},
        { label: "Industry", accessor: "industry" ,sortable:true},
        { label: "52week", accessor: "52week" ,sortable:false},
        { label: "Price", accessor: "price" ,sortable:true},
        { label: "Change%", accessor: "change" ,sortable:true},
        { label: "Volume", accessor: "volume" ,sortable:true},
        { label: "MCap.(M)", accessor: "MCap" ,sortable:true},
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
    const handleCapMin= (e) =>{
        const value = e.target.value ;
         setCapMin(Number(value));
    }    

    const handleCapMax = (e) => {
        const value = Number(e.target.value);
    
        // Example condition: Check if value is a number and greater than a minimum cap
        if (!isNaN(value) && value >= capMin) {
            setCapMax(value);
        } else {
            // console.log('Invalid value or less than minimum cap');
        }
    };
    const handleSubmitCondition = () => {

        setSubmitCondition({
            sector: selectedSector,
            industry: selectedIndustry,
            min: capMin,
            max: capMax
        })
    }

    

  useEffect(() => {
        // Call the submitCondition function whenever submitCondition changes   
        if (submitCondition) 
            { {
            const params = new URLSearchParams();
        
            if (submitCondition.sector) params.append('sector', submitCondition?.sector);
            if (submitCondition.industry) params.append('industry', submitCondition?.industry);
            if (submitCondition.min) params.append('min', submitCondition?.min);
            if (submitCondition.max) params.append('max', submitCondition?.max);
        
            axios.get(`http://127.0.0.1:5000/api/screener?${params.toString()}`)
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
                        setData(data);
                       
                    } else {
                        console.error('Unexpected data format:', data);
                    }
                    // console.log('Filtered Data:', data);
                })
                .catch((error) => {
                    console.error('Error fetching filtered data:', error);
                });
        }}
       
    }, [submitCondition]);
    


    
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
                                <input data_name='capMin'type="text" placeholder='min' onChange={handleCapMin} required  />
                            </div>
                            <div >
                                <input data_name='cap_max' type="text" placeholder='max' onChange={handleCapMax}required />
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