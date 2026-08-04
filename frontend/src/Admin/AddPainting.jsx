import { Container, Form, Button } from "react-bootstrap";

function AddPainting() {

    return(

        <Container className="py-5">

            <h2>Add Painting</h2>

            <Form>

                <Form.Group className="mb-3">

                    <Form.Label>Title</Form.Label>

                    <Form.Control/>

                </Form.Group>

                <Form.Group className="mb-3">

                    <Form.Label>Description</Form.Label>

                    <Form.Control as="textarea"/>

                </Form.Group>

                <Form.Group className="mb-3">

                    <Form.Label>Category</Form.Label>

                    <Form.Control/>

                </Form.Group>

                <Form.Group className="mb-3">

                    <Form.Label>Upload Image</Form.Label>

                    <Form.Control type="file"/>

                </Form.Group>

                <Button variant="dark">

                    Save Painting

                </Button>

            </Form>

        </Container>

    )

}

export default AddPainting