
import { useState, useEffect } from "react";
import axios from "axios";

export const balanceSheetItems = {
      // Total Assets
      "Total Assets": "TotalAssets",
      "Current Assets": "CurrentAssets",
      "Cash&cash equivalents": "CashAndCashEquivalents",
      "Other Short Terms Investments": "OtherShortTermInvestments",
      "Inventory": "Inventory",
      "Total Non Current Assets": "TotalNonCurrentAssets",
      "Net PPE": "NetPPE",
      "Other Intangible Assets": "OtherIntangibleAssets",
    
      // Total Liabilities & Minority Interest
      "Total Liabilities Net Minority Interest": "TotalLiabilitiesNetMinorityInterest",
      "Current Liabilities": "CurrentLiabilities",
      "Current Debt And Capital Lease Obligation": "CurrentDebtAndCapitalLeaseObligation",
      "Current Debt": "CurrentDebt",
      "Current Capital Lease Obligation": "CurrentCapitalLeaseObligation",
      "Total Non Current Liabilities Net Minority Interest": "TotalNonCurrentLiabilitiesNetMinorityInterest",
      "Long Term Debt And Capital Lease Obligation": "LongTermDebtAndCapitalLeaseObligation",
      "Long Term Debt": "LongTermDebt",
      "Long Term Capital Lease Obligation": "LongTermCapitalLeaseObligation",
    
      // Total Equity & Minority Interest
      "Total Equity Gross Minority Interest": "TotalEquityGrossMinorityInterest",
      "Stockholders Equity": "StockholdersEquity",
      "Capital Stock": "CapitalStock",
      "Retained Earnings": "RetainedEarnings",
    
      // Other Financial Items
      "Other Financial Items": "OtherFinancialItems",
      "Total Capitalization (long term Debt + Equity)": "TotalCapitalization",
      "Working Capital": "WorkingCapital",
      "Tangible Book Value": "TangibleBookValue",
      "Total Debt": "TotalDebt",
      "Share Issued": "ShareIssued"
    };
    
export  const incomeItems = {
      "Total Revenue": "TotalRevenue",
      "Cost Of Revenue": "CostOfRevenue",
      "Gross Profit": "GrossProfit",
      "Operating Expense": "OperatingExpense",
      "Operating Income": "OperatingIncome",
      "Net Non Operating Interest Income Expense": "NetNonOperatingInterestIncomeExpense",
      "Tax Provision": "TaxProvision",
      "Net Income": "NetIncome",
      "Net Income Continuous Operations": "NetIncomeContinuousOperations",
      "Earnings Per Share": "EarningsPerShare",
      "Basic EPS": "BasicEPS",
      "Diluted EPS": "DilutedEPS",
      "Average Shares": "AverageShares",
      "Basic Average Shares": "BasicAverageShares",
      "Diluted Average Shares": "DilutedAverageShares",
      "Total Expenses": "TotalExpenses",
      "Normalized Income": "NormalizedIncome",
      "Interest Expense": "InterestExpense",
      "EBIT": "EBIT",
      "EBITDA": "EBITDA",
    };
    
    
export  const cashFlowData = 
{
      'Beginning Cash Position': 'BeginningCashPosition',
      'Capital Expenditure': 'CapitalExpenditure',
      'Change In Cash Supplemental As Reported': 'ChangeInCashSupplementalAsReported',
      'Change In Inventory': 'ChangeInInventory',
      'Change In Other Current Assets': 'ChangeInOtherCurrentAssets',
      'Change In Payable': 'ChangeInPayable',
      'Change In Receivables': 'ChangeInReceivables',
      'Change In Working Capital': 'ChangeInWorkingCapital',
      'Changes In Cash': 'ChangesInCash',
      'Common Stock Issuance': 'CommonStockIssuance',
      'Common Stock Payments': 'CommonStockPayments',
      'Depreciation': 'Depreciation',
      'Depreciation And Amortization': 'DepreciationAndAmortization',
      'Dividends Received CFI': 'DividendsReceivedCFI',
      'Effect Of Exchange Rate Changes': 'EffectOfExchangeRateChanges',
      'End Cash Position': 'EndCashPosition',
      'Financing Cash Flow': 'FinancingCashFlow',
      'Free Cash Flow': 'FreeCashFlow',
      'Gain Loss On Investment Securities': 'GainLossOnInvestmentSecurities',
      'Gain Loss On Sale Of Business': 'GainLossOnSaleOfBusiness',
      'Gain Loss On Sale Of PPE': 'GainLossOnSaleOfPPE',
      'Interest Paid CFF': 'InterestPaidCFF',
      'Interest Paid CFO': 'InterestPaidCFO',
      'Interest Received CFI': 'InterestReceivedCFI',
      'Investing Cash Flow': 'InvestingCashFlow',
      'Issuance Of Capital Stock': 'IssuanceOfCapitalStock',
      'Issuance Of Debt': 'IssuanceOfDebt',
      'Long Term Debt Issuance': 'LongTermDebtIssuance',
      'Long Term Debt Payments': 'LongTermDebtPayments',
      'Net Business Purchase And Sale': 'NetBusinessPurchaseAndSale',
      'Net Common Stock Issuance': 'NetCommonStockIssuance',
      'Net Foreign Currency Exchange Gain Loss': 'NetForeignCurrencyExchangeGainLoss',
      'Net Income': 'NetIncome',
      'Net Income From Continuing Operations': 'NetIncomeFromContinuingOperations',
      'Net Intangibles Purchase And Sale': 'NetIntangiblesPurchaseAndSale',
      'Net Investment Properties Purchase And Sale': 'NetInvestmentPropertiesPurchaseAndSale',
      'Net Investment Purchase And Sale': 'NetInvestmentPurchaseAndSale',
      'Net Issuance Payments Of Debt': 'NetIssuancePaymentsOfDebt',
      'Net Long Term Debt Issuance': 'NetLongTermDebtIssuance',
      'Net Other Financing Charges': 'NetOtherFinancingCharges',
      'Net Other Investing Changes': 'NetOtherInvestingChanges',
      'Net PPE Purchase And Sale': 'NetPPEPurchaseAndSale',
      'Net Short Term Debt Issuance': 'NetShortTermDebtIssuance',
      'Operating Cash Flow': 'OperatingCashFlow',
      'Other Non Cash Items': 'OtherNonCashItems',
      'Provision and Write Off of Assets': 'ProvisionandWriteOffofAssets',
      'Purchase Of Business': 'PurchaseOfBusiness',
      'Purchase Of Intangibles': 'PurchaseOfIntangibles',
      'Purchase Of Investment': 'PurchaseOfInvestment',
      'Purchase Of Investment Properties': 'PurchaseOfInvestmentProperties',
      'Purchase Of PPE': 'PurchaseOfPPE',
      'Repayment Of Debt': 'RepaymentOfDebt',
      'Repurchase Of Capital Stock': 'RepurchaseOfCapitalStock',
      'Sale Of Investment': 'SaleOfInvestment',
      'Sale Of Investment Properties': 'SaleOfInvestmentProperties',
      'Sale Of PPE': 'SaleOfPPE',
      'Short Term Debt Issuance': 'ShortTermDebtIssuance',
      'Stock Based Compensation': 'StockBasedCompensation',
      'Taxes Refund Paid': 'TaxesRefundPaid'
  }
  
        

    
  
    
    

    

    
    