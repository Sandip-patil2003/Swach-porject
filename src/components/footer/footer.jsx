// src/components/Footer/Footer.jsx
import './footer.css';

function Footer() {
  return (
    <footer className="footer-container text-center bg-dark text-white py-4">
      <div className="footer-content container row">
        <div className="col-md-4 footer-section">
          <h5>Locate us</h5>
          <p className='text-white'>
            Directorate, Urban Administration & Development,<br />
            Palika Bhawan,<br />
            Shivaji Nagar, Bhopal,<br />
            Madhya Pradesh 462016
          </p>
        </div>

        <div className="col-md-4 footer-section">
          <h5>Contact Us</h5>
          <p className='text-white'>
            Call 18002335522, our central 24x7<br />
            helpline number in case of any<br />
            emergencies or to register complaints
          </p>
        </div>

        <div className="col-md-4 footer-section">
          <h5>Connect with us</h5>
          <p className='text-white'>Follow us on:</p>
          <p className='text-white'>
            <i className="fab fa-twitter "></i> @mpurbandeppt<br />
            
            <i className="fab fa-facebook "></i> @urbandeptmp
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
