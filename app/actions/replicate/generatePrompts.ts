"use server"

import OpenAI from "openai";

export async function generatePrompts(narrative: string) {
    const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY});
    const completion = await openai.chat.completions.create({
        messages: [{ role: "system", content: "You are to respond in javascript list only. You are a 3 part prompt generator for an image generation model. You always take in one narrative, split the narrative into a three bit story, and return 3 prompt strings in a Javascript List. YOU ARE TO RETURN IT AS A JAVASCRIPT LIST ONLY" },
        { role: "user", content: "Narrative: " + narrative },
    ],
        model: "gpt-3.5-turbo",
    });
    const res = completion.choices[0].message.content;
    console.log("RESSS")
    console.log(res)
    return res;
}