import { Container, Row, Col, Button } from "react-bootstrap";
import artistStudio from "../assets/images/artist-studio.jpeg";
import "./About.css";

function About() {
  return (
    <Container className="about-section">
      <Row className="align-items-center">

        <Col lg={5}>
          <img
            src={artistStudio}
            alt="Xhulia Toska painting in her studio"
            className="about-img"
          />
        </Col>

        <Col lg={7}>
          <h5 className="about-subtitle">ABOUT THE ARTIST</h5>
          <h2>Xhulia Toska</h2>

          <p>
            Xhulia Toska (lindur më 5 shtator 1999, Milot, Kurbin) është piktore
            shqiptare, krijimtaria e së cilës shquhet për qasjen realiste dhe
            eksplorimin e formave të ndryshme të shprehjes artistike.
          </p>

          <p>
            Arsimin fillor dhe të mesëm e kreu në Milot, ndërsa studimet
            universitare i përfundoi në Universitetin e Arteve në Tiranë,
            ku u diplomua në programin e studimit "Pikturë Kavalet".
            Formimi i saj akademik, i ndërthurur me një angazhim të vazhdueshëm
            në praktikën artistike, ka ndikuar në zhvillimin e një gjuhe
            vizuale të veçantë, e karakterizuar nga vëmendja ndaj detajit,
            ndjeshmëria estetike dhe kërkimi i vazhdueshëm për të përcjellë
            thellësi emocionale përmes pikturës.
          </p>

          <p>
            Veprimtaria e saj artistike përqendrohet kryesisht tek portretet,
            figura njerëzore, natyra e qetë (still life) dhe kompozimet me
            tematikë historike, të realizuara kryesisht në teknikën e bojës në
            vaj.
          </p>

          <p>
            Aktualisht jeton dhe vepron në Tiranë, ku zhvillon veprimtarinë e
            saj krijuese në studion personale. Aty realizon vepra që
            pasqyrojnë kërkimin e vazhdueshëm estetik dhe angazhimin e saj ndaj
            zhvillimit të një gjuhe artistike autentike.
          </p>

          <h4>Exhibitions</h4>

          <ul>
            <li>2019 – Ekspozitë kolektive, Galeria FAB</li>
            <li>2020 – Ekspozitë kolektive, Galeria FAB</li>
            <li>2023 – Ekspozitë kolektive, Muzeu Historik Kombëtar</li>
            <li>2024 – Ekspozitë kolektive, Galeria e Artit Tiranë</li>
            <li>2026 – Ekspozitë kolektive, Galeria e Artit Tiranë</li>
          </ul>

          <Button className="about-btn">
            View Gallery
          </Button>

        </Col>

      </Row>
    </Container>
  );
}

export default About;
