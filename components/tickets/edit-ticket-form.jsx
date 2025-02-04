"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditTicketForm() {
  const router = useRouter();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "",
    complaint: "",
    department: "",
    priority: "",
    status: "",
  });
  console.log(id);
  useEffect(() => {
    async function fetchTicket() {
      const res = await fetch(`/api/tickets/${id}`);
      const data = await res.json();
      setFormData(data);
    }
    fetchTicket();
  }, [id]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`/api/tickets/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      router.push("/");
    } else {
      alert("Error updating ticket");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-5 border rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Edit Ticket</h2>
      {["name", "email", "service", "complaint", "department", "status"].map((field) => (
        <div key={field} className="mb-3">
          <label className="block capitalize">{field}</label>
          <input
            type="text"
            name={field}
            value={formData[field]}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
        </div>
      ))}
      <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">
        Update Ticket
      </button>
    </form>
  );
}
