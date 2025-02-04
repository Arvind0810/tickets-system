"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function TicketList() {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    async function fetchTickets() {
      const res = await fetch("/api/tickets");
      const data = await res.json();
      setTickets(data);
    }
    fetchTickets();
  }, []);

  return (
    <div className="max-w-lg mx-auto mt-10 p-5 border rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Tickets</h2>
      <ul>
        {tickets.map((ticket) => (
          <li key={ticket.id} className="flex justify-between p-2 border-b">
            <span>{ticket.name} - {ticket.status}</span>
            <Link href={`/tickets/${ticket.id}`} className="text-blue-500">Edit</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
