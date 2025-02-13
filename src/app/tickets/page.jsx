'use client'

import { useState, useEffect } from "react";
import TicketTable from '../../components/tickets/ticket-table'
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FcPlus } from "react-icons/fc";


export default function Tickets(){
    const [tickets, setTickets] = useState([])
    const router = useRouter()

    useEffect(() => {
        async function fetchTickets() {
            const res = await fetch("/api/tickets");
            const data = await res.json();
            setTickets(data);
        }
        fetchTickets();
        
    }, [])

    function handleEdit(id){
        // console.log("Edit ticket:", id);
        router.push(`/tickets/${id}`)
    }

    async function handleDelete(id){
        if (confirm("Are you sure you want to delete this ticket?")) {
            await fetch(`/api/tickets/${id}`, { method: "DELETE" });
            setTickets(tickets.filter((ticket) => ticket.id !== id));
        }
    }
    return (
        <>
        <div className="p-6 w-6xl m-auto">
            <h2 className="text-xl font-semibold my-4 text-white">Ticket List <Link href="/tickets/new" className=""><FcPlus /></Link>
            
            </h2>
            <TicketTable tickets={tickets} onEdit={handleEdit} onDelete={handleDelete} />
        </div>
        </>
    )
}