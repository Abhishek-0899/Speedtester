import Image from "next/image";

export default function SignUpPage() {
    
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      {/* Card */}
      <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-8 rounded-2xl w-full max-w-sm shadow-xl">
        {/* Logo */}
        <div className="flex flex-col text-center items-center justify-center gap-3 mb-6">
          <Image
            src="/pacman.png"
            alt="Logo"
            width={50}
            height={50}
            // className="mix-blend-screen"
          />
          <h1 className="text-white text-3xl font-bold">
            Start Your Typing Journey
          </h1>
          <h3 className="text-gray-400 text-xl">
            Create an account to track your progress
          </h3>
        </div>
        {/* Form */}
        <form className="flex flex-col gap-2">
          {/* name */}
          <h1 className="font-bold text-sm text-white">Name</h1>
          <input
            type="name"
            placeholder="Enter your name"
            className="w-full px-4 py-2 bg-white/20 border border-white/30 
                       rounded-lg text-white placeholder-gray-200 focus:outline-none 
                       focus:ring-2 focus:ring-blue-400"
          />
          {/* Email */}
          <h1 className="font-bold text-sm text-white">Email</h1>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-4 py-2 bg-white/20 border border-white/30 
                       rounded-lg text-white placeholder-gray-200 focus:outline-none 
                       focus:ring-2 focus:ring-blue-400"
          />

          {/* Password */}
          <h1 className="font-bold text-sm text-white">Password</h1>
          <input
            type="password"
            placeholder="Enter your password"
            className="w-full px-4 py-2 bg-white/20 border border-white/30 
                       rounded-lg text-white placeholder-gray-200 focus:outline-none 
                       focus:ring-2 focus:ring-blue-400"
                       value={}
          />
          {/* Confirm Password */}
          <h1 className="font-bold text-sm text-white">Confirm Password</h1>
          <input
            type="password"
            placeholder="Confirm password"
            className="w-full px-4 py-2 bg-white/20 border border-white/30 
                       rounded-lg text-white placeholder-gray-200 focus:outline-none 
                       focus:ring-2 focus:ring-blue-400"
          />

          {/* Login Button */}
          <button className="w-full mt-3 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg font-semibold transition">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}
