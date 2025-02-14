import { NextResponse } from "next/server";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import prisma from "../../../../lib/prisma";

export async function POST(req){
    try {
        const { email, password } = await req.json()

        const user = await prisma.user.findUnique({ where: { email }})

        if(!user) return NextResponse.json({ error: "User not found!" },{ status: 404 })

        const validPassword = await bcrypt.compare(password, user.password)

        if(!validPassword) return NextResponse.json({ error: "Invalid Credentials"}, { status: 401})

        const token = jwt.sign({userId: user.id,name: user.name, role: user.role}, process.env.JWT_SECRET, {
            expiresIn: "1h",
        })

        const response = NextResponse.json({message: "Logged in"}, {status: 200})

        response.cookies.set("token", token)

        return response
        
    } catch (error) {
        return NextResponse.json({error: "Something went wrong!"}, {status: 500})
    }
}