import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";
import { Prisma } from "@prisma/client"; // ✅ Import Prisma types

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const orderby = searchParams.get("orderby");
    let order = searchParams.get("order") as "asc" | "desc" | null;
    let filter = searchParams.get("filter")?searchParams.get("filter"):"";

    // Validate `order` to be either "asc" or "desc", default to "asc"
    order = order === "desc" ? "desc" : "asc";

    // Define a default order object
    let orderObject: Prisma.TicketOrderByWithRelationInput = { datetime: "desc" };

    // If a valid orderby field is provided, update orderObject
    if (orderby && isValidOrderField(orderby)) {
      orderObject = { [orderby]: order } as Prisma.TicketOrderByWithRelationInput;
    }

    if(filter){
      const tickets = await prisma.ticket.findMany({
        where: {
          status: filter
        }
      });
  
      return NextResponse.json(tickets);  
    }
    const tickets = await prisma.ticket.findMany({
      orderBy: orderObject, // ✅ Now correctly typed for Prisma
    });

    return NextResponse.json(tickets);
  } catch (error) {
    console.error("Error fetching tickets:", error);
    return NextResponse.json({ error: "Error fetching tickets" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    data.datetime = new Date(data.datetime);
    const ticket = await prisma.ticket.create({ data });

    return NextResponse.json(ticket, { status: 201 });
  } catch (error) {
    console.error("Error creating ticket:", error);

    if (error.code === "P2002") {
      return NextResponse.json(
        { error: "Ticket with this data already exists." },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Error creating ticket" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// Define valid field names for ordering
const validOrderFields = ["name", "datetime", "service", "department", "priority"] as const;
type OrderField = (typeof validOrderFields)[number];

// Helper function to check if the field is valid
function isValidOrderField(orderBy: string): orderBy is OrderField {
  return validOrderFields.includes(orderBy as OrderField);
}
