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
      {({ isSubmitting, isValid, dirty }) => (
        <Form className="w-full p-2 flex flex-col gap-3">
          <div>
            <Field
              name="email"
              id="email"
              type="email"
              placeholder="example@gmail.com"
              className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 focus:border-gray-400 disabled:cursor-not-allowed disabled:opacity-50"
            />
            <ErrorMessage
              className="mt-1 text-xs text-gray-500"
              name="email"
              component="div"
            />
          </div>
          <div>
            <Field
              name="name"
              id="name"
              type="text"
              placeholder="John Doe"
              className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 focus:border-gray-400 disabled:cursor-not-allowed disabled:opacity-50"
            />
            <ErrorMessage
              className="mt-1 text-xs text-gray-500"
              name="name"
              component="div"
            />
          </div>
          <div>
            <Field
              name="username"
              id="username"
              type="text"
              placeholder="john_doe"
              className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 focus:border-gray-400 disabled:cursor-not-allowed disabled:opacity-50"
            />
            <ErrorMessage
              className="mt-1 text-xs text-gray-500"
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
              className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 focus:border-gray-400 disabled:cursor-not-allowed disabled:opacity-50"
            />
            <ErrorMessage
              className="mt-1 text-xs text-gray-500"
              name="password"
              component="div"
            />
          </div>
          <button
            type="submit"
            className="inline-flex w-full items-center mt-4 justify-center rounded-md bg-blue-400 px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-blue-500"
            disabled={isSubmitting || !dirty}
          >
            {isSubmitting || isLoading ? "loading..." : "Create Account"}
          </button>
        </Form>
      )}
    </Formik>
  );
};
