"use client";
import Image from "next/image";
import { useState } from "react";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "@/app/lib/firebase/auth";
import { useRouter } from "next/navigation";

interface LoginFormData {
  email: string;
  password: string;
}

interface AuthError {
  message: string;
}

export default function LoginPage() {
  const router = useRouter();

  // Typed state
  const [form, setForm] = useState<LoginFormData>({
    email: "",
    password: "",
  });

  const [error, setError] = useState<AuthError | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // Email login
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    try {
      await signInWithEmailAndPassword(auth, form.email, form.password);
      router.push("/");
    } catch (err: any) {
      setError({ message: err.message });
    }
  };

  // Google login
  const handleGoogleSignIn = async () => {
    setError(null);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      router.push("/");
    } catch (err: any) {
      setError({ message: err.message });
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-8 rounded-2xl w-full max-w-sm shadow-xl">
        
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <Image src="/pacman1.png" alt="Logo" width={50} height={50} />
          <h1 className="text-white text-3xl font-bold">TypingApp</h1>
        </div>

        {/* Heading */}
        <div className="text-center mb-6">
          <h2 className="text-white text-2xl font-semibold">Welcome Back</h2>
          <p className="text-gray-300 text-sm">Log in to continue your typing practice</p>
        </div>

        {/* ERROR */}
        {error && (
          <div className="bg-red-500/30 text-red-300 p-2 rounded text-sm mb-3">{error.message}</div>
        )}

        {/* Form */}
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          
          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={form.email}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-white/20 border border-white/30 
                       rounded-lg text-white placeholder-gray-200 
                       focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          {/* Password */}
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={form.password}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-white/20 border border-white/30 
                       rounded-lg text-white placeholder-gray-200 
                       focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          {/* Login */}
          <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg font-semibold transition">
            Log In
          </button>

          {/* Divider */}
          <div className="flex items-center">
            <div className="flex-1 h-px bg-gray-700"></div>
            <div className="px-3 text-gray-400 text-sm">or</div>
            <div className="flex-1 h-px bg-gray-700"></div>
          </div>

          {/* Google */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center gap-3 
                       border border-white/20 hover:bg-blue-600 
                       text-white py-2 rounded-lg font-semibold transition"
          >
            <Image src="/google11.jpg" alt="Google" width={30} height={30} />
            Continue with Google
          </button>
        </form>

        {/* Footer */}
        <p className="text-gray-400 text-center text-sm mt-4">
          Don’t have an account?{" "}
          <a href="/signup" className="text-blue-400 hover:underline">Sign Up</a>
        </p>
      </div>
    </div>
  );
}
