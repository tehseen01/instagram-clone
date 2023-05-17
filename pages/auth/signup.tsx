import Link from "next/link";
import { SignUpForm } from "../../components/forms";

const signup = () => {
  return (
    <main className="md:w-3/4 m-auto  flex items-center justify-center min-h-screen">
      <article className="flex flex-col gap-4 items-center justify-center max-w-[380px] sm:gap-4">
        <div className=" flex flex-col gap-4 items-center justify-center py-10">
          <h1 className="text-4xl font-bold">Instago</h1>
          <h2 className="text-center text-2xl font-bold leading-tight text-black">
            Sign up to create account
          </h2>
          <p className="mt-2 text-center text-base text-gray-600">
            Already have an account?{" "}
            <Link
              href="/auth/login"
              title="login"
              className="font-medium text-black transition-all duration-200 hover:underline"
            >
              Sign In
            </Link>
          </p>
          <SignUpForm />
        </div>
      </article>
    </main>
  );
};

export default signup;
