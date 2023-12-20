import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "@/app/libs/prismadb";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, name, password } = body;
    if (!email || !name || !password) {
      return new NextResponse("Not info", { status: 400 });
    }
    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await prisma.user.create({
      data: {
        email,
        name,
        hashedPassword,
      },
    });
    console.log(newUser);

    return NextResponse.json(newUser);
  } catch (error: any) {
    console.log(error, "Signup_error");
    return new NextResponse("ERROR", { status: 500 });
  }
}
