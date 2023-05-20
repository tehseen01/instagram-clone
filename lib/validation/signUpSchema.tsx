import * as Yup from "yup";

export const signUpSchema = Yup.object({
  name: Yup.string().min(2).max(25).required("Name is required"),
  email: Yup.string().email().required("Email is required"),
  username: Yup.string()
    .matches(/^[a-z0-9-._]+$/, `Username can only contain lowercase letters, numbers, and the characters ".", "_", and "-"`)
    .min(2)
    .max(25)
    .required("Username is required"),
  password: Yup.string().min(6).required("Password is required"),
});