'use server'
import User from "@/app/models/User";
import dbConnect from "@/app/utils/dbConnect";
import OpenAI from "openai";

export async function verifyImage({answer, email}: {answer: string, email: string}) {

    const openai = new OpenAI();
    await dbConnect();
    const user = await User.findOne({ email:email });
    const completion = await openai.chat.completions.create({
        messages: [{ role: "system", content: "You are supposed to say only yes or no. Provided in the first line will be a statement, and in the second line will be another statement. You have to say if the statements mean the same thing, they do not have to be exactly the same." },
        { role: "user", content: "Statement 1: " + answer + "\n" + "Statement 2: " + user.question },
    ],
        model: "gpt-3.5-turbo",
      });
    
    const res = completion.choices[0].message.content;
    console.log(res);
    if (res?.toLowerCase() === "yes" || res?.toLowerCase() === "yes.") {
        return true;
    } else {
        return false;
    }
}