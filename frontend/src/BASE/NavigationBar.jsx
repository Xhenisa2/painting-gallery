import React, { useContext } from 'react'
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, useNavigate } from "react-router-dom";
import "./NavigationBar.css";
import { UserContext } from '../Admin/UserContext'
import axios from 'axios'
function NavigationBar() {
  const nav = useNavigate()
  // Merr userInfo dhe setter-in nga context-i.
  const { userInfo, setUserInfo, authLoading } = useContext(UserContext)

  const handleLogout = async () => {
    // Dergo kerkese logout dhe perfshi cookies.
    await axios.post('http://localhost:5000/logout/', null, { withCredentials: true })
      .then(res => {
        // Pas logout, pastro userInfo nga context-i.
        setUserInfo({})
        // Ridrejto te faqja e login.
        nav('/login', { replace: true })
      })
      .catch(err => console.log("Not logut"))
  }

  return (
    <Navbar expand="lg" className="navbar-custom" sticky="top">
      <Container>

        <Navbar.Brand as={Link} to="/" className="logo">
          Xhulia Toska Art
        </Navbar.Brand>

        <Navbar.Toggle />

        <Navbar.Collapse>

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

 {authLoading ? null : userInfo.email ? (
              <>
                <Nav.Link as={Link} to="/createItem/">Create Item</Nav.Link>
                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
              </>
            ) : (
              // Nese s'eshte i loguar, shfaq register dhe login.
              <>
                <Nav.Link as={Link} to="/login/" className="btn btn-primary">Login</Nav.Link>
              </>
            )}
          </Nav>

        </Navbar.Collapse>

      </Container>
    </Navbar>
  );
}

export default NavigationBar;