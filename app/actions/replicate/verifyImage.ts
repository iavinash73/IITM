'use server'
import User from "@/app/models/User";
import dbConnect from "@/app/utils/dbConnect";
import OpenAI from "openai";

export async function verifyImage({answer, email}: {answer: string, email: string}) {

    const openai = new OpenAI();
    await dbConnect();
    const user = await User.findOne({ email:email });
    const completion = await openai.chat.completions.create({
        messages: [{ role: "system", content: "You will act as a statement similarity detector. If the statements mean the same thing even a little bit, you say yes. If one of the things mentioned in the statement matches, say yes. If they dont mean anything remotely the same at all, only then will you say no. You can only say either \"Yes\" or \"No\" ." },
        { role: "user", content: "Statement 1: " + answer + "\n" + "Statement 2: " + user.question },
    ],
        model: "gpt-3.5-turbo",
      });
    
    const res = completion.choices[0].message.content;
    console.log("Answer: " + answer)
    console.log("Question: " + user.question[1])
    console.log(res);
    if (res?.toLowerCase() === "yes" || res?.toLowerCase() === "yes.") {
        return true;
    } else {
        return false;
    }
}