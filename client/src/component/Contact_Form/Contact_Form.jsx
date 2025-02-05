import React from "react";
import "./Contact_Form.css";

const ContactForm = () => {
  return (
    <div className="contact-container">
      <h1 className="contact-title">Contact Us</h1>
      <p className="contact-description">
        We're happy to answer questions or help you with returns. <br />
        Please fill out the form below if you need assistance.
      </p>
      <form className="contact-form">
        <div className="form-row">
          <div className="form-group">
            <label>Full Name</label>
            <input type="text" required />
          </div>
          <div className="form-group">
            <label>Phone Number</label>
            <input type="tel"  />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>
              Email Address <span className="required">REQUIRED</span>
            </label>
            <input type="email"  required />
          </div>
          <div className="form-group">
            <label>Order Number</label>
            <input type="text" />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Company Name</label>
            <input type="text"  />
          </div>
          
        </div>
        <div className="form-group">
          <label>
            Comments/Questions <span className="required">REQUIRED</span>
          </label>
          <textarea
            placeholder="Enter your comments or questions here"
            rows="4"
            required
          ></textarea>
        </div>
        <button type="submit" className="submit-button">
          Submit Form
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
