import { useEffect, useState } from "react";
import { Card, Col, Container, Row, Spinner } from "react-bootstrap";
import image00001 from "../assets/images/image00001.jpeg";
import image00002 from "../assets/images/image00002.jpeg";
import image00003 from "../assets/images/image00003.jpeg";
import image00004 from "../assets/images/image00004.jpeg";
import image00005 from "../assets/images/image00005.jpeg";
import image00006 from "../assets/images/image00006.jpeg";
import image00007 from "../assets/images/image00007.jpeg";
import image00008 from "../assets/images/image00008.jpeg";
import image00009 from "../assets/images/image00009.jpeg";
import image00010 from "../assets/images/image00010.jpeg";
import image00011 from "../assets/images/image00011.jpeg";
import image00012 from "../assets/images/image00012.jpeg";
import image00013 from "../assets/images/image00013.jpeg";
import image00014 from "../assets/images/image00014.jpeg";
import image00015 from "../assets/images/image00015.jpeg";
import image00016 from "../assets/images/image00016.jpeg";
import image00017 from "../assets/images/image00017.jpeg";
import image00018 from "../assets/images/image00018.jpeg";
import image00019 from "../assets/images/image00019.jpeg";
import image00020 from "../assets/images/image00020.jpeg";
import "./Gallery.css";

const API_URL = "http://localhost:5000/api/paintings";
const SERVER_URL = "http://localhost:5000";
const localImages = [
  image00001, image00002, image00003, image00004, image00005,
  image00006, image00007, image00008, image00009, image00010,
  image00011, image00012, image00013, image00014, image00015,
  image00016, image00017, image00018, image00019, image00020,
];
const defaultPaintings = localImages.map((image, index) => ({
  _id: `local-${index + 1}`,
  title: `Painting ${index + 1}`,
  image,
  isLocal: true,
}));

function Gallery() {
  const [paintings, setPaintings] = useState(defaultPaintings);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPaintings() {
      try {
        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error("Unable to load paintings.");
        }

        const databasePaintings = await response.json();

        if (databasePaintings.length > 0) {
          setPaintings(databasePaintings);
        }
      } catch (err) {
        // Keep the local collection visible when the backend is not running.
      } finally {
        setLoading(false);
      }
    }

    loadPaintings();
  }, []);

  const imageUrl = (painting) => {
    if (painting.isLocal || painting.image.startsWith("http")) {
      return painting.image;
    }

    return `${SERVER_URL}${painting.image.startsWith("/") ? painting.image : `/${painting.image}`}`;
  };

  return (
    <main className="gallery-page">
      <Container>
        <h1 className="gallery-title">Gallery</h1>

        {loading && <div className="text-center"><Spinner animation="border" /></div>}
        {!loading && paintings.length === 0 && (
          <p className="text-center">No paintings are available yet.</p>
        )}

        <Row>
          {paintings.map((painting) => (
            <Col lg={4} md={6} key={painting._id}>
              <Card className="gallery-card">
                <Card.Img variant="top" src={imageUrl(painting)} alt={painting.title} />
                <Card.Body>
                  <Card.Title>{painting.title}</Card.Title>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </main>
  );
}

export default Gallery;
