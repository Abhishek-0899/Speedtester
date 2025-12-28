"use client";
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/app/lib/firebase/auth";
import { useRouter } from "next/navigation";
// ...existing code...
export default function AuthGuard({ children }) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentuser) => {
      setUser(currentuser);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Checking Sessions
      </div>
    );
  }

  if (!user) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
        <div className="bg-[#0d111f] text-2xl font-bold mb-4 text-white text-center w-full max-w-md p-5 rounded-2xl">
          <h2 className="text-2xl font-bold mb-4">Not Logged In</h2>
          <p className="mb-6">You need to login or sign up to continue.</p>
          <div className="flex justify-center gap-10">
            <button
              onClick={() => router.push("/pages/login")}
              className="px-4 py-2 bg-blue-600 rounded-xl hover:bg-blue-700 transition"
            >
              Login
            </button>
            <button
              onClick={() => router.push("/pages/signup")}
              className="px-4 py-2 bg-purple-600 rounded-xl hover:bg-purple-700 transition"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    );
  }

  // User logged in → render children
  return children;
}
