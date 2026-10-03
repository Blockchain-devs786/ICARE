import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';

export default function Header() {
  const { user, cart, setIsCartOpen } = useStore();
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setShowSearch(false);
      setSearchQuery('');
    }
  };

  return (
    <header className="header">
      <div className="container header__inner" style={{ position: 'relative' }}>
        
        {/* Search Overlay */}
        <div className={`search-overlay ${showSearch ? 'search-overlay--active' : ''}`}>
          <form onSubmit={handleSearch} className="search-form">
            <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            <input 
              type="text" 
              placeholder="Search for mobiles, audio, accessories..." 
              autoFocus={showSearch}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            <button 
              type="button" 
              onClick={() => setShowSearch(false)} 
              aria-label="Close Search"
              className="search-close-btn"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </form>
        </div>

        <div className="header__left">
          <button className="mobile-menu-btn" aria-label="Open menu">
            <svg className="icon" viewBox="0 0 24 24">
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <Link to="/" className="logo">
            icaregadget<span className="logo__dot">.</span>
          </Link>

          <nav className="desktop-nav">
            <Link to="/mobiles">Mobiles</Link>
            <Link to="/audio">Audio</Link>
            <Link to="/accessories">Accessories</Link>
            <Link to="/smart-home">Smart home</Link>
            <Link to="/about">About us</Link>
            <Link to="/contact">Contact</Link>
          </nav>
        </div>

        <div className="header__right">
          <button aria-label="Search" onClick={() => setShowSearch(true)} className="nav-icon-btn">
            <svg className="icon" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </button>
          <Link to="/login" aria-label="User Account" className="nav-icon-btn" style={{ color: 'inherit' }}>
            <svg className="icon" viewBox="0 0 24 24">
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </Link>
          <button aria-label="Open shopping cart" className="nav-icon-btn" style={{ position: 'relative' }} onClick={() => setIsCartOpen(true)}>
            <svg className="icon" viewBox="0 0 24 24">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
              <path d="M3 6h18" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            {totalItems > 0 && (
              <span style={{ position: 'absolute', top: '-4px', right: '-4px', backgroundColor: 'var(--orange)', color: 'white', borderRadius: '50%', width: '18px', height: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.65rem', fontWeight: 'bold' }}>
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
