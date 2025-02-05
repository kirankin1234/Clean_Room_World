import React from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'

const Navbar = () => {
    return (
      <header className="navbar">
        <div className="navbar-top">
          <div className="navbar-certification">Clean Room Cart</div>
          <div className="navbar-contact">
          <Link style={{textDecoration: 'none'}} to="/contact_form"><span>Contact Us</span></Link>
            <span> | </span>
            <Link style={{textDecoration: 'none'}} to="/login"><span>Login</span></Link>
            <span> | </span>
            <Link style={{textDecoration: 'none'}} to= "/cart"><span>My Cart</span></Link>
          </div>
        </div>
        <div className="navbar-main">
          <h1 className="navbar-logo"></h1>
          <div className="navbar-search">
            <input
              type="text"
              placeholder="Search by Keyword, Item or Model"
              className="search-input"
            />
            <button className="search-button">🔍</button>
          </div>
          <div className="navbar-questions">
            <div>
              <span>Questions? Call 123-456-7890</span>
            </div>
            <a href="mailto:info@cleanroomworld.com" className="email-link">
              info@cleanroomworld.com
            </a>
          </div>
        </div>
        <nav className="navbar-links">
          <a href="/home">Home</a>
          <span>|</span>
          <a href="#cleanroom-supplies">Cleanroom Supplies</a>
          <span>|</span>
          <a href="#cleanroom-equipment">Cleanroom Equipment</a>
          <span>|</span>
          <a href="#lab-supplies">Lab Supplies</a>
          <span>|</span>
          <a href="#safety-supplies">Safety Supplies</a>
          <span>|</span>
          <a href="#esd-equipment">ESD Equipment</a>
          <span>|</span>
          <a href="#faqs">FAQs</a>
        </nav>
      </header>
    );
  };
  
  export default Navbar;