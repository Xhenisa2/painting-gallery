import { Container, Table, Button } from "react-bootstrap";

function ManagePaintings() {
  return (
    <Container className="py-5">

      <h2>Manage Paintings</h2>

      <Table striped bordered hover>

        <thead>

          <tr>

            <th>Image</th>

            <th>Title</th>

            <th>Edit</th>

            <th>Delete</th>

          </tr>

        </thead>

        <tbody>

          <tr>

            <td>Image</td>

            <td>Painting</td>

            <td>
              <Button variant="warning">
                Edit
              </Button>
            </td>

            <td>
              <Button variant="danger">
                Delete
              </Button>
            </td>

          </tr>

        </tbody>

      </Table>

    </Container>
  );
}

export default ManagePaintings;