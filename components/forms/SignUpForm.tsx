import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import React from "react";
import { signUpSchema } from "../../lib/validation";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { signUpUser } from "../../lib/requests";

interface IInitialValues {
  email: string;
  name: string;
  username: string;
  password: string;
}

const initialValues: IInitialValues = {
  email: "",
  name: "",
  username: "",
  password: "",
};

export const SignUpForm = () => {
  const router = useRouter();

  const { mutate, isLoading } = useMutation({
    mutationFn: signUpUser,
    onSuccess: () => {
      router.push("/");
    },
  });

  const handleSubmit = async (
    values: IInitialValues,
    { setSubmitting, resetForm }: FormikHelpers<IInitialValues>
  ) => {
    await mutate(values);

    resetForm();
    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={signUpSchema}
    >
      {({ isSubmitting, isValid, dirty, touched, errors }) => (
        <Form className="w-full p-2 flex flex-col gap-3">
          <div>
            <Field
              name="email"
              id="email"
              type="email"
              placeholder="Enter your Email"
              className={`flex h-10 w-full rounded-md border ${
                touched.email && errors.email
                  ? "border-red-500"
                  : "border-gray-300"
              } bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 focus:border-gray-400 disabled:cursor-not-allowed disabled:opacity-50`}
            />
            <ErrorMessage
              className="mt-1 text-xs text-red-500"
              name="email"
              component="div"
            />
          </div>
          <div>
            <Field
              name="name"
              id="name"
              type="text"
              placeholder="Enter your Full Name"
              className={`flex h-10 w-full rounded-md border ${
                touched.name && errors.name
                  ? "border-red-500"
                  : "border-gray-300"
              } bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 focus:border-gray-400 disabled:cursor-not-allowed disabled:opacity-50`}
            />
            <ErrorMessage
              className="mt-1 text-xs text-red-500"
              name="name"
              component="div"
            />
          </div>
          <div>
            <Field
              name="username"
              id="username"
              type="text"
              placeholder="Enter your Username"
              className={`flex h-10 w-full rounded-md border ${
                touched.username && errors.username
                  ? "border-red-500"
                  : "border-gray-300"
              } bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 focus:border-gray-400 disabled:cursor-not-allowed disabled:opacity-50`}
            />
            <ErrorMessage
              className="mt-1 text-xs text-red-500"
              name="username"
              component="div"
            />
          </div>
          <div>
            <Field
              name="password"
              id="password"
              type="password"
              placeholder="Enter your password"
              className={`flex h-10 w-full rounded-md border ${
                touched.password && errors.password
                  ? "border-red-500"
                  : "border-gray-300"
              } bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 focus:border-gray-400 disabled:cursor-not-allowed disabled:opacity-50`}
            />
            <ErrorMessage
              className="mt-1 text-xs text-red-500"
              name="password"
              component="div"
            />
          </div>
          <button
            type="submit"
            className={`inline-flex w-full items-center mt-4 justify-center rounded-md px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-blue-500 bg-blue-400 ${
              (isSubmitting ||
                isLoading ||
                Object.keys(errors).length > 0 ||
                !dirty) &&
              "bg-gray-400 cursor-not-allowed hover:bg-gray-400"
            }`}
            disabled={
              isSubmitting ||
              isLoading ||
              Object.keys(errors).length > 0 ||
              !dirty
            }
          >
            {isSubmitting || isLoading ? "loading..." : "Create Account"}
          </button>
        </Form>
      )}
    </Formik>
  );
};
