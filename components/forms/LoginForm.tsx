import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import { loginUser } from "../../lib/requests";
import { useRouter } from "next/router";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { loginSchema } from "../../lib/validation";

interface IInitialValues {
  usernameOrEmail: string;
  password: string;
}

interface IErrorProp {
  status: number;
  message: string;
}

const initialValues: IInitialValues = {
  usernameOrEmail: "",
  password: "",
};

export const LoginForm = () => {
  const router = useRouter();

  const { mutate, isLoading, isError, error } = useMutation(loginUser, {
    onSuccess: () => {
      router.push("/");
    },
    onError: (error: IErrorProp) => {
      console.log(error);
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
      onSubmit={handleSubmit}
      initialValues={initialValues}
      validationSchema={loginSchema}
    >
      {({ isSubmitting, isValid, dirty }) => (
        <Form
          className="flex flex-col items-center gap-4 mt-8"
          autoComplete="off"
        >
          <div className="w-full">
            <label
              htmlFor="usernameOrEmail"
              className="text-base font-medium text-gray-900 mb-2 block"
            >
              Username or Email
            </label>
            <Field
              type="text"
              placeholder="Username or email"
              name="usernameOrEmail"
              id="usernameOrEmail"
              className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 focus:border-gray-400 disabled:cursor-not-allowed disabled:opacity-50"
            />
            <ErrorMessage
              className="mt-1 text-xs text-red-500"
              name="usernameOrEmail"
              component="div"
            />
            {isError && error.status === 401 ? (
              <div className="mt-1 text-xs text-red-500">{error.message}</div>
            ) : null}
          </div>
          <div className="w-full">
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="text-base font-medium text-gray-900 mb-2 block"
              >
                Password
              </label>
              <Link
                href="/forgot/password"
                className="text-sm font-semibold text-black hover:underline"
              >
                Forgot Password?
              </Link>
            </div>
            <Field
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 focus:border-gray-400 disabled:cursor-not-allowed disabled:opacity-50"
            />
            <ErrorMessage
              className="mt-1 text-xs text-red-500"
              name="password"
              component="div"
            />
            {isError && error.status === 400 ? (
              <div className="mt-1 text-xs text-red-500">{error.message}</div>
            ) : null}
          </div>
          <button
            type="submit"
            className="inline-flex w-full items-center mt-4 justify-center rounded-md bg-blue-400 px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-blue-500"
            disabled={isLoading || isSubmitting || !dirty}
          >
            {isLoading || isSubmitting ? "loading..." : "Log in"}
          </button>
        </Form>
      )}
    </Formik>
  );
};
