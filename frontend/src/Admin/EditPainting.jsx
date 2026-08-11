import { useEffect, useState } from "react";
import { Container, Form, Button, Alert, Card } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function EditPainting() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const getPainting = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/paintings/${id}`
        );

        const painting = response.data;

        setTitle(painting.title || "");
        setDescription(painting.description || "");
        setCategory(painting.category || "");

      } catch (error) {
        console.log(error);
        setError("Piktura nuk u gjet.");
      } finally {
        setLoading(false);
      }
    };

    getPainting();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    try {
      const formData = new FormData();

      formData.append("title", title);
      formData.append("description", description);
      formData.append("category", category);

      if (image) {
        formData.append("image", image);
      }

     const token = localStorage.getItem("token");

await axios.put(
  `http://localhost:5000/api/paintings/${id}`,
  formData,
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);

      setMessage("Piktura u përditësua me sukses!");

      setTimeout(() => {
        navigate("/admin/manage");
      }, 1000);

    } catch (error) {
      console.log("Update error:", error);

      setError(
        error.response?.data?.message ||
        "Piktura nuk u përditësua."
      );
    }
  };

  if (loading) {
    return (
      <Container className="py-5 text-center">
        Loading...
      </Container>
    );
  }

  return (
    <Container className="py-5">

      <Card
        className="shadow p-4 mx-auto"
        style={{ maxWidth: "700px" }}
      >

        <h2 className="mb-4">
          Edit Painting
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
            <Form.Label>
              Painting Title
            </Form.Label>

            <Form.Control
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>
              Description
            </Form.Label>

            <Form.Control
              as="textarea"
              rows={4}
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>
              Category
            </Form.Label>

            <Form.Control
              type="text"
              value={category}
              onChange={(e) =>
                setCategory(e.target.value)
              }
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>
              New Image (optional)
            </Form.Label>

            <Form.Control
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={(e) =>
                setImage(e.target.files[0])
              }
            />
          </Form.Group>

          <div className="d-flex gap-2">

            <Button
              type="submit"
              variant="dark"
            >
              Save Changes
            </Button>

            <Button
              type="button"
              variant="secondary"
              onClick={() =>
                navigate("/admin/manage")
              }
            >
              Cancel
            </Button>

          </div>

        </Form>

      </Card>

    </Container>
  );
}

export default EditPainting;