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

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsub();
  }, []);

  // lock body when scroll is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
  }, [menuOpen]);

  // Hide navbar on auth pages
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
    <nav className="relative h-20 flex items-center px-4 md:px-10 bg-[#0d111f] shadow-lg shadow-black/70 z-50">
      <div className="flex justify-between items-center w-full text-2xl">
        {/* logo */}
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
        {/* 🔴 CHANGE: MOBILE HAMBURGER (always visible) */}
        <button
          className="md:hidden text-white text-3xl z-[101]"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          {menuOpen ? <BiX /> : <BiMenu />}
        </button>

        {/* mobile Hamburger */}
        {menuOpen && (
          <div className="fixed inset-0 bg-[#0d111f] z-[100] md:hidden">
            <div className="flex flex-col gap-8 px-6 pt-28 text-white text-lg">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  onClick={() => setMenuOpen(false)}
                  href={user ? link.href : "#"}
                  className={`pb-3 border-b border-white/10 ${
                    user
                      ? "hover:text-blue-400"
                      : "text-gray-600 pointer-events-none"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="border-t border-white/10 pt-6 flex flex-col gap-4">
                {!user ? (
                  <>
                    <Link
                      href="/pages/login"
                      onClick={() => setMenuOpen(false)}
                      className="border rounded-xl px-4 py-2 hover:bg-blue-900 transition text-center"
                    >
                      Login
                    </Link>
                    <Link
                      href="/pages/signup"
                      onClick={() => setMenuOpen(false)}
                      className="rounded-xl px-4 py-2 bg-blue-900 hover:bg-blue-950 transition text-center"
                    >
                      Sign Up
                    </Link>
                  </>
                ) : (
                  <button
                    onClick={handleLogout}
                    type="button"
                    className="rounded-xl px-4 py-2 bg-red-900 hover:bg-red-950 transition text-center"
                  >
                    LogOut
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
