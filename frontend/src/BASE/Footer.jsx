import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Row className="footer-main g-5">
          <Col lg={5}>
            <Link to="/" className="footer-brand">Xhulia Toska <em>Art</em></Link>
            <p className="footer-description">
              Original paintings shaped by feeling, memory, and the beauty of
              everyday life.
            </p>
            <a
              className="instagram-link"
              href="https://www.instagram.com/xhuliatoska/"
              target="_blank"
              rel="noreferrer"
              aria-label="Visit Xhulia Toska on Instagram"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle className="instagram-dot" cx="17.4" cy="6.6" r="1" />
              </svg>
              <span>Follow on Instagram</span>
            </a>
          </Col>

          <Col xs={6} lg={3}>
            <h2 className="footer-heading">Explore</h2>
            <nav className="footer-links" aria-label="Footer navigation">
              <Link to="/">Home</Link>
              <Link to="/gallery">Gallery</Link>
              <Link to="/about">About the artist</Link>
              <Link to="/contact">Contact</Link>
            </nav>
          </Col>

          <Col xs={6} lg={4}>
            <h2 className="footer-heading">Contact</h2>
            <div className="footer-contact">
              <span>For commissions and enquiries</span>
              <a href="mailto:xhuliatoska1@gmail.com">xhuliatoska1@gmail.com</a>
            </div>
          </Col>
        </Row>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Xhulia Toska Art</p>
          <p>Original art, made with care.</p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
