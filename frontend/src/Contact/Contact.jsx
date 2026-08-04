import React, { useState, useEffect } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import axios from "axios";
import "./Contact.css";

const Contact = () => {
  const [contact, setContact] = useState({
    name: "",
    surname: "",
    email: "",
    comment: "",
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateContact = () => {
    const errors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!contact.name.trim()) {
      errors.name = "First name is required.";
    }

    if (!contact.surname.trim()) {
      errors.surname = "Last name is required.";
    }

    if (!contact.email.trim()) {
      errors.email = "Email is required.";
    } else if (!emailPattern.test(contact.email.trim())) {
      errors.email = "Enter a valid email address.";
    }

    if (!contact.comment.trim()) {
      errors.comment = "Comment is required.";
    }

    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setContact({ ...contact, [name]: value });
    setErrors((prev) => ({ ...prev, [name]: "" }));
    setSuccessMessage("");
    setSubmitError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nextErrors = validateContact();

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await axios.post(
        "http://localhost:5000/addContact",
        contact
      );

      console.log(res.data);

      setSuccessMessage("Your message has been sent successfully.");

      setContact({
        name: "",
        surname: "",
        email: "",
        comment: "",
      });

      setErrors({});
      setSubmitError("");
    } catch (err) {
      console.error(err);

      setSubmitError(
        err.response?.data ||
          err.message ||
          "Unable to send your message."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (!successMessage) return;

    const timer = setTimeout(() => {
      setSuccessMessage("");
    }, 3000);

    return () => clearTimeout(timer);
  }, [successMessage]);

  return (
    <section className="contact-page">
      <Container>
        <div className="contact-shell">

          <div className="contact-intro">
            <p className="contact-eyebrow">Get in touch</p>
            <h1>Let's talk about art.</h1>
            <p>
              Have a question about a painting, a commission, or an
              exhibition? Send a message and I'll be happy to hear from you.
            </p>
          </div>

          <div className="contact-form-card">

            <h2>Send a message</h2>

            {successMessage && (
              <Alert variant="success">{successMessage}</Alert>
            )}

            {submitError && (
              <Alert variant="danger">{submitError}</Alert>
            )}

            <Form onSubmit={handleSubmit}>

              <div className="contact-name-fields">

                <Form.Group className="mb-3">
                  <Form.Label>First name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={contact.name}
                    onChange={handleChange}
                    isInvalid={!!errors.name}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.name}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Last name</Form.Label>
                  <Form.Control
                    type="text"
                    name="surname"
                    value={contact.surname}
                    onChange={handleChange}
                    isInvalid={!!errors.surname}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.surname}
                  </Form.Control.Feedback>
                </Form.Group>

              </div>

              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={contact.email}
                  onChange={handleChange}
                  isInvalid={!!errors.email}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Message</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={5}
                  name="comment"
                  value={contact.comment}
                  onChange={handleChange}
                  isInvalid={!!errors.comment}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.comment}
                </Form.Control.Feedback>
              </Form.Group>

              <Button
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Send message"}
              </Button>

            </Form>

          </div>
        </div>
      </Container>
    </section>
  );
};

export default Contact;