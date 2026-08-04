import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import artist from "../assets/images/artist.jpg";
import "./AboutPreview.css";

function AboutPreview() {
  return (
    <section className="about-preview">
      <Container>
        <Row className="align-items-center">

          <Col lg={6}>
            <img
              src={artist}
              alt="Xhulia Toska"
              className="artist-image"
            />
          </Col>

          <Col lg={6}>
            <h2>About the Artist</h2>

            <p>
              Xhulia Toska is a contemporary artist whose work reflects
              emotion, imagination and the beauty of everyday life.
            </p>

            <Button
              as={Link}
              to="/about"
              className="about-btn"
            >
              Read More
            </Button>

          </Col>

        </Row>
      </Container>
    </section>
  );
}

export default AboutPreview;