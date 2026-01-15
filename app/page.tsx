"use client";
import Image from "next/image";
import { auth } from "@/app/lib/firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Faq from "../app/components/Faq";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, () => {
      setLoading(false);
    });
    return () => unsub();
  }, [router]);
  if (loading) return <p className="text-white p-6">Loading...</p>;

  return (
    <div className="bg-[#0b0f1a] min-h-screen overflow-x-hidden">
      {/* Navbar is now shared via `app/layout.tsx` */}

      {/* HERO */}
      <section className="min-h-[80vh] flex items-center px-4 md:px-10">
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex flex-col-reverse md:flex-row items-center gap-16">
            {/* Text */}
            <div className="text-white max-w-xl text-center md:text-left">
              <h1 className="text-3xl md:text-5xl font-semibold leading-tight mb-6">
                Improve your Typing Skills
              </h1>

              <p className="text-gray-300 text-base md:text-lg mb-8">
                Practice your typing speed and accuracy with interactive tests.
              </p>

              <Link
                href="/Dashboard"
                className="inline-block bg-blue-800 hover:bg-blue-900 transition px-6 py-3  text-2xl rounded-xl text-white font-medium
                md:animate-[float_5s_ease-in-out_infinite]"
              >
                Start Typing Test
              </Link>
            </div>

            {/* Image */}
            <div className="relative w-full max-w-md md:max-w-xl">
              <div className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-full" />
              <Image
                src="/laptop.png"
                alt="Typing dashboard preview"
                width={600}
                height={400}
                className="relative z-10 w-full h-auto md:animate-[float_8s_ease-in-out_infinite] animate-dissolve"
                priority
              />
            </div>
          </div>

          {/* CARDS */}
          <div className="mt-24">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 px-2 md:px-0">
              {[
                {
                  img: "/progress.png",
                  title: "Track Your Progress",
                  text: "View your typing speed and accuracy over time to monitor improvement.",
                },
                {
                  img: "/settings.png",
                  title: "Customizable Tests",
                  text: "Adjust duration, difficulty, and word sets to match your goals.",
                },
                {
                  img: "/target.png",
                  title: "Improve with Practice",
                  text: "Consistent practice helps you type faster and more accurately.",
                },
              ].map((card, i) => (
                <div
                  key={i}
                  className="group rounded-2xl p-8 bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.6)] transition-all duration-500 hover:-translate-y-2"
                >
                  <div className="flex items-center gap-4 mb-5">
                    <Image src={card.img} alt="" width={52} height={62} />
                    <h3 className="text-2xl font-semibold text-gray-400">
                      {card.title}
                    </h3>
                  </div>
                  <p className="text-gray-300 leading-relaxed text-xl">
                    {card.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
          {/* FAqs */}
          <div className="mt-20">
            <Faq />
          </div>
        </div>
      </section>
    </div>
  );
}
