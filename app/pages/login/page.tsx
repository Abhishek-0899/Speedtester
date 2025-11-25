"use client"
import Image from "next/image";
import { useState } from "react";

// 1️⃣ Interface for form data
interface LoginFormData {
  email: string;
  password: string;
}
export default function LoginPage() {
  const [form, setForm] = useState<LoginFormData>({
    email: "",
    password: "",
  });
   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form)
  };
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      {/* Card */}
      <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-8 rounded-2xl w-full max-w-sm shadow-xl">
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <Image
            src="/pacman1.png"
            alt="Logo"
            width={50}
            height={50}
            // className="mix-blend-screen"
          />
          <h1 className="text-white text-3xl font-bold">TypingApp</h1>
        </div>

        {/* Heading */}
        <div className="text-center mb-6">
          <h2 className="text-white text-2xl font-semibold">Welcome Back</h2>
          <p className="text-gray-300 text-sm">
            Log in to continue your typing practice
          </p>
        </div>

        {/* Form */}
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          {/* Email */}
          <input
            type="text"
            placeholder="Enter your email"
            className="w-full px-4 py-2 bg-white/20 border border-white/30 
                       rounded-lg text-white placeholder-gray-200 focus:outline-none 
                       focus:ring-2 focus:ring-blue-400"
            value={form.email}
            onChange={handleChange}
          />

          {/* Password */}
          <input
            type="password"
            placeholder="Enter your password"
            className="w-full px-4 py-2 bg-white/20 border border-white/30 
                       rounded-lg text-white placeholder-gray-200 focus:outline-none 
                       focus:ring-2 focus:ring-blue-400"
            value={form.password}
            onChange={handleChange}
          />

          {/* Login Button */}
          <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg font-semibold transition">
            Log In
          </button>

          {/*  Or divider*/}
          <div className="flex items-center">
            <div className="flex-1 h-px bg-gray-700"></div>
            <div className="px-3 text-gray-400 text-sm">or</div>
            <div className="flex-1 h-px bg-gray-700"></div>
          </div>

          {/* google sign-in */}

          <button className="w-full flex items-center justify-center gap-[1.2] border-l-2 border-r-2 hover:bg-blue-600 text-white py-2 rounded-lg font-semibold transition ease-initial">
            <Image
              src="/google11.jpg"
              alt="google"
              width={30}
              height={30}
              className="rounded"
            />{" "}
            <span>Continue with Google</span>
          </button>
        </form>

        {/* Footer */}
        <p className="text-gray-400 text-center text-sm mt-4">
          Don’t have an account?{" "}
          <a className="text-blue-400 hover:underline" href="/pages/signup">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}
