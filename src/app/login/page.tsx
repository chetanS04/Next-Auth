"use client";
import React, { useEffect, useState, FormEvent } from "react";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FaGithub, FaGoogle, FaApple, FaEnvelope, FaLock } from "react-icons/fa";

const Login = () => {
  const router = useRouter();
  const [error, setError] = useState<string>("");
  const { status: sessionStatus } = useSession();

  useEffect(() => {
    if (sessionStatus === "authenticated") {
      router.replace("/dashboard");
    }
  }, [sessionStatus, router]);

  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = e.currentTarget.email.value;
    const password = e.currentTarget.password.value;

    // Validation
    if (!isValidEmail(email)) {
      setError("Email is invalid");
      return;
    }
    if (!password || password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }

    // Sign in
    const res = await signIn("credentials", {
      redirect: false, // Prevent automatic redirect to allow error handling
      email,
      password,
    });

    if (res?.error) {
      setError("Invalid email or password");
    } else {
      setError("");
      router.replace("/dashboard"); // Navigate to dashboard on successful sign-in
    }
  };

  if (sessionStatus === "loading") {
    return <h1 className="text-3xl text-gray-700">Loading...</h1>;
  }

  return (
    sessionStatus !== "authenticated" && (
      <div className="font-[sans-serif]">
        <div className="min-h-screen flex flex-col items-center justify-center">
          <div className="grid md:grid-cols-2 items-center gap-4 max-md:gap-8 max-w-6xl max-md:max-w-lg w-full p-4 m-4 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-md">
            <div className="md:max-w-md w-full px-4 py-4">
              <form onSubmit={handleSubmit}>
                <div className="mb-12">
                  <h3 className="text-gray-800 text-3xl font-extrabold">Sign in</h3>
                  <p className="text-sm mt-4 text-gray-800">
                    Donot have an account?{" "}
                    <Link href="/register" className="text-blue-600 font-semibold hover:underline">
                      Register here
                    </Link>
                  </p>
                </div>

                <div>
                  <label className="text-gray-800 text-xs block mb-2">Email</label>
                  <div className="relative flex items-center">
                    <input
                      name="email"
                      type="text"
                      required
                      className="w-full text-gray-800 text-sm border-b border-gray-300 focus:border-blue-600 px-2 py-3 outline-none"
                      placeholder="Enter email"
                    />
                    <FaEnvelope className="w-[18px] h-[18px] absolute right-2 text-gray-400" />
                  </div>
                </div>

                <div className="mt-8">
                  <label className="text-gray-800 text-xs block mb-2">Password</label>
                  <div className="relative flex items-center">
                    <input
                      name="password"
                      type="password"
                      required
                      className="w-full text-gray-800 text-sm border-b border-gray-300 focus:border-blue-600 px-2 py-3 outline-none"
                      placeholder="Enter password"
                    />
                    <FaLock className="w-[18px] h-[18px] absolute right-2 text-gray-400" />
                  </div>
                </div>

                <div className="mt-12">
                  <button
                    type="submit"
                    className="w-full shadow-xl py-2.5 px-4 text-sm tracking-wide rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                  >
                    Sign in
                  </button>
                  {error && <p className="text-red-500 text-center mt-2">{error}</p>}
                </div>

                <div className="space-x-6 flex justify-center mt-6">
                  <button type="button" onClick={() => signIn("google")} className="border-none outline-none">
                    <FaGoogle className="w-8 h-8" />
                  </button>
                  <button type="button" onClick={() => signIn("apple")} className="border-none outline-none">
                    <FaApple className="w-8 h-8" />
                  </button>
                  <button type="button" onClick={() => signIn("github")} className="border-none outline-none">
                    <FaGithub className="w-8 h-8" />
                  </button>
                </div>
              </form>
            </div>

            <div className="md:h-full bg-[#000842] rounded-xl lg:p-12 p-8">
              
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default Login;
