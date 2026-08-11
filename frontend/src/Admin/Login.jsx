import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Alert,
} from "react-bootstrap";

import axios from "axios";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/admin/login",
        {
          username: username,
          password: password,
        }
      );

      console.log("LOGIN SUCCESS:", response.data);

      // Ruaj vetëm username-in
      localStorage.setItem(
        "adminUsername",
        response.data.username
      );

      // Shko në Dashboard
      navigate("/admin/dashboard");

    } catch (error) {
      console.log("LOGIN ERROR:", error);

      console.log(
        "SERVER RESPONSE:",
        error.response?.data
      );

      setError(
        error.response?.data?.message ||
        "Username ose password i gabuar."
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="py-5">

      <Row className="justify-content-center">

        <Col md={5}>

          <Card className="shadow">

            <Card.Body className="p-4">

              <h2 className="text-center mb-4">
                Admin Login
              </h2>

              {error && (
                <Alert variant="danger">
                  {error}
                </Alert>
              )}

              <Form onSubmit={handleLogin}>

                {/* USERNAME */}

                <Form.Group className="mb-3">

                  <Form.Label>
                    Username
                  </Form.Label>

                  <Form.Control
                    type="text"
                    placeholder="Enter username"
                    value={username}
                    onChange={(e) =>
                      setUsername(e.target.value)
                    }
                    required
                  />

                </Form.Group>


                {/* PASSWORD */}

                <Form.Group className="mb-4">

                  <Form.Label>
                    Password
                  </Form.Label>

                  <Form.Control
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) =>
                      setPassword(e.target.value)
                    }
                    required
                  />

                </Form.Group>


                {/* LOGIN BUTTON */}

                <Button
                  type="submit"
                  variant="dark"
                  className="w-100"
                  disabled={loading}
                >
                  {loading
                    ? "Logging in..."
                    : "Login"}
                </Button>

              </Form>

            </Card.Body>

          </Card>

        </Col>

      </Row>

    </Container>
  );
}

export default Login;