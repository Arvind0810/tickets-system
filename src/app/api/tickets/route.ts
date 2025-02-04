import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";

export async function GET() {
  const tickets = await prisma.ticket.findMany();
  return NextResponse.json(tickets);
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const ticket = await prisma.ticket.create({ data });
    return NextResponse.json(ticket, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Error creating ticket" }, { status: 500 });
  }
}
