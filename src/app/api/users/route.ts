import { NextResponse } from "next/server";

import prisma from "../../../../lib/prisma"

export async function GET() {
    try {
      const users = await prisma.user.findMany();
      return NextResponse.json(users);
    } catch (error) {
      return NextResponse.json({ error: "Error fetching users" }, { status: 500 });
    }
  }

export async function POST(req: Request) {
    try {
        const { name, email, password } = await req.json();
        const user = await prisma.user.create({
        data: { name, email, password },
        });

        return NextResponse.json(user, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Error creating user" }, { status: 500 });
    }
}