import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function Dashboard() {
  const username = localStorage.getItem("adminUsername");

  return (
    <Container className="py-5">

      <div className="text-center mb-5">
        <h1>ADMIN DASHBOARD</h1>

        <p>
          Welcome {username || "Admin"}!
        </p>
      </div>

      <Row className="g-4 justify-content-center">

        {/* ADD PAINTING */}
        <Col md={4}>
          <Card className="h-100 shadow-sm text-center">
            <Card.Body>

              <h3>🎨</h3>

              <Card.Title>
                Add Painting
              </Card.Title>

              <Card.Text>
                Add a new painting to the gallery.
              </Card.Text>

              <Button
                as={Link}
                to="/admin/add"
                variant="dark"
              >
                Add Painting
              </Button>

            </Card.Body>
          </Card>
        </Col>


        {/* MANAGE PAINTINGS */}
        <Col md={4}>
          <Card className="h-100 shadow-sm text-center">
            <Card.Body>

              <h3>🖼️</h3>

              <Card.Title>
                Manage Paintings
              </Card.Title>

              <Card.Text>
                Edit or delete paintings.
              </Card.Text>

              <Button
                as={Link}
                to="/admin/manage"
                variant="dark"
              >
                Manage Paintings
              </Button>

            </Card.Body>
          </Card>
        </Col>


        {/* MESSAGES */}
        <Col md={4}>
          <Card className="h-100 shadow-sm text-center">
            <Card.Body>

              <h3>📩</h3>

              <Card.Title>
                Messages
              </Card.Title>

              <Card.Text>
                See messages sent by clients.
              </Card.Text>

              <Button
                as={Link}
                to="/admin/messages"
                variant="dark"
              >
                View Messages
              </Button>

            </Card.Body>
          </Card>
        </Col>

      </Row>


      {/* LOGOUT */}
      <div className="text-center mt-5">

        <Button
          variant="outline-danger"
          onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("adminUsername");

            window.location.href = "/login";
          }}
        >
          Logout
        </Button>

      </div>

    </Container>
  );
}

export default Dashboard;