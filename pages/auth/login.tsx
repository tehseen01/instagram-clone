import Link from "next/link";
import Image from "next/image";

import PhoneImg from "../../public/home-phones.png";

import { LoginForm } from "../../components/forms";

const Login = () => {
  return (
    <main className="w-11/12 m-auto min-h-screen flex items-center justify-center">
      <article className="grid md:grid-cols-2 grid-cols-1 items-center justify-items-center">
        <div className="md:block hidden md:justify-self-end">
          <Image
            src={PhoneImg}
            width={400}
            height={400}
            alt="insta profile"
            className="object-scale-down"
          />
        </div>
        <div className="flex flex-col items-center gap-4 md:justify-self-start w-full">
          <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
            <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">
              Sign in
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Don&#x27;t have an account?{" "}
              <Link
                href="/auth/signup"
                title="sign up"
                className="font-semibold text-black transition-all duration-200 hover:underline"
              >
                Create a free account
              </Link>
            </p>
            <LoginForm />
          </div>
        </div>
      </article>
    </main>
  );
};

export default Login;
