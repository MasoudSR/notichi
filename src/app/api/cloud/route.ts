import {getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]/route";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";
import { connectMongoDB } from "@/app/lib/mongodb";
import User from "@/app/models/user";

export async function POST(req : NextApiRequest) {
    const session = await getServerSession(authOptions)
    const {email} = session
    const body = await req.json()
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

await connectMongoDB()
  const user = await User.findOne(email)
  user.data = body
  await user.save() 
  return NextResponse.json({
    message: 'Success',
  })
}