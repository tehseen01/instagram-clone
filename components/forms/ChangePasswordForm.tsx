import { useMutation } from "@tanstack/react-query";
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import React from "react";
import { toast } from "react-toastify";
import { DataMessage, IUpdatePassword } from "../../lib/interface";
import { changePasswordSchema } from "../../lib/validation";
import { updatePassword } from "../../lib/utils/requests";

const initialValues: IUpdatePassword = {
  oldPassword: "",
  newPassword: "",
  confirmPassword: "",
};

const ChangePasswordForm = () => {
  const { mutate } = useMutation({
    mutationFn: updatePassword,
    onSuccess: (data) => {
      toast.success(data.message);
    },
  });

  const handleSubmit = async (
    values: IUpdatePassword,
    { setSubmitting, resetForm }: FormikHelpers<IUpdatePassword>
  ) => {
    await mutate(values);

    resetForm();
    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={changePasswordSchema}
    >
      {({ isSubmitting, isValid, dirty }) => (
        <Form className="grid p-4 gap-2">
          <label className="font-medium" htmlFor="oldPassword">
            Old password
          </label>
          <Field
            className="rounded-md border-gray-300 focus:ring-0"
            type="password"
            name="oldPassword"
            id="oldPassword"
          />
          <ErrorMessage name="oldPassword" component="div" />

          <label className="font-medium" htmlFor="newPassword">
            New password
          </label>
          <Field
            className="rounded-md border-gray-300 focus:ring-0"
            type="password"
            name="newPassword"
            id="newPassword"
          />
          <ErrorMessage name="newPassword" component="div" />

          <label className="font-medium" htmlFor="confirmPassword">
            Confirm password
          </label>
          <Field
            className="rounded-md border-gray-300 focus:ring-0"
            type="password"
            name="confirmPassword"
            id="confirmPassword"
          />
          <ErrorMessage name="confirmPassword" component="div" />

          <div>
            <button
              type="submit"
              disabled={isSubmitting || !dirty}
              className="bg-blue-400 hover:bg-blue-500 text-white px-4 py-2 rounded-md mt-4 disabled:bg-blue-200 disabled:hover:bg-blue-200"
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </div>
          <div>
            <button className="text-blue-400 hover:text-blue-800">
              Forgot password?
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default ChangePasswordForm;
