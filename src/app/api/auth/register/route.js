import prisma from "../../../../lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from 'bcryptjs'

export async function POST(req){
    try {
        const { name, email, password } = await req.json()

        const existingUser = await prisma.user.findUnique({
            where: { email }
        })

        if(existingUser){
            return NextResponse.json({error: "User already exists!"}, { status: 400 })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await prisma.user.create({
            data: { name, email, password: hashedPassword, role: "USER" },
        })

        return NextResponse.json({message: "User registered successfully."}, {status: 201})
    } catch (error) {
        return NextResponse.json({error: "Something went wrong"}, {status: 500})
    }
}