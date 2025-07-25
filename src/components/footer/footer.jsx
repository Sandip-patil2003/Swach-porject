import './footer.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

function Footer() {
  return (
    <footer className="footer border-top bg-auth py-3 mt-5">
      <div className="container">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center text-muted small mb-4 mt-2">
      
          <ul className="list-inline mb-2 mb-md-0">
            <li className="list-inline-item"><a href="/">HOME</a></li>
            <li className="list-inline-item">|</li>
            <li className="list-inline-item"><a href="/about">ABOUT US</a></li>
            <li className="list-inline-item">|</li>
            <li className="list-inline-item"><a href="/whatwedo">WHAT WE DO</a></li>
            <li className="list-inline-item">|</li>
            <li className="list-inline-item"><a href="/resources">RESOURCES</a></li>
            <li className="list-inline-item">|</li>
            <li className="list-inline-item"><a href="/blog">BLOG</a></li>
          </ul>

          <div className="d-flex align-items-center gap-3 mb-2 mb-md-0">
            <a href="" className="text-muted"><i className="fab fa-twitter"></i></a>
            <a href="#" className="text-muted"><i className="fab fa-facebook"></i></a>
            <a href="#" className="text-muted"><i className="fab fa-youtube"></i></a>
          </div>
        </div>

        <hr className="my-2" />

        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center text-muted small margin">
          <div>
             © 2025 Getty Images. The Getty Images design is a trademark of Getty Images. <a href="#" className="text-decoration-none">Terms and Conditions</a>
          </div>
          <div className="mt-2 mt-md-0">
            <i className="fas fa-phone-alt me-1"></i> Helpline no.: 011 4975 4923, 011 4975 4924
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
