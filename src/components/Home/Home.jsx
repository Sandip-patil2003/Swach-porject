import React, { useRef } from 'react';
import { FaBuilding } from 'react-icons/fa';
import { Button } from 'react-bootstrap';
import homeImage from '../../logo/home.png';
import home2Image from '../../logo/home2.avif';
import './Home.css';

function Home() {
  const aboutRef = useRef(null);

  const handleAbout = () => {
    if (aboutRef.current) {
      aboutRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Section 1: Hero */}
      <div className="container-fluid home-page py-5">
        <div className="row align-items-center">
          <div className="col-md-6 mb-4 mb-md-0 text-center">
            <img src={homeImage} alt="City Illustration" className="img-fluid home-img" />
          </div>
          <div className="col-md-6 text-center text-md-start ">
            <h2 className="mb-3">
              🏛️ Mahanagar Palika (Municipal Corporation) – Swachh Bharat Initiative
            </h2>
            <p className="mb-4">
              <strong>स्वच्छ भारत अभियान</strong> is a nation-wide campaign initiated by the Government of India
              to promote cleanliness, hygiene, and sanitation in all cities and towns. The Mahanagar Palika
              (Municipal Corporation) is a key administrative body responsible for the effective implementation
              of this initiative at the urban level.
            </p>
            <Button className="button d-flex align-items-center justify-content-center gap-2" onClick={handleAbout}>
              <FaBuilding /> About
            </Button>
          </div>
        </div>
      </div>

      {/* Section 2: Additional Info - Styled like Section 1 */}
      <div ref={aboutRef} className="container-fluid home-page py-5 border-top ">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <h3 className="mb-3">What Does Mahanagar Palika Do?</h3>
              <p>
                The <strong>Mahanagar Palika</strong> is responsible for maintaining urban infrastructure, sanitation,
                waste management, water supply, and public health services. Its goal is to ensure a cleaner, safer,
                and more efficient environment for city residents.
              </p>
              <ul>
                <li>💧 Clean water & sewage management</li>
                <li>🗑️ Daily waste collection & disposal</li>
                <li>🛣️ Maintenance of roads, parks & streetlights</li>
                <li>🌱 Promotes green spaces & eco-friendly practices</li>
              </ul>
            </div>
            <div className="col-md-6 text-center">
              <img
                src={home2Image}
                alt="Municipal Work"
                className="img-fluid rounded shadow"
                style={{ maxHeight: '400px' }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
