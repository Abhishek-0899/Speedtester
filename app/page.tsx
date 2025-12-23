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
            <button
              onClick={() => router.push("./pages/login")}
              className="border-white rounded-xl py-1.5 px-4 hover:bg-blue-900 border-[0.1px]"
            >
              Login
            </button>
            <button
              onClick={() => router.push("./pages/signup")}
              className="border-white rounded-xl py-1.5 px-4 bg-blue-900 border-[0.1px]"
            >
              Sign Up
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}

      <div className="w-full min-h-[80vh] flex items-center px-10">
        <div className="max-w-7xl mx-auto">
          <div className=" flex items-center justify-between w-full gap-16">
            {/* Left Content */}
            <div className="text-white max-w-xl">
              <h1 className="text-5xl font-semibold leading-tight mb-6">
                Improve your Typing Skills
              </h1>

              <p className="text-gray-300 text-lg mb-8">
                Practice your typing speed and accuracy with <br /> interactive
                tests.
              </p>

              <button className="bg-blue-800 shadow-blue-800 hover:bg-blue-900 transition px-6 py-3 rounded-xl text-white font-medium shadow-lg">
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
          {/* cards */}
          {/* Cards Section */}
          <div className="relative z-10 mt-24">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 px-10">
              {/* Card 1 */}
              <div
                className="
      group relative rounded-2xl p-8
      bg-white/5 backdrop-blur-xl
      border border-white/10
      shadow-[0_20px_60px_rgba(0,0,0,0.6)]
      transition-all duration-500
      hover:-translate-y-2
      hover:shadow-[0_30px_80px_rgba(59,130,246,0.25)]
    "
              >
                <div className="flex items-center gap-4 mb-5">
                  <Image
                    src="/progress.png"
                    alt="Progress"
                    width={42}
                    height={42}
                    className="group-hover:scale-110 transition"
                  />
                  <h3 className="text-xl font-semibold text-white">
                    Track Your Progress
                  </h3>
                </div>

                <p className="text-gray-300 leading-relaxed">
                  View your typing speed and accuracy over time to monitor your
                  improvement.
                </p>
              </div>

              {/* Card 2 */}
              <div
                className="
      group relative rounded-2xl p-8
      bg-white/5 backdrop-blur-xl
      border border-white/10
      shadow-[0_20px_60px_rgba(0,0,0,0.6)]
      transition-all duration-500
      hover:-translate-y-2
      hover:shadow-[0_30px_80px_rgba(99,102,241,0.25)]
    "
              >
                <div className="flex items-center gap-4 mb-5">
                  <Image
                    src="/settings.png"
                    alt="Custom Tests"
                    width={42}
                    height={42}
                    className="group-hover:rotate-6 transition"
                  />
                  <h3 className="text-xl font-semibold text-white">
                    Customizable Tests
                  </h3>
                </div>

                <p className="text-gray-300 leading-relaxed">
                  Adjust the test duration, difficulty, and word set to fit your
                  level and goals.
                </p>
              </div>

              {/* Card 3 */}
              <div
                className="
      group relative rounded-2xl p-8
      bg-white/5 backdrop-blur-xl
      border border-white/10
      shadow-[0_20px_60px_rgba(0,0,0,0.6)]
      transition-all duration-500
      hover:-translate-y-2
      hover:shadow-[0_30px_80px_rgba(56,189,248,0.25)]
    "
              >
                <div className="flex items-center gap-4 mb-5">
                  <Image
                    src="/target.png"
                    alt="Practice"
                    width={42}
                    height={42}
                    className="group-hover:scale-110 transition"
                  />
                  <h3 className="text-xl font-semibold text-white">
                    Improve with Practice
                  </h3>
                </div>

                <p className="text-gray-300 leading-relaxed">
                  By practicing regularly, you&apos;ll be able to type faster
                  and more accurately.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
