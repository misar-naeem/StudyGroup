import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { emailSchema, passwordSchema } from "./common/ValidationSchemas";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import styles from "../styles/BootstrapInput.module.css";
import {Form, Button} from "react-bootstrap";
import { Formik } from "formik";
import { BootstrapInput } from "../components/BootstrapInput";
import * as Yup from "yup";

const initialValues = {
  email: "",
  password: "",
};

const validationSchema = Yup.object({
  email: emailSchema, 
  password: passwordSchema,
});


const adminLogin = ({data}) => {
    function handleSubmit(values) {
        console.log(values, data);
    }

  return (
    <div className={styles.adminLogin}>
      <div className={`${styles.adminHeader}`}>
             <FontAwesomeIcon icon={faUsers} className="fa-2x"/>
             <h1 className={styles.fs35}>StudyGroup</h1>
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          handleSubmit(values);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (
          <Form onSubmit={handleSubmit} className={styles.form}>
            <h2 className={`${styles.adminHeader} ${styles.fs20} mt-2`}>Admin Login</h2>
            <BootstrapInput
              controlId="form-login-email"
              label="Email Address:"
              name="email"
              placeholder="Email"
              errors={errors.email}
              touched={touched.email}
              handleChange={handleChange}
              handleBlur={handleBlur}
              value={values.email}
              className={errors.email && touched.email ? "" : styles.gap}
            />
            <BootstrapInput
              controlId="form-login-password"
              label="Password:"
              name="password"
              placeholder="Password"
              errors={errors.password}
              touched={touched.password}
              handleChange={handleChange}
              handleBlur={handleBlur}
              value={values.password}
              type="password"
              className={errors.password && touched.password ? "" : styles.gap}
            />
            <Button type="submit" className={styles.primBtn}>
              Login
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default adminLogin;
