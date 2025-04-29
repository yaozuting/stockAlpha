import React,{useState,useEffect,lazy,Suspense,useMemo} from "react"
import axios from "axios"
import CompanySearch from "./SearchBar.jsx"
import Alert from '@mui/material/Alert';
import './css/StockDashBoardbottom.css'

const Financial = lazy(()=>import('./CompetitionFinancial.jsx'))
const Fundamental = lazy(()=> import('./CompetitionFundamental.jsx'))

export default function Competition({data}){
    const Tabs = [{id:'Fundament',title:'Fundamental',component:Fundamental},
                  {id:'Financial',title:'Graph',component:Financial}]
    const [selectedTab,setSelectedTab] = useState(Tabs[0].id)
    const[stockCodes,setStockCode] = useState([])
    const[fields,setFields] = useState([
        { id: Date.now(), selectedCompany: null, stockCode: '', competeData: {}, error: '' },
      ]);
    const [showAlert, setShowAlert] = useState({ show: false, message: '' });
    const [isRendering, setIsRendering] = useState(false);
    const [competeDatas, setCompeteDatas] = useState({});
        // Find the active component dynamically
    const ActiveComponent = Tabs.find((item) => item.id === selectedTab)?.component;  
      // Add a new Autocomplete field
  
    const addField = () => {
      if (isRendering) {
        setShowAlert({
          show: true,
          message: "Rendering in progress. Please wait before adding a new field."
        });
        setTimeout(() => setShowAlert({ show: false, message: '' }), 3000);
        return;
      }
      setFields((prev) => [
        ...prev,
        { id: Date.now(), selectedCompany: null, stockCode: '', competeData: {}, error: '' },
      ]);
    };

    // Remove an Autocomplete field and its associated data
   const removeField = (index) => {
    if (isRendering) {
      setShowAlert({
        show: true,
        message: "Rendering in progress. Please wait before removing a field."
      });
      setTimeout(() => setShowAlert({ show: false, message: '' }), 3000);
      return;
    }
    setFields((prev) => {
      const removedField = prev[index];
      const newFields = prev.filter((_, i) => i !== index);
      if (newFields.length === 0) {
        return [
          { id: Date.now(), selectedCompany: null, stockCode: '', competeData: {}, error: '' },
        ];
      }
      setShowAlert({
        show: true,
        message: `Removed company: ${removedField.selectedCompany?.Name || 'Unknown'}`,
      });
      setTimeout(() => setShowAlert({ show: false, message: '' }), 3000);
      return newFields;
    });
  };

  // Handle selection in an Autocomplete field
  const handleSelect = (index, value) => {
    setFields((prev) =>
      prev.map((field, i) =>
        i === index ? { ...field, selectedCompany: value, error: '' } : field
      )
    );
  };

  useEffect(() => {
    setIsRendering(true);

    const fetchData = async () => {
      try {
        const newData = {};
        const baseURL = import.meta.env.VITE_API_BASE_URL;
    
        for (const field of fields) {
          if (field.selectedCompany?.Code) {
            const params = new URLSearchParams();
            params.append('stockCode', field.selectedCompany.Code);
            const response = await axios.get(`${baseURL}/api/stock?${params.toString()}`);
            newData[field.selectedCompany.Code] = response.data[field.selectedCompany?.Code];
          }
        }
        setCompeteDatas(newData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsRendering(false);
      }
    };

    fetchData();
  }, [fields]);

  // const competeDatas = useMemo(() => {
  //   console.log('fields', fields)
  //   const newData = {};
  //   fields.forEach((f) => {
  //     if (f.competeData && typeof f.competeData === 'object') {
  //       Object.entries(f.competeData).forEach(([code, d]) => {
  //         if (!newData[code]) {
  //           newData[code] = d;
  //         }
  //       });
  //     }
  //   });
  //   return newData;
  // }, [fields]);
  
  useEffect(() => {
    const stockCodes = fields.map((field) => field.selectedCompany?.Code).filter(Boolean).join(' ');
    setStockCode(stockCodes);
  }, [fields]);
  console.log('parent', competeDatas);

    return (
        <>
        <div className="tab_compete">
            {Tabs.map((item) => (
                        <button
                            key={item.id}
                            className={selectedTab=== item.id ? "active" : ""}
                            onClick={() => setSelectedTab(item.id)}
                        >
                            {item.title}
                        </button>))}
        </div>

        
        <div>
            {showAlert.show && (
                <Alert
                severity={fields.some((f) => f.error) ? 'error' : 'info'}
                onClose={() => setShowAlert({ show: false, message: '' })}
                sx={{ mb: 2 }}
                >
                {showAlert.message}
                </Alert>
            )}
             
            <div className="company-search-row">
                {fields.map((field, index) => (
                  <div className="company-search-wrapper" key={field.id}>
                    <CompanySearch
                      index={index}
                      selectedCompany={field.selectedCompany}
                      onSelect={handleSelect}
                      onDelete={removeField}
                    />
                  </div>
                ))}
                <div className="company-search-bar">
                  <button onClick={addField} className="add-btn">+</button>
                </div>
              </div>

        </div>

        <div className="container_compete">
            <Suspense fallback={<p>Loading...</p>}>
              <ActiveComponent data={data} stockCodes={stockCodes} competeDatas={competeDatas}></ActiveComponent>
            </Suspense>
        </div>

        </>
    );
}