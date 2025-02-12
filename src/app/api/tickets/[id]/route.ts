import { NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";

export async function GET(req: Request, { params }: { params: { id: number } }) {
    try {
      const ticket = await prisma.ticket.findUnique({
        where: { id: +params.id },
      });
      if (!ticket) {
        return NextResponse.json({ error: "Ticket not found" }, { status: 404 });
      }
  
      return NextResponse.json(ticket);
    } catch (error) {
      return NextResponse.json({ error: error }, { status: 500 });
    }
  }

export async function PUT(req: Request, { params }: { params: { id: number } }) {
  try {
    const data = await req.json();
    data.datetime = new Date(data.datetime)
    data.closetime = new Date(data.closetime)
    const updatedTicket = await prisma.ticket.update({
      where: { id: +params.id },
      data,
    });
    return NextResponse.json(updatedTicket);
  } catch (error) {
    return NextResponse.json({ error: "Error updating ticket" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: number } }) {
  try {
    await prisma.ticket.delete({ where: { id: +params.id } });
    return NextResponse.json({ message: "Ticket deleted" });
  } catch (error) {
    return NextResponse.json({ error: "Error deleting ticket" }, { status: 500 });
  }
}
