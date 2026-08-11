import { useState } from "react";
import { Container, Form, Button, Alert, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AddPainting() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    if (!title || !image) {
      setError("Titulli dhe fotografia janë të detyrueshme.");
      return;
    }

    const formData = new FormData();

    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("image", image);

    try {
 const token = localStorage.getItem("token");

await axios.post(
  "http://localhost:5000/api/paintings",
  formData,
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);
      setMessage("Piktura u shtua me sukses!");

      setTitle("");
      setDescription("");
      setCategory("");
      setImage(null);

      document.getElementById("paintingImage").value = "";

    } catch (err) {
      console.log(err);

      setError(
        err.response?.data?.message ||
        "Piktura nuk u shtua."
      );
    }
  };

  return (
    <Container className="py-5">

      <Card className="shadow p-4 mx-auto" style={{ maxWidth: "700px" }}>

        <h2 className="mb-4">
          Add New Painting
        </h2>

        {message && (
          <Alert variant="success">
            {message}
          </Alert>
        )}

        {error && (
          <Alert variant="danger">
            {error}
          </Alert>
        )}

        <Form onSubmit={handleSubmit}>

          <Form.Group className="mb-3">
            <Form.Label>Painting Title</Form.Label>

            <Form.Control
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter painting title"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>

            <Form.Control
              as="textarea"
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the painting"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Category</Form.Label>

            <Form.Control
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="e.g. Abstract, Portrait, Landscape"
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Painting Image</Form.Label>

            <Form.Control
              id="paintingImage"
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </Form.Group>

          <Button
            type="submit"
            variant="dark"
            className="w-100"
          >
            Add Painting
          </Button>

        </Form>

      </Card>

    </Container>
  );
}

export default AddPainting;