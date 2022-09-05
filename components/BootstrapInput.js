import { Form } from "react-bootstrap";
import styles from "../../styles/BootstrapInput.module.css";

export const BootstrapInput = ({
  controlId,
  name,
  errors,
  touched,
  handleChange,
  handleBlur,
  value,
  type,
  className,
  placeholder,
}) => {
  return (
    <Form.Group controlId={controlId} className={className}>
      <Form.Control
        name={name}
        className={`${styles.input} ${errors && touched ? styles.notvalid : styles.valid}`}
        onChange={handleChange}
        onBlur={handleBlur}
        value={value}
        type={`${type ? type : "text"}`}
        placeholder={placeholder}
      />
      {touched && errors && <p className={`mb-0 mt-2 ${styles.textRed}`}>{errors}</p>}
    </Form.Group>
  )
}
