"use server"

import OpenAI from "openai";

export async function checkRegistrationPrompt(prompt: string) {
    const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY});
    const completion = await openai.chat.completions.create({
        messages: [{ role: "system", content: `You are to validate a user's security story. 
        This story will be used to verify the users's identity in the future. 
        Some constraints of it are as follows: 
        1. The story must not be publicly available, like on their resume, etc. 
        2. It cannot be a story that is easily guessable, like "I was born in 1990".
        3. It cannot be a story that is easily googleable, like "I was born in 1990 in New York City".

        Return either \"Yes\" or \"No\". depending on whether you think the story is valid or not.
        ` },
        { role: "user", content: "Narrative: " + prompt },
    ],
        model: "gpt-3.5-turbo",
    });
    const res = completion.choices[0].message.content;
    console.log("RESPONSE")
    console.log(res)
    if (res?.toLowerCase() === "yes" || res?.toLowerCase() === "yes.") {
        return true;
    } else {
        return false;
    }
}