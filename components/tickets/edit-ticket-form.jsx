"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { InputField, SelectField, TextAreaField, DateTimePicker } from "../form-fields"
import { formatDateTimeLocal } from './add-ticket-form'

export default function EditTicketForm() {
  const router = useRouter();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: "",
    datetime:"",
    service:"",
    complaint:"",
    department:"",
    priority:"",
    asignTo:"",
    solution:"",
    closetime: "",
    status:"",
  });
  
  useEffect(() => {
    async function fetchTicket() {
      const res = await fetch(`/api/tickets/${id}`);
      const data = await res.json();
      data.datetime = formatDateTimeLocal(data.datetime);
      data.closetime = data.closetime?formatDateTimeLocal(data.closetime):formatDateTimeLocal(Date.now());
      data.solution = data.solution?data.solution:"";
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
      router.push("/tickets");
    } else {
      alert("Error updating ticket");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-5 border rounded-lg shadow-md w-2xl m-auto">
      <h2 className="text-xl font-bold mb-4">Edit Ticket</h2>
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
        options={[{label: "Email", value:"Email"},{label: "Internet", value:"Internet"},{label: "Software", value:"Software"}]}
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
      <DateTimePicker
        label="Close Date & Time"
        name="closetime"
        value={formData.closetime}
        onChange={handleChange}
        error=""
        
      />
      <TextAreaField
        label="Solution"
        name="solution"
        placeholder="Enter solution"
        value={formData.solution}
        onChange={handleChange}
        error=""
      />
      <SelectField 
        label="Status"
        name="status"
        options={[{label: "Pending", value:"Pending"},{label: "In Progress", value:"In Progress"},{label: "Closed", value:"Closed"},{label: "Open", value:"Open"}]}
        value={formData.status}
        onChange={handleChange}
        error=""
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">
        Update Ticket
      </button>
    </form>
  );
}
