"use client";
import Image from "next/image";
import { auth } from "@/app/lib/firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState("");
  const router = useRouter();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) router.push("/login");
      else {
        setUserName(user.displayName || "User");
        setLoading(false);
      }
    });
  }, []);

  if (loading) return <p className="text-white">Loading...</p>;

  return (
    <div className="bg-[#0b0f1a] min-h-screen">
      <nav
        className="h-20 flex items-center px-6
                  bg-[#0b0f1a]
                  shadow-lg shadow-black/70"
      >
        <div className="flex justify-between items-center w-full">
          {/* left */}
          <div className="flex justify-between items-center">
            <Image
              src="/pacman1.png"
              alt="pacman Logo"
              width={100}
               className="animate-[float_8s_ease-in-out_infinite]"
              height={20}
            />
            <h1 className="text-white text-2xl font-bold">Typing Masters</h1>
          </div>
          {/* right */}
          <div className="flex items-center gap-9 text-white font-bold text-xl mx-40">
            <h1 className="">Dashboard</h1>
            <h1 className="">Stats</h1>
            <button className="border-white rounded-xl py-1.5 px-4 hover:bg-blue-900 border-[0.1px]">
              Login
            </button>
            <button className="border-white rounded-xl py-1.5 px-4 bg-blue-900 border-[0.1px]">
              Sign Up
            </button>
          </div>
        </div>
      </nav>

      {/* next text */}

      <div className="w-full min-h-[80vh] flex items-center px-10">
        <div className="max-w-7xl mx-auto flex items-center justify-between w-full gap-16">
          {/* Left Content */}
          <div className="text-white max-w-xl">
            <h1 className="text-5xl font-semibold leading-tight mb-6">
              Improve your Typing Skills
            </h1>

            <p className="text-gray-300 text-lg mb-8">
              Practice your typing speed and accuracy with <br /> interactive
              tests.
            </p>

            <button className="bg-blue-600 hover:bg-blue-500 transition px-6 py-3 rounded-xl text-white font-medium shadow-lg">
              Start Typing Test
            </button>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-full"></div>
            <Image
              src="/laptop.png"
              alt="Typing dashboard preview"
              width={600}
              height={400}
              className="animate-[float_8s_ease-in-out_infinite]"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
}
