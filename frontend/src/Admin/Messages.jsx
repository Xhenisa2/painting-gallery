import { Container, Table } from "react-bootstrap";

function Messages() {
  return (
    <Container className="py-5">

      <h2>Contact Messages</h2>

      <Table bordered hover>

        <thead>

          <tr>

            <th>Name</th>

            <th>Email</th>

            <th>Message</th>

          </tr>

        </thead>

        <tbody>

        </tbody>

      </Table>

    </Container>
  );
}

export default Messages;