import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../components.css/index.css';

export default function MobileNav({ code }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setOpen(prev => !prev);

  const handleSelect = (path) => {
    navigate(path);
    setOpen(false);
  };

  return (
    <div className="mobile-nav">
      <button className="hamburger" onClick={toggleMenu}>☰</button>

      {open && (
        <div className="dropdown-menu">
          <div onClick={() => handleSelect('/screener')}>Screener</div>
          <div onClick={() => handleSelect('/news')}>News</div>
        </div>
      )}
    </div>
  );
}
