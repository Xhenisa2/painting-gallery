import { useEffect, useState } from "react";

import {
  Container,
  Table,
  Alert,
  Spinner,
  Button,
} from "react-bootstrap";

import { Link } from "react-router-dom";

import axios from "axios";

function Messages() {

  const [messages, setMessages] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");


  // =========================
  // GET MESSAGES
  // =========================

  const getMessages = async () => {

    try {

      setLoading(true);

      setError("");

      const response = await axios.get(
        "http://localhost:5000/api/contacts",
        {
          withCredentials: true,
        }
      );

      setMessages(response.data);

    } catch (error) {

      console.log(
        "Messages error:",
        error.response?.data || error.message
      );

      setError(
        "Nuk u arritën të merren mesazhet."
      );

    } finally {

      setLoading(false);

    }
  };


  // =========================
  // LOAD MESSAGES
  // =========================

  useEffect(() => {

    getMessages();

  }, []);


  // =========================
  // LOADING
  // =========================

  if (loading) {

    return (

      <Container className="py-5 text-center">

        <Spinner />

        <p className="mt-3">
          Loading messages...
        </p>

      </Container>

    );

  }


  // =========================
  // PAGE
  // =========================

  return (

    <Container className="py-5">

      <div className="d-flex justify-content-between align-items-center mb-4">

        <h2>
          Contact Messages
        </h2>

        <Button
          as={Link}
          to="/admin/dashboard"
          variant="dark"
        >
          Back to Dashboard
        </Button>

      </div>


      {/* ERROR */}

      {error && (

        <Alert variant="danger">

          {error}

        </Alert>

      )}


      {/* NO MESSAGES */}

      {!error && messages.length === 0 && (

        <Alert variant="info">

          Nuk ka mesazhe të reja.

        </Alert>

      )}


      {/* MESSAGES */}

      {messages.length > 0 && (

        <Table
          bordered
          hover
          responsive
          className="align-middle"
        >

          <thead>

            <tr>

              <th>
                Name
              </th>

              <th>
                Surname
              </th>

              <th>
                Email
              </th>

              <th>
                Message
              </th>

            </tr>

          </thead>


          <tbody>

            {messages.map((message) => (

              <tr key={message._id}>

                <td>
                  {message.name}
                </td>

                <td>
                  {message.surname}
                </td>

                <td>

                  <a
                    href={`mailto:${message.email}`}
                  >
                    {message.email}
                  </a>

                </td>

                <td>
                  {message.comment}
                </td>

              </tr>

            ))}

          </tbody>

        </Table>

      )}

    </Container>

  );
}

export default Messages;