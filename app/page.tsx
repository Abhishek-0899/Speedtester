"use client";

import {auth} from "@/app/lib/firebase/auth" 
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) router.push("/login");
      else setLoading(false);
    });
  }, []);

  if (loading) return <p className="text-white">Loading...</p>;

  return (
    <main className="bg-black min-h-screen flex items-center justify-center">
      <div className="text-white text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome Home</h1>
        <p className="text-lg">You are logged in.</p>
      </div>
    </main>
  );
}
