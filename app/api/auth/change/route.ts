import User from "@/app/models/User";
import dbConnect from "@/app/utils/dbConnect";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
    const { email, question } = await request.json();
    await dbConnect();
    console.log(email)
    console.log(question)
    try {
        await User.findOneAndUpdate(
            { email: email },
            { $set: { question: question } },
            { new: true }
        );
        return NextResponse.json({ error: 'User updated' }, { status: 201 })
    }
    catch (err: any) {
        throw new Error(err);
    }
};