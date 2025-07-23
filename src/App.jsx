import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavigationBar from "./components/navbar/Navbar";
import Home from "./components/home/HomeData.jsx";
// import AboutUs from "./components/AboutUs";
// import WhatWeDo from "./components/WhatWeDo";
// import Sugandhabai from "./components/Sugandhabai";
// import Resources from "./components/Resources";
// import Blog from "./components/Blog";
import SocietyMaster from "./components/Society/SocietyMaster";
import ProductMaster from "./components/product/productMaster";
import { useState, useEffect } from "react";
import LoginPage from "./components/Login/LoginPage";
import RegisterPage from "./components/Login/RegisterPage";
import BillDetails from "./components/billdetails/BillDetailsMaster";
import BillFormat from './components/billdetails/BillFormat';
import OnlineBillPay from "./components/onlineBillPay/BillPayMaster";
import BillHistoryList from './components/onlineBillPay/BillPaymentList';


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
      <NavigationBar />
      <div className="container mt-4">
        <Routes>
          <Route path="/login" element={<LoginPage onLoginSuccess={() => setIsLoggedIn(true)} isRegistered={isRegistered} />} />
          <Route path="/register" element={<RegisterPage onRegisterSuccess={() => setIsRegistered(true)} />} />
          {/* Protected routes below */}
          {isLoggedIn && (
            <>
              <Route path="/" element={<Home />} />
              <Route path="/bill-history" element={<BillHistoryList />} />
              <Route path="/format" element={<BillFormat />} />
              <Route path="/society-master" element={<SocietyMaster />} />
              <Route path="/product-master" element={<ProductMaster />} />
              <Route path="/bill-details/*" element={<BillDetails />} />
              <Route path="/online-bill-pay/*" element={<OnlineBillPay />} />
            </>
          )}
        </Routes>
      </div>
    </Router>
  );
}


export default App;
