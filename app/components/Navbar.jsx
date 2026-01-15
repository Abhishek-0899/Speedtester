"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/app/lib/firebase/auth";
import { BiX, BiMenu } from "react-icons/bi";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // auth listener
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsub();
  }, []);

  // lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [menuOpen]);

  // hide navbar on auth pages
  if (pathname === "/pages/login" || pathname === "/pages/signup") return null;

  const handleLogout = async () => {
    await signOut(auth);
    setMenuOpen(false);
    router.push("/");
  };

  const navLinks = [
    { href: "/Dashboard", label: "Dashboard" },
    { href: "/Summarize", label: "Ai Summarize" },
    { href: "/Stats", label: "Statistics" },
  ];

  return (
    <>
      <nav className="relative h-20 flex items-center px-4 md:px-10 shadow-lg shadow-black/70 z-50 bg-black">
        <div className="flex justify-between items-center w-full text-2xl">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Image src="/pacman1.png" alt="logo" width={60} height={40} />
            <button onClick={() => router.push("/")}>
              <h1 className="text-white text-xl md:text-2xl font-bold">
                Typing Masters
              </h1>
            </button>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8 text-white font-semibold">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={user ? link.href : "#"}
                className={`rounded-xl px-4 py-1.5 transition
                  ${
                    user
                      ? "hover:bg-blue-900 cursor-pointer"
                      : "text-gray-600 pointer-events-none"
                  }
                `}
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
                <Image
                  src={user.photoURL || "/avatar.png"}
                  alt="profile"
                  width={50}
                  height={36}
                  className="rounded-full border border-white/20"
                />
                <button
                  onClick={handleLogout}
                  className="rounded-xl px-4 py-1.5 bg-red-900 hover:bg-red-950 transition"
                >
                  Logout
                </button>
              </>
            )}
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-white text-4xl"
          >
            {menuOpen ? <BiX /> : <BiMenu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Panel */}
      <div
        className={`
          fixed top-20 left-0 w-full h-[calc(100vh-5rem)]
          bg-black/95 backdrop-blur-md
          transform transition-transform duration-300
          md:hidden z-40
          ${menuOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="flex flex-col gap-6 p-6 text-white text-xl">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={user ? link.href : "#"}
              onClick={() => setMenuOpen(false)}
              className={`py-2 border-b border-white/10
                ${user ? "" : "pointer-events-none text-gray-500"}
              `}
            >
              {link.label}
            </Link>
          ))}

          {!user ? (
            <>
              <Link
                href="/pages/login"
                onClick={() => setMenuOpen(false)}
                className="border rounded-xl px-4 py-2 text-center"
              >
                Login
              </Link>
              <Link
                href="/pages/signup"
                onClick={() => setMenuOpen(false)}
                className="rounded-xl px-4 py-2 bg-blue-900 text-center"
              >
                Sign Up
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="rounded-xl px-4 py-2 bg-red-900"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </>
  );
}
