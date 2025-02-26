"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "../lib/firebase";

const Dashboard = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [unauthorized, setUnauthorized] = useState(false);
  const [userId, setUserId] = useState("");
  const [authToken, setAuthToken] = useState("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((u) => {
      setLoading(false);
      if (!u) {
        setUnauthorized(true);
      } else {
        setUser(u);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await auth.signOut();
    router.push("/login");
  };

  const callProtectedAPI = async () => {
    if (auth.currentUser) {
      const token = await auth.currentUser.getIdToken();
      const res = await fetch("/api/protected", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setUserId(data.userId);
      setAuthToken(data.authToken);
      console.log("Protected API response:", data);
    }
  };

  if (loading)
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <p className="text-4xl">Loading...</p>
      </div>
    );

  if (unauthorized) {
    return (
      <div className="w-full h-screen flex flex-col justify-center items-center">
        <h1 className="text-3xl font-bold mb-4">Not Authorized</h1>
        <p className="text-xl">You must be logged in to view this page.</p>
      </div>
    );
  }

  return (
    <div className="p-8 overflow-hidden">
      <div className="w-full">
        <div className="">
          <h1 className="text-3xl mb-4 font-extrabold">Dashboard</h1>
          <button
            onClick={callProtectedAPI}
            className="bg-zinc-800 hover:bg-zinc-900 px-6 transition-colors text-white p-2 rounded"
          >
            Call Protected API
          </button>
        </div>
      </div>

      <div className="absolute right-10 top-10 flex justify-center gap-4">
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 px-6 transition-colors text-white p-2 rounded mr-4"
        >
          Logout
        </button>
      </div>

      <div className="w-full flex flex-col items-center">
        {user && <p className="mb-4 text-3xl">Welcome!! {user.email}</p>}
      </div>

      <div className="w-full flex flex-col items-start gap-5 mt-10">
        <div className="flex flex-col items-start">
          <h1 className="font-bold text-zinc-100">User-id:</h1>
          <div className="w-[40vw] rounded-xl p-6 border border-white">
            <h1 className="font-light text-yellow-500">
              {userId || "Click to fetch"}
            </h1>
          </div>
        </div>

        <div className="flex flex-col">
          <h1 className="font-bold text-zinc-100">Auth-token:</h1>
          <div className="w-[40vw] min-h-[10vh] rounded-xl py-6 px-6 border border-white overflow-auto">
            <p className="h-full text-wrap break-words font-light text-yellow-500">
              {authToken || "Click to fetch"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
