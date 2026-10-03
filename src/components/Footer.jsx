import React from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';

export default function Footer() {
  const { storeDetails } = useStore();
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div className="footer__logo-col">
            <Link to="/" className="footer__logo" style={{ display: 'block', textDecoration: 'none' }}>
              icaregadget<span className="logo__dot">.</span>
            </Link>
          </div>
          
          <div className="footer__links-col">
            <div className="footer__links-group">
              <h3 className="footer__title">SHOP</h3>
              <Link to="/mobiles" className="footer__link">Mobiles</Link>
              <Link to="/audio" className="footer__link">Audio</Link>
              <Link to="/accessories" className="footer__link">Accessories</Link>
              <Link to="/smart-home" className="footer__link">Smart home</Link>
            </div>
            
            <div className="footer__links-group">
              <h3 className="footer__title">HELP</h3>
              <Link to="/track" className="footer__link">Track order</Link>
              <Link to="/returns" className="footer__link">Returns</Link>
              <Link to="/warranty" className="footer__link">Warranty</Link>
              <Link to="/contact" className="footer__link">Contact</Link>
              <Link to="/about" className="footer__link">About us</Link>
            </div>
          </div>
          
          <div className="footer__contact-col">
            <div className="footer__contact">
              <p>WhatsApp {storeDetails.phone}</p>
              <p>{storeDetails.address}, Faisalabad</p>
            </div>
          </div>
        </div>
        
        <div className="footer__bottom">
          <p>&copy; 2026 icaregadget</p>
        </div>
      </div>
    </footer>
  );
}
