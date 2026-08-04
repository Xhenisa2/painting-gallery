import { Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Hero.css";

function Hero() {
  return (
    <section className="hero-section">
      <Container>
        <div className="hero-content">
          <p className="hero-subtitle">Original art · curated with care</p>
          <h1 className="hero-title">Art that makes a room feel like home.</h1>
          <p className="hero-text">
            Discover a collection of expressive paintings made to bring warmth,
            colour, and character to your everyday spaces.
          </p>
          <Button as={Link} to="/gallery" className="hero-btn">
            Explore the gallery
          </Button>
        </div>
      </Container>
    </section>
  );
}

export default Hero;
