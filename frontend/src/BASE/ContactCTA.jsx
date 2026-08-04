import { Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./ContactCTA.css";

function ContactCTA() {
  return (
    <section className="contact-cta">

      <Container>

        <h2>Interested in an Artwork?</h2>

        <p>
          Feel free to get in touch for commissions,
          exhibitions or artwork inquiries.
        </p>

        <Button
          as={Link}
          to="/contact"
          className="contact-btn"
        >
          Contact Me
        </Button>

      </Container>

    </section>
  );
}

export default ContactCTA;