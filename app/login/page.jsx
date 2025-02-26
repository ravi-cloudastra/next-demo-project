"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "../lib/firebase";
import { FcGoogle } from "react-icons/fc";

const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const auth = getAuth(app);

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      return console.error("Please enter a valid email address.");
    }
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
      router.push("/dashboard");
    } catch (error) {
      console.error("Email login error:", error);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      router.push("/dashboard");
    } catch (error) {
      console.error("Google login error:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-black">

      <form onSubmit={handleEmailLogin} className="w-[30vw] min-h-[50vh] py-10 border border-zinc-100 rounded shadow-md flex flex-col items-center justify-center">
        <div>
          <h1 className="text-white mb-4 text-4xl font-semibold">Login</h1>
        </div>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-5 m-2 w-96 text-white bg-zinc-900 outline-none rounded-xl"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-5 m-2 w-96 text-white bg-zinc-900 outline-none rounded-xl"
        />
        <button type="submit" className="w-96 bg-zinc-800 hover:bg-zinc-900 transition-all text-white p-2 py-3 rounded m-2">
          Login with Email
        </button>

        {/* <h1 className="text-white">or</h1> */}

        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-96 bg-zinc-100 py-3 hover:bg-zinc-200 transition-colors text-white p-2 rounded m-4 flex items-center justify-center gap-2"
        >
          <FcGoogle />

          <h1 className="text-black">Continue with Google</h1>
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
