"use client";
import { InputField, SelectField, TextAreaField, DateTimePicker } from "../form-fields"

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddTicketForm() {
  const [formData, setFormData] = useState({
    name: "",
    service: "",
    complaint: "",
    department: "",
    datetime: formatDateTimeLocal(Date.now()),
    priority: "Medium",
    asignTo: "",
    status: "Open",
    
  });
  const router = useRouter();

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
      router.push("/tickets");
    } else {
      alert("Error adding ticket");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-5 border rounded-lg shadow-md w-2xl m-auto bg-white mt-4">
      <h2 className="text-xl font-bold mb-4">Add New Ticket</h2>
      <InputField 
        label="Name"
        name="name"
        Placeholder="Enter Name"
        value={formData.name}
        onChange={handleChange}
        error=""
      />
      <DateTimePicker
        label="Complaint Date & Time"
        name="datetime"
        value={formData.datetime}
        onChange={handleChange}
        error=""
        
      />
      <SelectField 
        label="Service Affected"
        name="service"
        options={[{label: "Email", value:"Email"},{label: "Internet", value:"Internet"},{label: "Software", value:"Software"},{label: "Hardware", value:"Hardware"}]}
        value={formData.service}
        onChange={handleChange}
        error=""
      />
      <TextAreaField
        label="Complaint"
        name="complaint"
        placeholder="Enter Complaint"
        value={formData.complaint}
        onChange={handleChange}
        error=""
      />
      <InputField 
        label="Department"
        name="department"
        Placeholder="Enter Department"
        value={formData.department}
        onChange={handleChange}
        error=""
      />
      <SelectField 
        label="Priority Level"
        name="priority"
        options={[{label: "Low", value:"Low"},{label: "Medium", value:"Medium"},{label: "High", value:"High"}]}
        value={formData.priority}
        onChange={handleChange}
        error=""
      />
      <SelectField 
        label="Asign To"
        name="asignTo"
        options={[{label: "Abel", value:"Abel"},{label: "Rajendra", value:"Rajendra"}]}
        value={formData.asignTo}
        onChange={handleChange}
        error=""
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">
        Submit Ticket
      </button>
    </form>
  );
}

export function formatDateTimeLocal(timestamp) {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${year}-${month}-${day}T${hours}:${minutes}`;
}