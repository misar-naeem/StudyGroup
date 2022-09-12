import * as Yup from "yup";

//Generic email schema
export const emailSchema = Yup.string()
    .email("*Email is not valid")
    .required("*Email is Required field")
    .min(5, "*Email must be at least 5 characters")
    .max(100, "*Email must be less than 255 characters");

    //Generic password schema
export const passwordSchema = Yup.string()
    .required("* Password is Required field")
    .min(8, "* Password must be at least 8 characters")
    .max(30, "* Password cannot be longer than 20 characters")
    .matches(/^\S*$/, "Passwords cannot contain white spaces");

//Generic user input schema
export const regRequiredInputSchema = Yup.string()
  .required("* Required field")
  .min(2, "* Must be at least 2 characters")
  .max(40, "* Must not be longer than 35 characters");
  