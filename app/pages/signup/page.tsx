"use client";
import Image from "next/image";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/app/lib/firebase/auth";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      return setError("Passwords do not match");
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log("User created:", email);
      router.push("/");
    } catch (e: any) {
      setError(e.message);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-8 rounded-2xl w-full max-w-sm shadow-xl">

        <div className="flex flex-col text-center items-center justify-center gap-3 mb-6">
          <Image src="/pacman.png" alt="Logo" width={50} height={50} />
          <h1 className="text-white text-3xl font-bold">Start Your Typing Journey</h1>
          <h3 className="text-gray-400 text-xl">Create an account to track your progress</h3>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          {error && <p className="text-red-400 text-sm text-center">{error}</p>}

          <h1 className="font-bold text-sm text-white">Name</h1>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 bg-white/20 border border-white/30 rounded-lg text-white"
          />

          <h1 className="font-bold text-sm text-white">Email</h1>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 bg-white/20 border border-white/30 rounded-lg text-white"
          />

          <h1 className="font-bold text-sm text-white">Password</h1>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 bg-white/20 border border-white/30 rounded-lg text-white"
          />

          <h1 className="font-bold text-sm text-white">Confirm Password</h1>
          <input
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-2 bg-white/20 border border-white/30 rounded-lg text-white"
          />

          <button className="w-full mt-3 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg font-semibold transition">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}
