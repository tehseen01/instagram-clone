import * as Yup from "yup";

export const loginSchema = Yup.object({
  usernameOrEmail: Yup.string()
    .min(3)
    .max(25)
    .required("*This field is required"),
  password: Yup.string().min(6).required("*This field is required"),
});
