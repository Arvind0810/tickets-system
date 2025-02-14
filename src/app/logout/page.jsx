"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";

export default function Logout() {
  const router = useRouter();
  const { updateUser } = useAuth();

  useEffect(() => {
    async function handleLogout() {
      await fetch("/api/auth/logout", { method: "POST", credentials: "include" });
      updateUser(null); // Clear user state
      router.push("/login");
    }
    handleLogout();
  }, [router, updateUser]);

  return <p>Logging out...</p>;
}
