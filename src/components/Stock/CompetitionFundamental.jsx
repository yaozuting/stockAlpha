import React, { useEffect, useState } from "react";
import './css/StockDashBoardbottom.css'
import { all } from "axios";

export default function CompetitionFundamental({ data, stockCodes, competeDatas }) {
  const [expandedRows, setExpandedRows] = useState({});
  const [allData, setAllData] = useState(null);

  const toggleRow = (key) => {
    setExpandedRows(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  useEffect(() => {
    console.log('child', data);

    const incomeStatements = [
      (() => {
        const dates = data.income_statement?.map(obj => obj.asOfDate).filter(Boolean);
        const latest = dates?.sort((a, b) => new Date(b) - new Date(a))?.[0];
        return data.income_statement?.find(obj => (obj.periodType === 'TTM' || obj.periodType === '12M') && obj.asOfDate === latest);
      })(),
      ...Object.entries(competeDatas).map(([_, item]) => {
        const dates = item?.income_statement?.map(obj => obj.asOfDate).filter(Boolean);
        const latest = dates?.sort((a, b) => new Date(b) - new Date(a))?.[0];
        return item?.income_statement?.find(obj => (obj.periodType === 'TTM' || obj.periodType === '12M') && obj.asOfDate === latest);
      }).filter(Boolean)
    ];

    const balanceSheet = [
      data.balance_sheet_quarter?.at(-1),
      ...Object.entries(competeDatas).map(([_, item]) => item?.balance_sheet_quarter?.at(-1)).filter(Boolean)
    ];

    const cashFlows = [
      (() => {
        const dates = data.cash_flow?.map(obj => obj.asOfDate).filter(Boolean);
        const latest = dates?.sort((a, b) => new Date(b) - new Date(a))?.[0];
        return data.cash_flow?.find(obj => (obj.periodType === 'TTM' || obj.periodType === '12M') && obj.asOfDate === latest);
      })(),
      ...Object.entries(competeDatas).map(([_, item]) => {
        const dates = item?.cash_flow?.map(obj => obj.asOfDate).filter(Boolean);
        const latest = dates?.sort((a, b) => new Date(b) - new Date(a))?.[0];
        return item?.cash_flow?.find(obj => (obj.periodType === 'TTM' || obj.periodType === '12M') && obj.asOfDate === latest);
      }).filter(Boolean)
    ];

    const stockNames = [
      data.price.shortName,
      ...Object.entries(competeDatas).map(([_, item]) => item?.price?.shortName).filter(Boolean)
    ];

    const marketCaps = [
      data.summary_detail?.marketCap ?? 0,
      ...Object.entries(competeDatas).map(([_, item]) => item?.summary_detail?.marketCap ?? 0)
    ];

    const sectors = [
      data.summary_profile?.sector ?? '-',
      ...Object.entries(competeDatas).map(([_, item]) => item?.summary_profile?.sector ?? '-')
    ];

    const websites = [
      (() => {
        const url = data.summary_profile?.website;
        if (!url) return '-';
        try {
          const urlObj = new URL(url);
          return { url, display: urlObj.hostname.replace(/^www\./, '') };
        } catch {
          return '-';
        }
      })(),
      ...Object.entries(competeDatas).map(([_, item]) => {
        const rawURL = item?.summary_profile?.website;
        if (!rawURL) return '-';
        try {
          const urlObj = new URL(rawURL);
          return { url: rawURL, display: urlObj.hostname.replace(/^www\./, '') };
        } catch {
          return '-';
        }
      })
    ];

    const combined = marketCaps.map((cap, index) => ({
      stockName: stockNames[index],
      marketCap: cap,
      incomeStatement: incomeStatements[index],
      balanceSheet: balanceSheet[index],
      cashFlow: cashFlows[index],
      sector: sectors[index],
      website: websites[index],
    }));

    combined.sort((a, b) => b.marketCap - a.marketCap);
    setAllData(combined);

  }, [data, competeDatas]);

  const profitabilityMetrics = allData?.map((d) => {
    const revenue = d?.incomeStatement?.TotalRevenue ?? 0;
    const grossProfit = d?.incomeStatement?.GrossProfit ?? 0;
    const netIncome = d?.incomeStatement?.NetIncome ?? 0;
    const ebit = d?.incomeStatement?.EBIT ?? 0;
    const pretaxIncome = d?.incomeStatement?.PretaxIncome ?? 0;
    const cashFlowFromOps = d?.cashFlow?.OperatingCashFlow ?? 0;
    const totalAssets = d?.balanceSheet?.TotalAssets ?? 0;
    const totalEquity = d?.balanceSheet?.TotalEquity ?? d?.balanceSheet?.StockholdersEquity ?? 0;
    const investedCapital = (d?.balanceSheet?.TotalDebt ?? 0) + (totalEquity || 0);

    return {
      "Gross Margin (%)": revenue ? (grossProfit / revenue) * 100 : null,
      "Operating Margin (%)": revenue ? (ebit / revenue) * 100 : null,
      "Pretax Margin (%)": revenue ? (pretaxIncome / revenue) * 100 : null,
      "Net Profit Margin (%)": revenue ? (netIncome / revenue) * 100 : null,
      "Cash Flow Margin (%)": revenue ? (cashFlowFromOps / revenue) * 100 : null,
      "Return on Assets (ROA) (%)": totalAssets ? (netIncome / totalAssets) * 100 : null,
      "Return on Equity (ROE) (%)": totalEquity ? (netIncome / totalEquity) * 100 : null,
      "Return on Invested Capital (ROIC) (%)": investedCapital ? (netIncome / investedCapital) * 100 : null,
    };
  });

  const leverageLiquidityMetrics = allData?.map((d) => {
    const ca = d?.balanceSheet?.CurrentAssets ?? 0;
    const cl = d?.balanceSheet?.CurrentLiabilities ?? 0;
    const ta = d?.balanceSheet?.TotalAssets ?? 0;
    const tl = d?.balanceSheet?.TotalLiabilities ?? 0;
    const te = d?.balanceSheet?.TotalEquity ?? d?.balanceSheet?.StockholdersEquity ?? 0;
    const td = d?.balanceSheet?.TotalDebt ?? 0;
    const inventory = d?.balanceSheet?.Inventory ?? 0;
    const ebit = d?.incomeStatement?.EBIT ?? 0;
    const iexp = d?.incomeStatement?.InterestExpense ?? 0;

    return {
      "Current Ratio": cl ? ca / cl : null,
      "Quick Ratio": cl ? (ca - inventory) / cl : null,
      "Debt-to-Equity Ratio": te ? td / te : null,
      "Debt-to-Assets Ratio": ta ? td / ta : null,
      "Equity Ratio": ta ? te / ta : null,
      "Asset Coverage Ratio": ta ? (ta - inventory) / td : null,
      "Leverage Ratio": te ? ta / te : null,
      "Interest Coverage Ratio": iexp !== 0 ? ebit / iexp : null,
    };
  });

  const valuationMetrics = allData?.map((d) => {
    const mc = d?.marketCap ?? 0;
    const ni = d?.incomeStatement?.NetIncome ?? 0;
    const rev = d?.incomeStatement?.TotalRevenue ?? 0;
    const eq = d?.balanceSheet?.TotalEquity ?? d?.balanceSheet?.StockholdersEquity ?? 0;
    const ebitda = d?.incomeStatement?.EBITDA ?? 0;
    const ebit = d?.incomeStatement?.EBIT ?? 0;
    const td = d?.balanceSheet?.TotalDebt ?? 0;
    const cash = d?.balanceSheet?.CashAndCashEquivalents ?? 0;
    const ev = mc + td - cash;

    return {
      "Price to Earnings (P/E)": ni ? mc / ni : null,
      "Price to Sales (P/S)": rev ? mc / rev : null,
      "Price to Book (P/B)": eq ? mc / eq : null,
      "EV/EBITDA": ebitda ? ev / ebitda : null,
      "EV/EBIT": ebit ? ev / ebit : null,
      "Earnings Yield (%)": mc ? (ni / mc) * 100 : null,
    };
  });

  const sectionMetricsMap = {
    "Income Statement": profitabilityMetrics,
    "Balance Sheet": leverageLiquidityMetrics,
    "Valuation": valuationMetrics,
  };

    
  
      
      return (
        <>
        <div className="financials-wrapper">
              {/* Market Cap Table */}
              <div className="financial-grid">
                <table className="financial-table-fundamental">
                  <thead>
                    <tr className="sticky-header">
                      <th>(MYR/Million)</th>
                      {allData?.map((data, index) => (
                        <th key={index}>{data.stockName}</th>
                      ))}
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Sector</td>
                      {allData?.map((data, idx) => (
                        <td key={idx}>{data.sector || '-'}</td>
                      ))}
                      <td></td>
                    </tr>
                    <tr>
                      <td>Website</td>
                      {allData?.map((data, idx) => (
                        <td key={idx}>
                          {data.website.url ? (
                            <a href={data.website.url} target="_blank" rel="noopener noreferrer">
                              url
                            </a>
                          ) : '-'}
                        </td>
                      ))}
                      <td></td>
                
                    </tr>
                    <tr className="highlight-row" onClick={() => toggleRow('marketCap')}>
                      <td>Market Cap (in Millions)</td>
                      {allData?.map((data, idx) => (
                        <td key={idx}>
                          {data.marketCap ? (data.marketCap / 1_000_000).toLocaleString(undefined, { maximumFractionDigits: 2 }) : "-"}
                        </td>
                      ))}
                      <td className="text-bold">
                        {(() => {
                          const total = allData?.reduce((sum, data) => (typeof data.marketCap === 'number' ? sum + data.marketCap : sum), 0);
                          return (total / 1_000_000).toLocaleString(undefined, { maximumFractionDigits: 2 });
                        })()}
                      </td>
                    </tr>

                    {expandedRows['marketCap'] && (
                      <tr className="percentage-row" onClick={() => toggleRow('marketCap')}>
                        <td>%</td>
                        {(() => {
                          const total = allData?.reduce((sum, data) => (typeof data.marketCap === 'number' ? sum + data.marketCap : sum), 0);
                          return allData?.map((data, idx) => {
                            const pct = typeof data.marketCap === "number" && total !== 0 ? (data.marketCap / total) * 100 : 0;
                            return <td key={idx}>{pct.toFixed(2)}%</td>;
                          });
                        })()}
                        <td className="text-bold">100%</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              {/* Valuation Metrics */}
              {sectionMetricsMap['Valuation'] && (
                <div className="financial-grid">
                  <h3 className="section-title">Valuation Metrics</h3>
                  <table className="financial-table-fundamental">
                    <thead>
                      <tr>
                        <th>Metric</th>
                        {allData?.map((data, idx) => (
                          <th key={idx}>{data.stockName}</th>
                        ))}
                        <th>Average</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.keys(sectionMetricsMap['Valuation']?.[0] || {}).map((metric) => (
                        <tr key={metric}>
                          <td className="metric-label">{metric}</td>
                          {sectionMetricsMap['Valuation'].map((data, idx) => (
                            <td key={idx}>{data[metric] != null ? data[metric].toFixed(2) : "-"}</td>
                          ))}
                          <td className="text-bold">
                            {(() => {
                              const values = sectionMetricsMap['Valuation']
                                .map(m => m[metric])
                                .filter(v => typeof v === 'number' && v > 0);
                              const avg = values.length ? values.reduce((a, b) => a + b, 0) / values.length : null;
                              return avg != null ? `${avg.toFixed(2)} (${values.length})` : "-";
                            })()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Financial Sections */}
              {["Income Statement", "Balance Sheet", "Cash Flow"].map((sectionLabel) => (
                  <div key={sectionLabel} className="financial-grid">
                    <h2 className="section-title">{sectionLabel}</h2>

                    <table className="financial-table-fundamental">
                      <thead>
                        <tr>
                          <th>(MYR/Million)</th>
                          {allData?.map((data, idx) => (
                            <th key={idx}>{data.stockName}</th>
                          ))}
                          <th>Total</th>
                        </tr>
                      </thead>

                      <tbody>
                        {(() => {
                          const dataset =
                            sectionLabel === "Income Statement"
                              ? allData?.map((d) => d.incomeStatement)
                              : sectionLabel === "Balance Sheet"
                              ? allData?.map((d) => d.balanceSheet)
                              : allData?.map((d) => d.cashFlow);

                          const allKeysSet = new Set();
                          dataset?.forEach(obj => Object.keys(obj || {}).forEach(key => allKeysSet.add(key)));

                          const metadataKeys = ["asOfDate", "periodType"];
                          const dataKeys = Array.from(allKeysSet).filter(k => !metadataKeys.includes(k));

                          const sortedKeys = [
                            ...metadataKeys,
                            ...dataKeys.sort((a, b) => {
                              const sumA = dataset.reduce((sum, row) => sum + (typeof row?.[a] === 'number' ? row[a] : 0), 0);
                              const sumB = dataset.reduce((sum, row) => sum + (typeof row?.[b] === 'number' ? row[b] : 0), 0);
                              return sumB - sumA; // descending
                            })
                          ];


                          return sortedKeys.flatMap((itemKey) => {
                            if (!dataset || dataset.length === 0) {
                              console.error("Dataset is undefined or empty.");
                              return []; // Skip processing if dataset is invalid
                            }
                          
                            const allEmpty = dataset.every(d => {
                              const val = d?.[itemKey];
                              return val == null || val === '-' || (typeof val === 'number' && val === 0);
                            });
                          
                            if (allEmpty) return []; // Skip this key if all values are empty or invalid
                          
                            return (
                              <React.Fragment key={itemKey}>
                                <tr onClick={() => toggleRow(itemKey)}>
                                  <td>{itemKey.replace(/([a-z])([A-Z])/g, '$1 $2')}</td>
                                  {dataset.map((statement, idx) => {
                                    const val = statement?.[itemKey];
                                    const formatted = typeof val === 'number'
                                      ? (val / 1_000_000).toLocaleString(undefined, { maximumFractionDigits: 2 })
                                      : val ?? "-";
                                    return <td key={idx}>{formatted}</td>;
                                  })}
                                  <td className="text-bold">
                                    {(() => {
                                      const total = dataset.reduce((sum, d) => {
                                        const v = d?.[itemKey];
                                        return typeof v === 'number' ? sum + v : sum;
                                      }, 0);
                                      return total ? (total / 1_000_000).toLocaleString(undefined, { maximumFractionDigits: 2 }) : "-";
                                    })()}
                                  </td>
                                </tr>
                          
                                {expandedRows[itemKey] && (
                                  <tr className="percentage-row">
                                    <td style={{textAlign:'right',fontFamily:'italic',fontSize:'0.8rem'}}>%</td>
                                    {dataset.map((statement, idx) => {
                                      const value = statement?.[itemKey];
                                      const total = dataset.reduce((sum, s) => {
                                        const v = s?.[itemKey];
                                        return typeof v === 'number' ? sum + v : sum;
                                      }, 0);
                                      const proportion = typeof value === 'number' && total !== 0 ? (value / total) * 100 : 0;
                                      return <td style={{textAlign:'center',fontStyle:'italic',fontSize:'0.8em'}} key={idx}>{proportion.toFixed(0)}%</td>;
                                    })}
                                    <td className="text-bold" style={{textAlign:'center',fontStyle:'italic',fontSize:'0.8em'}}>100%</td>
                                  </tr>
                                )}
                              </React.Fragment>
                            );
                          });
                        })()}
                      </tbody>
                    </table>

                    {/* Metrics Section */}
                    {sectionMetricsMap[sectionLabel] && (
                      <div className="financial-grid">
                        <h3 className="section-title">
                          {sectionLabel === "Income Statement"
                            ? "Profitability Metrics"
                            : sectionLabel === "Balance Sheet"
                            ? "Leverage & Liquidity Ratios"
                            : "Metrics"}
                        </h3>

                        <table className="financial-table-fundamental">
                          <thead>
                            <tr>
                              <th>Metric</th>
                              {allData?.map((data, idx) => (
                                <th key={idx}>{data.stockName}</th>
                              ))}
                              <th>Average</th>
                            </tr>
                          </thead>

                          <tbody>
                            {Object.keys(sectionMetricsMap[sectionLabel]?.[0] || {}).map((metric) => (
                              <tr key={metric}>
                                <td className="metric-label">{metric}</td>
                                {sectionMetricsMap[sectionLabel].map((data, idx) => (
                                  <td key={idx}>
                                    {data[metric] != null
                                      ? sectionLabel === "Income Statement"
                                        ? data[metric].toFixed(2) + "%"
                                        : data[metric].toFixed(2)
                                      : "-"}
                                  </td>
                                ))}
                                <td className="text-bold">
                                  {(() => {
                                    const values = sectionMetricsMap[sectionLabel]
                                      .map((m) => m[metric])
                                      .filter((v) => typeof v === "number" && v > 0);
                                    const avg = values.length
                                      ? values.reduce((a, b) => a + b, 0) / values.length
                                      : null;
                                    return avg != null
                                      ? sectionLabel === "Income Statement"
                                        ? `${avg.toFixed(2)}% (${values.length})`
                                        : `${avg.toFixed(2)} (${values.length})`
                                      : "-";
                                  })()}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                ))}

            </div>
        </>
      );
    }
