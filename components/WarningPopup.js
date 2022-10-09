import Link from "next/link";
import { Col, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
const WarningPopup = ({ tutorialId }) => {
  return (
    <Row className="d-flex align-items-center mx-5 p-3 gap-5 mt-5" style={{ border: "1px solid black", borderRadius: "5px", width: "max-content" }}>
      <Col>
        <h2 style={{ fontWeight: "500" }}>Warning! You have not published a topic list yet.</h2>
        <br />
        <span style={{ fontWeight: "300" }}>Students will not be able to access this subject until you publish a topic list.</span>
      </Col>
      <Link href={`/create-topic-preferences?tutorialId=${tutorialId}`}>
        <Button style={{ color: "#0D41D", width: "250px" }}>
          Create Topic List
        </Button>
      </Link>
    </Row>
  )
}

export default WarningPopup