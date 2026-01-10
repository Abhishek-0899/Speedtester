"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/app/lib/firebase/auth";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const router = useRouter();
  const pathname = usePathname();

  // Hide navbar on auth pages
  if (pathname === "/login" || pathname === "/signup") return null;

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsub();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/");
  };

  return (
    <nav className="h-20 flex items-center px-4 md:px-10 shadow-lg shadow-black/70">
      <div className="flex justify-between items-center w-full">
        <div className="flex items-center gap-3">
          <Image src="/pacman1.png" alt="logo" width={60} height={40} />
          <button onClick={() => router.push("/")}>
            <h1 className="text-white text-xl md:text-2xl font-bold">
              Typing Masters
            </h1>
          </button>
        </div>

        <div className="hidden md:flex items-center gap-8 text-white font-semibold">
          <Link
            href="/Dashboard"
            className="rounded-xl px-4 py-1.5 hover:bg-blue-900 transition"
          >
            Dashboard
          </Link>
          <Link
            href="/Summarize"
            className="rounded-xl px-4 py-1.5 hover:bg-blue-900 transition"
          >
            Ai Summarize
          </Link>
          <Link
            href="/Stats"
            className="rounded-xl px-4 py-1.5 hover:bg-blue-900 transition"
          >
            Statistics
          </Link>

          {!user ? (
            <>
              <Link
                href="/pages/login"
                className="border rounded-xl px-4 py-1.5 hover:bg-blue-900 transition"
              >
                Login
              </Link>

              <Link
                href="/pages/signup"
                className="rounded-xl px-4 py-1.5 bg-blue-900 hover:bg-blue-950 transition"
              >
                Sign Up
              </Link>
            </>
          ) : (
            <>
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt="profile"
                  className="w-9 h-9 rounded-full border border-white/20 cursor-pointer"
                />
              ) : (
                <Image
                  src="/avatar.png"
                  alt="profile"
                  width={36}
                  height={36}
                  className="rounded-full border border-white/20 cursor-pointer"
                />
              )}
              <button
                type="button"
                onClick={handleLogout}
                className="rounded-xl px-4 py-1.5 bg-red-900 hover:bg-red-950 transition"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
