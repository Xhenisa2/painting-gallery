import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Alert, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

function ManagePaintings() {
  const [paintings, setPaintings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const getPaintings = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        "http://localhost:5000/api/paintings"
      );

      setPaintings(response.data);
      setError("");
    } catch (error) {
      console.log("Error loading paintings:", error);

      setError("Nuk u arritën të merren pikturat.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPaintings();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "A je e sigurt që dëshiron ta fshish këtë pikturë?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
const token = localStorage.getItem("token");

await axios.delete(
  `http://localhost:5000/api/paintings/${id}`,
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);
      setPaintings(
        paintings.filter((painting) => painting._id !== id)
      );

      setSuccess("Piktura u fshi me sukses!");
      setError("");

    } catch (error) {
      console.log("Delete error:", error);

      setError("Piktura nuk u fshi.");
      setSuccess("");
    }
  };

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner />
        <p className="mt-3">
          Loading paintings...
        </p>
      </Container>
    );
  }

  return (
    <Container className="py-5">

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Manage Paintings</h1>

        <Button
          as={Link}
          to="/admin/add"
          variant="dark"
        >
          + Add Painting
        </Button>
      </div>

      {success && (
        <Alert variant="success">
          {success}
        </Alert>
      )}

      {error && (
        <Alert variant="danger">
          {error}
        </Alert>
      )}

      {paintings.length === 0 ? (
        <Alert variant="info">
          Nuk ka ende piktura në galeri.
        </Alert>
      ) : (
        <Row className="g-4">

          {paintings.map((painting) => (

            <Col
              key={painting._id}
              lg={4}
              md={6}
            >

              <Card className="h-100 shadow-sm">

                <Card.Img
                  variant="top"
                  src={`http://localhost:5000${painting.image}`}
                  style={{
                    height: "350px",
                    objectFit: "cover",
                  }}
                />

                <Card.Body>

                  <Card.Title>
                    {painting.title}
                  </Card.Title>

                  <Card.Text>
                    <strong>Category:</strong>{" "}
                    {painting.category || "Not specified"}
                  </Card.Text>

                  <Card.Text>
                    {painting.description}
                  </Card.Text>

                  <div className="d-flex gap-2">

                    <Button
                      as={Link}
                      to={`/admin/edit/${painting._id}`}
                      variant="outline-dark"
                    >
                      Edit
                    </Button>

                    <Button
                      variant="outline-danger"
                      onClick={() =>
                        handleDelete(painting._id)
                      }
                    >
                      Delete
                    </Button>

                  </div>

                </Card.Body>

              </Card>

            </Col>

          ))}

        </Row>
      )}

    </Container>
  );
}

export default ManagePaintings;