import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <Container className="py-5">

      <div className="d-flex justify-content-between align-items-center mb-5">
        <h2>Admin Dashboard</h2>

        <Button variant="outline-danger">
          Logout
        </Button>
      </div>

      <Row className="g-4">

        <Col md={4}>
          <Card className="shadow h-100 text-center p-4">
            <h1>🖼️</h1>
            <h4>Manage Paintings</h4>
            <p>Add, edit or delete paintings.</p>

            <Link to="/admin/manage" className="btn btn-dark">
              Open
            </Link>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="shadow h-100 text-center p-4">
            <h1>➕</h1>
            <h4>Add Painting</h4>
            <p>Upload a new artwork.</p>

            <Link to="/admin/add" className="btn btn-dark">
              Add
            </Link>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="shadow h-100 text-center p-4">
            <h1>📩</h1>
            <h4>Messages</h4>
            <p>View contact messages.</p>

            <Link to="/admin/messages" className="btn btn-dark">
              View
            </Link>
          </Card>
        </Col>

      </Row>

    </Container>
  );
}

export default Dashboard;