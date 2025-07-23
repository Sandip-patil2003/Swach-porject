import { Link } from "react-router-dom";
import { NavDropdown, Navbar, Nav, Container } from "react-bootstrap";
import swachLogo from '../../logo/swach_logo.jpg';
import './navbar.css'; 

function NavigationBar() {
  return (
    <Navbar  expand="lg" className="navbar-custom">
      <Container>
        <Navbar.Brand href="/">
          <img src={swachLogo} alt="Logo" height="45px" />
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">HOME</Nav.Link>
            <Nav.Link as={Link} to="/about">ABOUT US</Nav.Link>
            <Nav.Link as={Link} to="/whatwedo">WHAT WE DO</Nav.Link>
            <Nav.Link as={Link} to="/sugandhabai">SUGANDHABAI</Nav.Link>
            <Nav.Link as={Link} to="/resources">RESOURCES</Nav.Link>
            <Nav.Link as={Link} to="/blog">BLOG</Nav.Link>
          </Nav>
          <Nav>
            <NavDropdown title="PAYMENT" id="payment-dropdown">
              <NavDropdown.Item as={Link} to="/society-master">SOCIETY MASTER</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/product-master">PRODUCT MASTER</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/bill-details">BILL DETAILS</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/online-bill-pay">ONLINE BILL PAY</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
