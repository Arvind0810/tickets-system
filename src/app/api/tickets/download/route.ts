import { NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const start = searchParams.get("start");
  const end = searchParams.get("end");

  if (!start || !end) {
    return NextResponse.json({ error: "Invalid date range" }, { status: 400 });
  }

  try {
    const tickets = await prisma.ticket.findMany({
      where: {
        datetime: {
          gte: new Date(start),
          lte: new Date(end),
        },
      },
      select: {
        name: true,
        datetime: true,
        closetime: true,
        service: true,
        department: true,
        complaint:true,
        solution: true,
        status: true,
      },
    });
    return NextResponse.json(tickets);
  } catch (error) {
    return NextResponse.json({ error: "Error fetching data" }, { status: 500 });
  }
}
