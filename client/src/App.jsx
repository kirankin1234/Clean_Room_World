import React from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/Login/login'
import Signup from './pages/Signup/signup'
import Home from './pages/Home/home'
import Carts from './pages/Carts'
import ContactForm from './component/Contact_Form/Contact_Form'
import Navbar from './component/Navbar/Navbar'

const App = () => {
  return (
    <Router>
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/carts" element={<Carts/>} />
          <Route path="/contact_form" element={<ContactForm />} />
        </Routes>
    </Router>
  )
}

export default App