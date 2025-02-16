// import React from "react";
// import "./Contact_Form.css";
// // import Navbar from "../Navbar/Navbar";

// const ContactForm = () => {
//   return (
//     <>
//       {/* <Navbar/> */}
//       <div className="contact-container">
//         <h1 className="contact-title">Contact Us</h1>
//         <p className="contact-description">
//           We're happy to answer questions or help you with returns. <br />
//           Please fill out the form below if you need assistance.
//         </p>
//         <form className="contact-form">
//           <div className="form-row">
//             <div className="form-group">
//               <label>Full Name</label>
//               <input type="text" required />
//             </div>
//             <div className="form-group">
//               <label>Phone Number</label>
//               <input type="tel"  />
//             </div>
//           </div>
//           <div className="form-row">
//             <div className="form-group">
//               <label>
//                 Email Address <span className="required">REQUIRED</span>
//               </label>
//               <input type="email"  required />
//             </div>
//             <div className="form-group">
//               <label>Order Number</label>
//               <input type="text" />
//             </div>
//           </div>
//           <div className="form-row">
//             <div className="form-group">
//               <label>Company Name</label>
//               <input type="text"  />
//             </div>
            
//           </div>
//           <div className="form-group">
//             <label>
//               Comments/Questions <span className="required">REQUIRED</span>
//             </label>
//             <textarea
//               placeholder="Enter your comments or questions here"
//               rows="4"
//               required
//             ></textarea>
//           </div>
//           <button type="submit" className="submit-button">
//             Submit Form
//           </button>
//         </form>
//       </div>
//     </>
//   );
// };

// export default ContactForm;


import React from "react";
import { Form, Input, Button, Typography } from "antd";
import "./Contact_Form.css"

const { Title, Paragraph } = Typography;

const ContactForm = () => {
  const onFinish = (values) => {
    console.log("Form values:", values);
  };

  return (
    <div className="container1" style={{ maxWidth: 600, margin: "0 auto", padding: "40px" }}>
      <Title style={{paddingLeft:'85px', paddingRight:'50px'}} level={2}>Contact Us</Title>
      <Paragraph>
        We're happy to answer questions or help you with returns. <br />
        Please fill out the form below if you need assistance.
      </Paragraph>
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item className="form-item" name="fullName" label="Full Name" rules={[{ required: true, message: "Please enter your full name!" }]}> 
          <Input placeholder="Enter your full name" />
        </Form.Item>
        
        <Form.Item className="form-item1" name="phone" label="Phone Number">
          <Input placeholder="Enter your phone number" />
        </Form.Item>

        <Form.Item className="form-item1" name="email" label="Email Address" rules={[{ required: true, message: "Email is required!", type: "email" }]}> 
          <Input placeholder="Enter your email" />
        </Form.Item>
        
        <Form.Item className="form-item1" name="orderNumber" label="Order Number">
          <Input placeholder="Enter your order number" />
        </Form.Item>
        
        <Form.Item className="form-item1" name="companyName" label="Company Name">
          <Input placeholder="Enter your company name" />
        </Form.Item>
        
        <Form.Item className="form-item1" name="comments" label="Comments/Questions" rules={[{ required: true, message: "Please enter your comments or questions!" }]}> 
          <Input.TextArea rows={4} placeholder="Enter your comments or questions here" />
        </Form.Item>
        
        <Form.Item style={{paddingLeft:'10px', paddingRight:'40px'}}>
          <Button style={{background:'#40476D',paddingLeft:'10px'}} type="primary" htmlType="submit" block>
            Submit Form
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ContactForm;
