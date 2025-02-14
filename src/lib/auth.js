import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export function getUser() {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) return null;

  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    console.error("JWT Error:", error.message);
    return null;
  }
}
