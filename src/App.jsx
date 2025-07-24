import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import NavigationBar from "./components/navbar/Navbar";
import Home from "./components/home/Home";
import AboutUs from "./components/AboutUS/AboutUS";
import What_We_Do from "./components/WhatWeDo/What_We_Do";
import Sugandhabai from "./components/Sugandhabai";
import Resources from "./components/Resources/Resources";
import Blog from "./components/Blog/Blog";
import SocietyMaster from "./components/Society/SocietyMaster";
import ProductMaster from "./components/product/productMaster";
import { useState, useEffect } from "react";
import LoginPage from "./components/Login/LoginPage";
import RegisterPage from "./components/Login/RegisterPage";
import BillDetails from "./components/billdetails/BillDetailsMaster";
import BillFormat from './components/billdetails/BillFormat';
import OnlineBillPay from "./components/onlineBillPay/BillPayMaster";
import BillHistoryList from './components/onlineBillPay/BillPaymentList';
import Footer from "./components/footer/footer"

function App() {
  const [isRegistered, setIsRegistered] = useState(() => localStorage.getItem('isRegistered') === 'true');
  const [isLoggedIn, setIsLoggedIn] = useState(() => localStorage.getItem('isLoggedIn') === 'true');

  useEffect(() => {
    localStorage.setItem('isRegistered', isRegistered);
  }, [isRegistered]);

  useEffect(() => {
    localStorage.setItem('isLoggedIn', isLoggedIn);
  }, [isLoggedIn]);
  return (
    <Router>
      {isLoggedIn && <NavigationBar />}
      <div className={isLoggedIn ? "container mt-4" : undefined}>
        <Routes>
          <Route path="/login" element={<LoginPage onLoginSuccess={() => setIsLoggedIn(true)} isRegistered={isRegistered} />} />
          <Route path="/register" element={<RegisterPage onRegisterSuccess={() => setIsRegistered(true)} />} />
          <Route path="/" element={isLoggedIn ? <Home /> : <Navigate to="/login" />} />
          <Route path="/about" element={isLoggedIn ? <AboutUs /> : <Navigate to="/login" />} />
          <Route path="/whatwedo" element={isLoggedIn ? <What_We_Do /> : <Navigate to="/login" />} />
          <Route path="/sugandhabai" element={isLoggedIn ? <Sugandhabai /> : <Navigate to="/login" />} />
          <Route path="/resources" element={isLoggedIn ? <Resources /> : <Navigate to="/login" />} />
          <Route path="/blog" element={isLoggedIn ? <Blog /> : <Navigate to="/login" />} />
          <Route path="/bill-history" element={isLoggedIn ? <BillHistoryList /> : <Navigate to="/login" />} />
          <Route path="/format" element={isLoggedIn ? <BillFormat /> : <Navigate to="/login" />} />
          <Route path="/society-master" element={isLoggedIn ? <SocietyMaster /> : <Navigate to="/login" />} />
          <Route path="/product-master" element={isLoggedIn ? <ProductMaster /> : <Navigate to="/login" />} />
          <Route path="/bill-details/*" element={isLoggedIn ? <BillDetails /> : <Navigate to="/login" />} />
          <Route path="/online-bill-pay/*" element={isLoggedIn ? <OnlineBillPay /> : <Navigate to="/login" />} />

          <Route path="*" element={<Navigate to={isLoggedIn ? "/" : "/login"} />} />
        </Routes>
      </div>
      {isLoggedIn && <Footer />}
    </Router>
  );
}

export default App;