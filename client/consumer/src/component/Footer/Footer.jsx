import React from "react";
import "./Footer.css"; // Import the CSS file
import contact from '../Contact_Form/Contact_Form.jsx'

const Footer = () => {

    const currentYear = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h6>Cleanroom Cart</h6>
          <hr />
          <p>
            Address: A-302, Binawat Majestic, Sasane Nagar Rd., Haveli, Hadapsar, Pune-411028, Maharashtra <br />
            Email: <a href="mailto:info@cleanroomcart.com">info@cleanroomcart.com</a>
          </p>
        </div>

        <div className="footer-section">
          <h6>Quick Links</h6>
          <hr />
          <ul>
            <li><a href="/login">User Login</a></li>
            <li><a href='/'>Contact Us</a></li>
            <li><a href="/">Home</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h6>Categories</h6>
          <hr />
          <ul>
            <li><a href="">Cleanroom Supplies</a></li>
            <li><a href="">Cleanroom Equipment</a></li>
            <li><a href="">Lab Supplies</a></li>
            <li><a href="">Safety Supplies</a></li>
            <li><a href="">ESD Equipment</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        © {currentYear} Cleanroom Cart. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
