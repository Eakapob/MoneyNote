import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import * as z from "zod";

// Define a schema for input validation
const userSchema = z.object({
  username: z.string().min(1, "username is required").max(100),
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must have than 8 characters"),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, username, password } = userSchema.parse(body);

    //check if email exists
    const existtingUserByEmail = await db.user.findUnique({
      where: { email: email },
    });
    if (existtingUserByEmail) {
      return NextResponse.json(
        { user: null, message: "User with this email already use" },
        { status: 409 }
      );
    }

    //check if username exists
    const existtingUserByUsername = await db.user.findUnique({
      where: { username: username },
    });
    if (existtingUserByUsername) {
      return NextResponse.json(
        { user: null, message: "User with this username already use" },
        { status: 409 }
      );
    }

    const hashedPassword = await hash(password, 10);

    const newUser = await db.user.create({
      data: {
        username,
        email,
        userpassword: hashedPassword,
      },
    });
    const { userpassword: newUserPassword, ...rest } = newUser;

    return NextResponse.json(
      { user: rest, message: "User created successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Something wrong!!!" + req.method },
      { status: 500 }
    );
  }
}
