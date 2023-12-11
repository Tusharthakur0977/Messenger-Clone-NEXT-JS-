import getCurrentUser from "@/app/_actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismaDb";

export async function POST(req: Request) {
  try {
    const currentUser = await getCurrentUser();

    const body = await req.json();
    const { userId, isGroup, members, name } = body;

    if (!currentUser?.id || !currentUser.email) {
      return new NextResponse("Unauthorised", { status: 401 });
    }

    if (isGroup && (!members || members.length < 2 || !name)) {
      return new NextResponse("Invalid Data", { status: 400 });
    }

    if (isGroup) {
      const newConversation = await prisma.conversation.create({
        data:{
            name,isGroup,users:{
                connect:{}
            }
        }
      });
    }
  } catch (error: any) {
    return new NextResponse("Internal error", { status: 500 });
  }
}
