import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, useNavigate } from "react-router-dom";

import "./NavigationBar.css";

function NavigationBar() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const username = localStorage.getItem("adminUsername");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("adminUsername");

    navigate("/login");
  };

  return (
    <Navbar expand="lg" className="navbar-custom" sticky="top">
      <Container>

        <Navbar.Brand
          as={Link}
          to="/"
          className="logo"
        >
          Xhulia Toska Art
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="main-navbar" />

        <Navbar.Collapse id="main-navbar">

          <Nav className="ms-auto">

            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>

            <Nav.Link as={Link} to="/gallery">
              Gallery
            </Nav.Link>

            <Nav.Link as={Link} to="/about">
              About
            </Nav.Link>

            <Nav.Link as={Link} to="/contact">
              Contact
            </Nav.Link>

            {token ? (
              <>
                <Nav.Link as={Link} to="/admin/dashboard">
                  Dashboard
                </Nav.Link>

                <Nav.Link
                  onClick={handleLogout}
                  style={{ cursor: "pointer" }}
                >
                  Logout
                </Nav.Link>
              </>
            ) : (
              <Nav.Link as={Link} to="/login">
                Login
              </Nav.Link>
            )}

          </Nav>

        </Navbar.Collapse>

      </Container>
    </Navbar>
  );
}

export default NavigationBar;