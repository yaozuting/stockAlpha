import { balanceSheetItems, incomeItems, cashFlowData } from "./FinancialData.jsx";
import React,{useEffect,useState} from 'react';
import FinancialChart from "./CompetitionChart.jsx";
import './css/StockDashBoardbottom.css'

function CompetitionFinancial({data,stockCodes,competeDatas}){
   console.log(competeDatas)
    const [clickedFinancial,setClickedFinancial] = useState({})
    const [showFinancial,setShowFinancial] = useState([]);
    const[isShowed,setIsShowed] = useState({})
    const [openedRow, setOpenedRow] = useState(null);
    const handleRowClick = (companyName) => {
      setOpenedRow(prev => (prev === companyName ? null : companyName));
    };

    const handleClick = (item, financialStatement) => {
        setClickedFinancial((prevState) => {
          const sublist = prevState[financialStatement] || [];
      
          // Check if sublist is empty (optional)
          if (sublist.length === 0) {
            return {
              ...prevState,
              [financialStatement]: [{ [item]: true }],
            };
          }
      
          const index = sublist.findIndex(obj => Object.keys(obj)[0] === item);
      
          if (index !== -1) {
            // Toggle value
            const updated = [...sublist];
            const key = Object.keys(updated[index])[0];
            const value = updated[index][key];
            updated[index] = { [key]: !value };
            return {
              ...prevState,
              [financialStatement]: updated,
            };
          } else {
            // Add new item
            return {
              ...prevState,
              [financialStatement]: [...sublist, { [item]: true }],
            };
          }
        });
        console.log(clickedFinancial)
      };
      
    
      useEffect(() => {
        if (!competeDatas || Object.keys(competeDatas).length === 0) {
            return;
        }
    
        const stockCodesArray = stockCodes?.split(' ').map(code => code.trim());
    
        if (clickedFinancial) {
            Object.entries(clickedFinancial).forEach(([statement, itemList]) => {
                itemList.forEach((itemObj) => {
                    const itemKey = Object.keys(itemObj)[0];
                    const isSelected = itemObj[itemKey];
    
                    if (!isSelected) {
                        // Deselect
                        setShowFinancial((prevState) => {
                            const newState = { ...prevState };
                            delete newState[itemKey];
                            return newState;
                        });
                        return;
                    }
    
                    // ✅ Check if the data exists for ALL companies
                    const temp = [];
    
                    // First company (self)
                    const selfValues = data?.[statement]?.map(obj => obj[itemKey]);
                    const selfDates = data?.[statement]?.map(obj => obj.asOfDate);
                    const selfName = data?.price?.longName;
    
                    temp.push({
                        itemKey,
                        name: selfName,
                        value: selfValues,
                        date: selfDates,
                    });
    
                    let allInvalid = selfValues.every(val => val == null || val === '' || isNaN(val));
    
                    // Competing companies
                    stockCodesArray.forEach((code) => {
                        const codeStatement = competeDatas[code]?.[statement];
                        if (!codeStatement) return;
    
                        const values = codeStatement.map(obj => obj[itemKey]);
                        const dates = codeStatement.map(obj => obj.asOfDate);
                        const name = competeDatas[code]?.price?.longName;
    
                        temp.push({
                            itemKey,
                            name,
                            value: values,
                            date: dates,
                        });
    
                        if (values) {
                            const isAllInvalidForThis = values.every(val => val == null || val === '' || isNaN(val));
                            allInvalid = allInvalid && isAllInvalidForThis;
                        }
                    });
    
                    // ✅ If ALL companies invalid, alert user and cancel
                    if (allInvalid) {
                        alert(`${itemKey} is not found for any company.`);
                        setClickedFinancial((prevState) => {
                            const newState = { ...prevState };
                            if (newState[statement]) {
                                newState[statement] = newState[statement].filter(obj => Object.keys(obj)[0] !== itemKey);
                                if (newState[statement].length === 0) {
                                    delete newState[statement];
                                }
                            }
                            return newState;
                        });
                        return; // 🚫 Do not add invalid item
                    }
    
                    // ✅ Otherwise add to showFinancial
                    setShowFinancial((prevState) => ({
                        ...prevState,
                        [itemKey]: temp,
                    }));
                    console.log(showFinancial)
                });
            });
        }
    }, [clickedFinancial, Object.keys(competeDatas).length]);
    
    
    
    return(
        <div className="financial_container">
     
            <div className="financial_select">
                <ul>
                    <p className="financial_title">Balance Sheet</p>
                    {Object.entries(balanceSheetItems).map(([key, value], index) => (
                        <li key={index}  className={index % 2 === 0 ? 'even-row' : 'odd-row'} onClick={() => handleClick(value,'balance_sheet')}>
                            {key.replace(/([a-z])([A-Z])/g, '$1 $2')}
                        </li>
                    ))}
                    <p className="financial_title">Income Statement</p>
                    {Object.entries(incomeItems).map(([key, value], index) => (
                        <li key={index}  className={index % 2 === 0 ? 'even-row' : 'odd-row'} onClick={() => handleClick(value,'income_statement')}>
                            {key.replace(/([a-z])([A-Z])/g, '$1 $2')}
                        </li>
                    ))}
                    <p className="financial_title">Income Statement</p>
                    {Object.entries(cashFlowData).map(([key, value], index) => (
                        <li key={index}  className={index % 2 === 0 ? 'even-row' : 'odd-row'} onClick={() => handleClick(value,'cash_flow')}>
                            {key.replace(/([a-z])([A-Z])/g, '$1 $2')}
                        </li>
                    ))}
                </ul>
            </div>
            {(showFinancial && Object.keys(showFinancial).length >0 )?
            <div className="financial-chart-table">
                <div className="header-row">
                    <button className="refresh-button" onClick={() =>{
                        setShowFinancial({});
                        setClickedFinancial({});}}>
                        <span className="material-symbols-outlined">refresh</span>
                    </button>
                </div>
                
                <div>
                    <table className="financial-table">
                    <thead>
                        <tr>
                        <th>Annualized Growth</th>
                        {(() => {
                            const key = Object.keys(showFinancial)[0];
                            const allNames = Array.from(
                            new Set(showFinancial[key]?.flatMap(entry => entry.name))
                            );
                            return allNames.map((name, index) => (
                            <th key={index}>{name}</th>
                            ));
                        })()}
                        </tr>
                    </thead>

                    <tbody>
                        {Object.entries(showFinancial).map(([itemKey, entries]) => {
                        const allNames = Array.from(
                            new Set(entries.flatMap(entry => entry.name))
                        );

                        const combinedDataName = allNames.map(name => {
                            const row = { name };
                        
                            // Group entries by name
                            const nameEntries = entries.filter(entry => entry.name === name);
                        
                            // Flatten all dates to compare MM-DD patterns across years
                            const allDates = nameEntries.flatMap(entry => entry.date.map(d => new Date(d)));
                            const allMonthDay = allDates.map(d => `${d.getMonth()}-${d.getDate()}`);
                            
                            nameEntries.forEach(entry => {
                                entry.date.forEach((dateStr, idx) => {
                                    const date = new Date(dateStr);
                                    const year = date.getFullYear();
                                    const monthDay = `${date.getMonth()}-${date.getDate()}`;
                        
                                    // Check if this MM-DD exists in other years too
                                    const sameMonthDayCount = allMonthDay.filter(md => md === monthDay).length;
                        
                                    if (sameMonthDayCount > 1) {
                                        // If MM-DD appears in multiple years, use this value
                                        row[year] = entry.value[idx];
                                    } else {
                                        // Only set if not already set (prefer exact MM-DD matches across years)
                                        if (!row[year]) {
                                            row[year] = entry.value[idx];
                                        }
                                    }
                                });
                            });
                        
                            return row;
                        });
                        

                        const allDates = Array.from(
                            new Set(entries.flatMap(entry => entry.date.map(date => new Date(date).getFullYear())))
                        ).sort((a, b) => a - b);

                        const combinedData = allDates.map(date => {
                            const row = { date };
                            entries.forEach(entry => {
                            const dateIndex = entry.date.findIndex(d => new Date(d).getFullYear() === date);
                            row[entry.name] = dateIndex !== -1 ? entry.value[dateIndex] : null;
                            });
                            return row;
                        });

                        return (
                            <React.Fragment key={itemKey}>
                            <tr   onClick={() => setIsShowed(prev => ({ ...prev, [itemKey]: !prev[itemKey] }))}>
                                <td >{itemKey.replace(/([a-z])([A-Z])/g, '$1 $2')}</td>

                                {combinedDataName.map((item, index) => {
                                const dates = Object.keys(item).filter(key => key !== 'name');
                                const biggestDate = dates.reduce((latest, current) => (
                                    new Date(current) > new Date(latest) ? current : latest
                                ));
                                const lowestDate = dates.reduce((earliest, current) => (
                                    new Date(current) < new Date(earliest) ? current : earliest
                                ));
                                const annualizedGrowth = (() => {
                                    const startValue = item[lowestDate];
                                    const endValue = item[biggestDate];
                                    const years = new Date(biggestDate).getFullYear() - new Date(lowestDate).getFullYear();
                                    if (startValue && endValue && years > 0) {
                                        return ((Math.pow(endValue / startValue, 1 / years) - 1) * 100).toFixed(2);
                                    }
                                    return NaN; // Return NaN if calculation is not possible
                                })();
                                
                                return (
                                    <td key={index}>
                                        {isNaN(annualizedGrowth) ? 'Not Valid' : `${annualizedGrowth}%`}
                                    </td>
                                );
                                })}
                            </tr>

                            {isShowed[itemKey] && (
                                <>
                                <tr className="no-border-chart">
                                    <td></td>
                                    <td colSpan={allNames.length + 1} >
                                    <div className="chart-container">
                                        <FinancialChart key={itemKey} showData={combinedData} />
                                    </div>
                                    </td>
                                </tr>

                                <tr className="no-border-financial">
                                    <td></td>
                                    <td colSpan={allNames.length + 1}>
                                    <table className="financial-table">
                                        <thead>
                                        <tr>
                                           
                                            <th>(MYR/Million)</th>
                                            {allDates.map(item => (
                                            <th key={item}>{item}</th>
                                            ))}
                                        </tr>
                                        </thead>

                                        <tbody>
                                        {combinedDataName.map((item, rowIdx) => (
                                            <React.Fragment key={rowIdx}>
                                            {/* Value Row */}
                                            <tr onClick={() => handleRowClick(item.name)} className="clickable-row">
                                                <td>{item.name}</td>
                                                {allDates.map((date, idx) => {
                                                const currentValue = item[date] !== undefined ? item[date] : null;
                                                return (
                                                    <td key={idx}>
                                                    {currentValue !== undefined && currentValue !== null
                                                        ? (currentValue / 1_000_000).toFixed(2)
                                                        : ''}
                                                    </td>

                                                );
                                                })}
                                            </tr>

                                            {/* YoY Growth Row */}
                                            {openedRow === item.name && (
                                                <tr className='yoy-growth-row'>
                                                <td  style={{
                                                    fontSize: '0.8em',
                                                    textAlign: 'right'
                                                }}>YoY Growth</td>
                                                <td></td>
                                                {allDates.slice(1).map((date, idx) => {
                                                    try {
                                                    const currentValue = item[date] !== undefined ? item[date] : 'N/A';
                                                    const prevDate = allDates[idx];
                                                    const prevValue = item[prevDate] !== undefined ? item[prevDate] : 'N/A';

                                                    if (isNaN(currentValue) || isNaN(prevValue) || prevValue === 0) {
                                                        throw new Error('Invalid data for growth calculation');
                                                    }

                                                    const growthYoY = ((currentValue / prevValue) - 1).toFixed(2);
                                                    return (
                                                        <td
                                                        key={idx}
                                                        className={`yoy-growth-value ${growthYoY >= 0 ? 'positive' : 'negative'}`}
                                                        style={{textAlign:'center'}}
                                                        >
                                                        {growthYoY}
                                                        </td>
                                                    );
                                                    } catch (error) {
                                                    console.error(`Error calculating YoY growth for ${date}:`, error.message);
                                                    return (
                                                        <td key={idx} className="yoy-growth-value"></td>
                                                    );
                                                    }
                                                })}
                                                </tr>
                                            )}
                                            </React.Fragment>
                                        ))}
                                        </tbody>
                                    </table>
                                    </td>
                                </tr>
                                </>
                            )}
                            </React.Fragment>
                        );
                        })}
                    </tbody>
                    </table>
             </div>
            </div>:<div><h4>No item was selected</h4></div>}
        </div>
 )};



export default CompetitionFinancial

