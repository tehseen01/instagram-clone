import { MdErrorOutline } from "react-icons/md";
import * as Yup from "yup";

export const changePasswordSchema = Yup.object().shape({
  oldPassword: Yup.string().required(" Required"),

  newPassword: Yup.string()
    .required("Required")
    .notOneOf(
      [Yup.ref("oldPassword")],
      "New password must me different from old password"
    )
    .min(6, "Must be at least 6 character"),

  confirmPassword: Yup.string()
    .required("Required")
    .oneOf([Yup.ref("newPassword")], "Password must match")
    .min(6, "Must be at least 6 character"),
});
