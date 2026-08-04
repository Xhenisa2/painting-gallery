import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";

function ReadOnePainting() {

    const { id } = useParams();

    return (

        <Container style={{padding:"120px 0"}}>

            <h1>Painting {id}</h1>

            <p>
                Here will appear the complete information
                about the selected painting.
            </p>

        </Container>

    )

}

export default ReadOnePainting;