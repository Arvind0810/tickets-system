"use client";

import { useState } from "react";

export default function AddTicketForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "",
    complaint: "",
    department: "",
    priority: "Medium",
    status: "Open",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("/api/tickets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      alert("Ticket added successfully!");
    } else {
      alert("Error adding ticket");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-5 border rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Add New Ticket</h2>
      {["name", "email", "service", "complaint", "department"].map((field) => (
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
        Submit Ticket
      </button>
    </form>
  );
}
