"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { FaEnvelope, FaLock } from "react-icons/fa";

const Register = () => {
  const [error, setError] = useState("");
  const router = useRouter();
  const { status: sessionStatus } = useSession();

  useEffect(() => {
    if (sessionStatus === "authenticated") {
      router.replace("/dashboard");
    }
  }, [sessionStatus, router]);

  const isValidEmail = (email: string) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement).value;

    if (!isValidEmail(email)) {
      setError("Email is invalid");
      return;
    }

    if (!password || password.length < 8) {
      setError("Password is invalid");
      return;
    }

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (res.status === 400) {
        setError("This email is already registered");
      }

      if (res.status === 200) {
        setError("");
        router.push("/login");
      }
    } catch (error) {
      setError("Error, try again");
      console.log(error);
    }
  };

  if (sessionStatus === "loading") {
    return <h1 className="text-3xl font-semibold text-gray-700">Loading...</h1>;
  }

  return (
    sessionStatus !== "authenticated" && (
      <div style={{}}>
        <div className="font-[sans-serif]">
          <div className="min-h-screen flex flex-col items-center justify-center">
            <div className="grid md:grid-cols-2 items-center gap-4 max-md:gap-8 max-w-6xl max-md:max-w-lg w-full p-4 m-4 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-md">
              <div className="md:max-w-md w-full px-4 py-4">
                <form onSubmit={handleSubmit}>
                  <div className="mb-12">
                    <h3 className="text-gray-800 text-3xl font-extrabold">Create Account</h3>
                    <p className="text-sm mt-4 text-gray-800">
                      Already have an account? 
                      <Link href="/login" className="text-blue-600 font-semibold hover:underline ml-1 whitespace-nowrap">Login here</Link>
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
                      <FaEnvelope className="absolute right-2 text-gray-400 w-5 h-5" />
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
                      <FaLock className="absolute right-2 text-gray-400 w-5 h-5" />
                    </div>
                  </div>

                  <div className="mt-12">
                    <button
                      type="submit"
                      className="w-full shadow-xl py-2.5 px-4 text-sm tracking-wide rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                    >
                      Register
                    </button>
                    {error && <p className="text-red-500 text-center mt-2">{error}</p>}
                  </div>
                </form>
              </div>

              <div className="md:h-full bg-[#000842] rounded-xl lg:p-12 p-8">
             
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default Register;
