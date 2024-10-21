"use client";
import React from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { Session } from "next-auth"; // Ensure Session type is imported

const Navbar = () => {
  const { data: session }: { data: Session | null } = useSession();

  return (
    <div>
      <ul className="flex justify-between m-10 items-center">
        <li>
          <Link href="/">Home</Link>
        </li>
        <div className="flex gap-10">
          <li>
            <Link href="/dashboard">Dashboard</Link>
          </li>
          {!session ? (
            <>
              <li>
                <Link href="/login">Login</Link>
              </li>
              <li>
                <Link href="/register">Register</Link>
              </li>
            </>
          ) : (
            <>
              <li>{session.user?.email}</li>
              <li>
                <button
                  onClick={() => signOut()}
                  className="p-2 px-5 -mt-1 bg-blue-800 rounded-full"
                >
                  Logout
                </button>
              </li>
            </>
          )}
        </div>
      </ul>
    </div>
  );
};

export default Navbar;
