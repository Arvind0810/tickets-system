import { NextResponse } from "next/server";
import { getUser } from "../../../../lib/auth";

export async function GET(req) {
  const user = getUser(req);
  // console.log("User fetched:", user); // Debug log

  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  return NextResponse.json(user);
}
