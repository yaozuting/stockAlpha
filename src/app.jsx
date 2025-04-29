import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, Navigate } from 'react-router-dom';
import MarketScreener from './components/market_screener/market_screener.jsx';
import News from './components/News/News_dashboard.jsx';
import StockDashBoard from './components/Stock/StockDashboard.jsx';
import SearchBox from './components/tools/SearchBox.jsx';
import MobileNav from './components/tools/hamburgerMenu.jsx';
import './components.css/index.css';

export default function App() {
  const [code, setCode] = useState('');
  const [selectedCompany, setSelectedCompany] = useState('');
  
  const nav_items = [
    { name: 'Screener', path: '/screener' },
    { name: 'News', path: '/news' },
  ];

  return (
    <Router basename="/stockAlpha">
      <InnerApp 
        code={code} 
        setCode={setCode} 
        selectedCompany={selectedCompany} 
        setSelectedCompany={setSelectedCompany}
        nav_items={nav_items}
      />
    </Router>
  );
}

function InnerApp({ code, setCode, selectedCompany, setSelectedCompany, nav_items }) {
  const navigate = useNavigate();

  const handleSearch = (company) => {
    setCode(company.Code);
    navigate('/stock');  // Jump to /stock after search
  };

  return (
    <>
      <div className="upper">
        <div className="search-part">
          <div className="title"><strong>StockAlpha</strong></div>
          <div className="search-box">
            <SearchBox
              selectedCompany={selectedCompany}
              onSelect={(value) => setSelectedCompany(value)}
              onSearchClick={handleSearch}
            />
          </div>
        </div>

        <div className="nav-part">
          <nav>
            <ul>
              {nav_items.map((item) => (
                <li key={item.name} className="nav_tab">
                  <Link to={item.path} className="nav-link">{item.name}</Link>
                </li>
              ))}
            </ul>
          </nav>
          <MobileNav code={code} />
        </div>
      </div>

      <div className="content">
        <Routes>
          <Route path="/" element={<Navigate to="/screener" replace />} />
          <Route path="/screener" element={<MarketScreener code={code} />} />
          <Route path="/news" element={<News code={code} />} />
          <Route path="/stock" element={<StockDashBoard code={code} />} />
          <Route path="/stockAlpha" element={<MarketScreener code={code} />} />
        </Routes>
      </div>
    </>
  );
}


