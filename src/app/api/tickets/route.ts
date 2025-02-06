import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const orderby = searchParams.get("orderby") as string | null;
    let order = searchParams.get("order") as "asc" | "desc" | null;

    // Validate `order` to be either "asc" or "desc", default to "asc"
    order = order === "desc" ? "desc" : "asc";

    // Get order object if orderby exists, otherwise default to id: asc
    const orderObject = orderby ? getOrderObject(orderby, order) : { id: "asc" };

    const tickets = await prisma.ticket.findMany({
      orderBy: [orderObject],
    });

    return NextResponse.json(tickets);
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching tickets" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    data.datetime = new Date(data.datetime)
    const ticket = await prisma.ticket.create({ data });
    return NextResponse.json(ticket, { status: 201 });
  } catch (error) {
    console.error("Error creating ticket:", error); // Log the full error object

    // More specific error handling (optional but recommended):
    if (error.code === 'P2002') { // Example: Unique constraint violation
      return NextResponse.json(
        { error: "Ticket with this data already exists." }, // User-friendly message
        { status: 400 } // Bad request status
      );
    }

    // Generic error response (for other errors):
    return NextResponse.json(
      { error: "Error creating ticket" }, // Keep a generic message for security
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect(); // Important: Disconnect Prisma client after each request
  }
}

// Define valid field names for ordering
const validOrderFields = ["name", "datetime", "service", "department", "priority", "id"] as const;
type OrderField = (typeof validOrderFields)[number];

function getOrderObject(orderBy: string, order: "asc" | "desc") {
  // Validate orderBy field
  if (!validOrderFields.includes(orderBy as OrderField)) {
    return { id: "asc" }; // Default ordering if invalid field
  }

  return { [orderBy]: order };
}
