import React, { useState, useContext } from 'react'
import { Container, Form, Button, Row, Col } from 'react-bootstrap'
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../Admin/UserContext";
const CreatePainting = () => {
  const [painting, setPainting] = useState({
    
    title: "",
   description: "",
   category: "",
    image: "",
  })

  // Merr userInfo nga context-i.
  const { userInfo } = useContext(UserContext);
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const [uploadedImage, setUploadedImage] = useState(null);
  const nav = useNavigate();
  const handleChange = (e) => {
    setPainting({ ...painting, [e.target.name]: e.target.value })
  }
  const handleImage = (e) => {
    setPainting({ ...painting, image: e.target.files[0] })
    // Afishimi i imazhit 
    setUploadedImage(URL.createObjectURL(e.target.files[0]));
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData();
    Object.entries(painting).forEach(([key, value]) => {
      formData.append(key, value);
    })
    formData.append('userId', userInfo.id)
    setError(null)
    setSuccess(null)

    await axios.post("http://localhost:5000/api/paintings", formData)
      .then(res => {
        setSuccess("Painting added successfully.")
        nav("/gallery");
      })
      .catch((err) => setError(err.response?.data?.message || "Painting could not be added."))
  }
  return (
    <Container>
      <h1>Create Item</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
      <Row>
        <Col xs={12} md={6}>
          <Form onSubmit={handleSubmit} encType='multipart/form-data'>
            <Form.Group className="mb-3" controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" name="title" value={painting.title} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="image">
              <Form.Label>Image</Form.Label>
              <Form.Control type="file" name="image" onChange={handleImage} accept='.jpeg, .png, .jpg' />
            </Form.Group>
            <Form.Group className="mb-3" controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows={3} name="description" value={painting.description} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="category">
              <Form.Label>Category</Form.Label>
              <Form.Control type="text" name="category" value={painting.category} onChange={handleChange} />
            </Form.Group>
            <Button variant="primary" type="submit">
              Create Item
            </Button>
          </Form>
        </Col>
        <Col>
          {uploadedImage && <img src={uploadedImage} alt="Uploaded" style={{ width: "100%", height: "auto" }} />}
        </Col>
      </Row>

    </Container>
  )
}

export default CreatePainting
