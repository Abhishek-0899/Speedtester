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

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsub();
  }, []);

  // Hide navbar on auth pages
  if (pathname === "/login" || pathname === "/signup") return null;

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/");
  };

  const navLinks = [
    { href: "/Dashboard", label: "Dashboard" },
    { href: "/Summarize", label: " Ai Summarize" },
    { href: "/Stats", label: "Statistics" },
  ];

  return (
    <nav className="h-20 flex items-center px-4 md:px-10 shadow-lg shadow-black/70">
      <div className="flex justify-between items-center w-full text-2xl">
        <div className="flex items-center gap-3">
          <Image src="/pacman1.png" alt="logo" width={60} height={40} />
          <button onClick={() => router.push("/")}>
            <h1 className="text-white text-xl md:text-2xl font-bold">
              Typing Masters
            </h1>
          </button>
        </div>

        <div className="hidden md:flex items-center gap-8 text-white font-semibold">
          {navLinks.map((link, index) => (
            <Link
              key={index}
              href={user ? link.href : "#"}
              className={`rounded-xl px-4 py-1.5 hover:bg-blue-900 transition 
            ${
              user
                ? " hover:bg-blue-900 text-white cursor-pointer"
                : "text-gray-800 pointer-events-none"
            }`}
            >
              {link.label}
            </Link>
          ))}

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
                <Image
                  src={user.photoURL}
                  alt="profile"
                  width={60}
                  height={36}
                  className="rounded-full border border-white/20 cursor-pointer"
                />
              ) : (
                <Image
                  src="/avatar.png"
                  alt="profile"
                  width={50}
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
