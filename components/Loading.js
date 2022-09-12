import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

export const Loading = () => {
  return (
    <>
      <Spinner
        as="span"
        animation="border"
        size="lg"
        role="status"
        aria-hidden="true"
      />
      <span className="visually-hidden">Loading...</span>
    </>
  );
};
