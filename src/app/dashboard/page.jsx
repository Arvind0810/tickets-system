"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch("/api/auth/user", { credentials: "include" });
        const data = await res.json();

        if (!res.ok) {
          return router.push("/login");
        }

        setUser(data);
      } catch (error) {
        console.error("Fetch error:", error);
        router.push("/login");
      }
    }

    fetchUser();
  }, []);

  return (
    <div className="min-h-screen flex justify-center items-center">
      {user ? (
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white">Welcome, {user.name}!</h1>
          <a href="/logout" className="text-red-500 mt-4 block border-red-100 py-2 px-4 border rounded">Logout</a>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
