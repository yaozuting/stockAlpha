import React, { useState, useEffect } from "react";
import FinancialChart from "./FinancialChart";
import { balanceSheetItems, incomeItems, cashFlowData } from "./FinancialData.jsx";
import './css/StockDashBoardbottom.css';

export default function Financial({ data }) {
  const [stockData, setStockData] = useState({});
  const [showData, setShowData] = useState([]);
  const [Showed, setShowed] = useState({});

  const validateData = (clickedItem, data) => {
    const allInvalid = data.every(val => val == null || val === '' || isNaN(val));
    if (allInvalid) {
      alert(`${clickedItem} is not found.`);
      return false;
    }
    return true;
  };

  const handleClickBS = (e) => {
    let clickedItem = e.target.textContent;
    let search_data = balanceSheetItems[clickedItem];
    let data = stockData.balance_sheet.map(obj => obj[search_data]);
    let date = stockData.balance_sheet.map(obj => obj.asOfDate);

    if (!validateData(clickedItem, data)) return;

    setShowData(prevState => {
      if (prevState[clickedItem]) {
        const newState = { ...prevState };
        delete newState[clickedItem];
        return newState;
      } else {
        return {
          ...prevState,
          [clickedItem]: { 'value': [data], 'dates': [date] }
        };
      }
    });
  };

  const handleClickIS = (e) => {
    let clickedItem = e.target.textContent;
    let search_data = incomeItems[clickedItem];
    let data = stockData.income_statement.map(obj => obj[search_data]);
    let date = stockData.income_statement.map(obj => obj.asOfDate);

    if (!validateData(clickedItem, data)) return;

    setShowData(prevState => {
      if (prevState[clickedItem]) {
        const newState = { ...prevState };
        delete newState[clickedItem];
        return newState;
      } else {
        return {
          ...prevState,
          [clickedItem]: { 'value': [data], 'dates': [date] }
        };
      }
    });
  };

  const handleClickCF = (e) => {
    let clickedItem = e.target.textContent;
    let search_data = cashFlowData[clickedItem];
    let data = stockData.cash_flow.map(obj => obj[search_data]);
    let date = stockData.cash_flow.map(obj => obj.asOfDate);

    if (!validateData(clickedItem, data)) return;

    setShowData(prevState => {
      if (prevState[clickedItem]) {
        const newState = { ...prevState };
        delete newState[clickedItem];
        return newState;
      } else {
        return {
          ...prevState,
          [clickedItem]: { 'value': [data], 'dates': [date] }
        };
      }
    });
  };

  useEffect(() => {
    if (data) {
      setStockData(data);
      setShowData([])
    }
  }, [data]);

  const convertedShowData = Object.entries(showData).map(([name, data]) => {
    const rawDates = data.dates[0];
    const rawValues = data.value[0];

    const monthDayMap = {};
    rawDates.forEach(date => {
      const dt = new Date(date);
      const key = String(dt.getMonth() + 1).padStart(2, '0') + '-' + String(dt.getDate()).padStart(2, '0');
      monthDayMap[key] = (monthDayMap[key] || 0) + 1;
    });

    const majorityMonthDay = Object.keys(monthDayMap).reduce((a, b) =>
      monthDayMap[a] > monthDayMap[b] ? a : b
    );

    const filteredData = rawDates.map((date, index) => {
      const dt = new Date(date);
      const month = dt.getMonth() + 1;
      const day = dt.getDate();
      const [majorMonth, majorDay] = majorityMonthDay.split('-').map(Number);
      const monthDiff = Math.abs(month - majorMonth);
      const dayDiff = Math.abs(day - majorDay);

      if (monthDiff <= 1 && dayDiff <= 5) {
        return {
          date: dt,
          year: dt.getFullYear(),
          value: rawValues[index]
        };
      } else {
        return null;
      }
    }).filter(x => x !== null);

    filteredData.sort((a, b) => a.date - b.date);

    const yearMap = {};
    filteredData.forEach(entry => {
      if (!yearMap[entry.year] || entry.date > yearMap[entry.year].date) {
        yearMap[entry.year] = entry;
      }
    });

    const sortedYears = Object.keys(yearMap).sort((a, b) => a - b);

    return {
      name: name,
      dates: sortedYears.map(year => yearMap[year].date.toISOString().split('T')[0]),
      values: sortedYears.map(year => yearMap[year].value)
    };
  });

  return (
    <div className="financial_container">
      <div className="financial_select">
        <ul>
          <p className="financial_title">Balance Sheet</p>
          {Object.keys(balanceSheetItems).map((item, index) => (
            <li
              key={index}
              onClick={handleClickBS}
              className={index % 2 === 0 ? 'even-row' : 'odd-row'}
            >
              {item.replace(/([a-z])([A-Z])/g, '$1 $2')}
            </li>
          ))}
          <p className="financial_title">Income Statement</p>
          {Object.keys(incomeItems).map((item, index) => (
            <li
              key={index}
              onClick={handleClickIS}
              className={index % 2 === 0 ? 'even-row' : 'odd-row'}
            >
              {item.replace(/([a-z])([A-Z])/g, '$1 $2')}
            </li>
          ))}
          <p className="financial_title">Cash Flow</p>
          {Object.keys(cashFlowData).map((item, index) => (
            <li
              key={index}
              onClick={handleClickCF}
              className={index % 2 === 0 ? 'even-row' : 'odd-row'}
            >
              {item.replace(/([a-z])([A-Z])/g, '$1 $2')}
            </li>
          ))}
        </ul>
      </div>

      {(convertedShowData && convertedShowData.length > 0) ?(
        <div className="financial-chart-table">
          <div className="header-row" >
            <button className="refresh-button" onClick={() => {
              setShowData([]);
              setShowed({});
            }}><span class="material-symbols-outlined">refresh</span></button>
          </div>

          <div className="financial-chart-wrapper">
            <FinancialChart
              graph_text="Financial Overview"
              showData={convertedShowData}
            />
          </div>

          <div>
            <table className="financial-table">
              <thead>
                <tr>
                  <th>(MYR/Million)</th>
                  {convertedShowData[0]?.dates.map((date, index) => (
                    <th key={index}>{date}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {convertedShowData.map((item, idx) => (
                  <React.Fragment key={idx}>
                    {/* Main row */}
                    <tr onClick={() => setShowed(prev => ({ ...prev, [item.name]: !prev[item.name] }))}>
                      <td><b>{item.name}</b></td>
                      {item?.values?.map((value, vIdx) => (
                        isNaN(value) ? null : (
                          <td key={vIdx}>
                            {(value / 1_000_000).toFixed(2)}
                          </td>
                        )
                      ))}
                    </tr>

                    {/* Expanded row for YoY growth */}
                    {Showed[item.name] && (
                      <tr className="yoy-growth-row">
                        <td  style={{
                              fontSize: '0.8em',
                              textAlign: 'right'
                          }}>YoY Growth</td>

                        {item.values.map((value, vIdx) => {
                          if (vIdx === 0) {
                            return <td key={vIdx}>-</td>;
                          }
                          const prevValue = item.values[vIdx - 1];
                          if (prevValue === 0 || isNaN(value) || isNaN(prevValue)) {
                            return <td key={vIdx}></td>;
                          }
                          const yoyGrowth = ((value / prevValue - 1) * 100).toFixed(2);
                          return (
                            <td key={vIdx}  style={{
                              fontSize: '0.8em',
                              color: yoyGrowth >= 0 ? 'green' : 'red',
                              textAlign: 'center'
                          }}>
                              {yoyGrowth}%
                            </td>
                          );
                        })}
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ):<div><h4>No item was Seleted</h4></div>}
    </div>
  );
}
