"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const router = useRouter();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      router.push("/login");
    } else {
      alert("Signup failed!");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold text-center">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" name="name" placeholder="Full Name" className="w-full p-2 border rounded" onChange={handleChange} />
          <input type="email" name="email" placeholder="Email" className="w-full p-2 border rounded" onChange={handleChange} />
          <input type="password" name="password" placeholder="Password" className="w-full p-2 border rounded" onChange={handleChange} />
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:cursor-pointer">Sign Up</button>
          <p>Already have an Accound. <Link href={`/login`} className="text-blue-500 hover:text-blue-700" >Login now</Link></p>
        </form>
      </div>
    </div>
  );
}
