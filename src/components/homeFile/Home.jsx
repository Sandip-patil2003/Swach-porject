// src/pages/Home.jsx
import React from 'react';
import { Button } from 'react-bootstrap';
import { FaUser, FaBuilding } from 'react-icons/fa';
import homeImage from '../../logo/home.png'; 
import './Home.css';

function Home() {
    return (
        <div className="home-container d-flex flex-column flex-md-row align-items-center justify-content-between p-4 bg-light" style={{ minHeight: '100vh' }}>
            <div className="home-left w-100 w-md-50 mb-4 mb-md-0">
                <img src={homeImage} alt="City Illustration" className="img-fluid" />
            </div>

            <div className="home-right text-center w-100 w-md-50">
                <h2 className="mb-3">Welcome to Mahanagar Palika</h2>
                <p className="mb-4">One-Stop Hub for Utility Bills and Urban Services!</p>

                <div className="d-flex justify-content-center gap-3 flex-wrap">
                    <Button variant="dark" className="px-4 py-2 d-flex align-items-center gap-2">
                        <FaUser />
                        Citizen Login
                    </Button>

                    <Button variant="outline-dark" className="px-4 py-2 d-flex align-items-center gap-2">
                        <FaBuilding />
                        ULB Login
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default Home;
