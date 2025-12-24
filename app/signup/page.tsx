"use client";
import Image from "next/image";
import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "@/app/lib/firebase/auth";
import { useRouter } from "next/navigation";

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface AuthError {
  message: string;
}

export default function SignUpPage() {
  const router = useRouter();

  const [form, setForm] = useState<SignUpFormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });


  const [error, setError] = useState<AuthError | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (form.password !== form.confirmPassword) {
      setError({ message: "Passwords do not match." });
      return;
    }

    try {
      const userCredentails = await createUserWithEmailAndPassword(auth, form.email, form.password);
      await updateProfile(userCredentails.user,{
        displayName:form.name
      })
      router.push("/");
    } catch (err: any) {
      setError({ message: err.message });
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-8 rounded-2xl w-full max-w-sm shadow-xl">
        <div className="flex flex-col text-center items-center mb-6">
          <Image src="/pacman.png" alt="Logo" width={50} height={50} />
          <h1 className="text-white text-3xl font-bold">Start Your Journey</h1>
          <p className="text-gray-400 text-sm">Create an account</p>
        </div>

        {error && (
          <div className="bg-red-500/30 text-red-300 p-2 rounded text-sm mb-3">{error.message}</div>
        )}

        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-white/20 border border-white/30 
                       rounded-lg text-white placeholder-gray-200 focus:ring-2"
          />

          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={form.email}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-white/20 border border-white/30 
                       rounded-lg text-white placeholder-gray-200 focus:ring-2"
          />

          <input
            type="password"
            name="password"
            placeholder="Enter password"
            value={form.password}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-white/20 border border-white/30 
                       rounded-lg text-white placeholder-gray-200 focus:ring-2"
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm password"
            value={form.confirmPassword}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-white/20 border border-white/30 
                       rounded-lg text-white placeholder-gray-200 focus:ring-2
"
          />

          <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg font-semibold">
            Sign Up
          </button>
        </form>

        <p className="text-gray-400 text-center text-sm mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-blue-400 hover:underline">Log In</a>
        </p>
      </div>
    </div>
  );
}
