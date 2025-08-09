
import { connectDB } from "@/lib/db";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs"
import User from "../../models/User"


export async function POST(req) {
  try {
    const { username, email, password } = await req.json();

    if (!username || !email || !password) {
      return new NextResponse(JSON.stringify({ error: "All fields are required" }), { status: 400 });
    }

    await connectDB();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return new NextResponse(JSON.stringify({ error: "Email already exists" }), { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    return new NextResponse(JSON.stringify({ message: "User registered successfully" }), { status: 201 });
  } catch (error) {
    console.error(error);
    return new NextResponse(JSON.stringify({ error: "Server error" }), { status: 500 });
  }
}
