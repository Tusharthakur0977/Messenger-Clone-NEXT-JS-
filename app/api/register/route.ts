import bcrypt from "bcrypt";
import prisma from "@/app/libs/prismaDb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, name, password } = body;

    if (!email || !password || !name) {
      return new NextResponse("Missing Info", {
        status: 400,
      });
    }

    const isUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (isUser) {
      throw new Error("User already Exists");
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await prisma.user.create({
      data: {
        email,
        name,
        hashedPassword,
      },
    });

    return NextResponse.json(user, { status: 200 });
  } catch (error: any) {
    return new NextResponse(error, { status: 500 });
  }
}
