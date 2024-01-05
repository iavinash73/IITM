"use client";
import { FC, useState } from "react";
import { Button } from "../button/Button";
import { Poppins } from "next/font/google";
import { generatePrompts } from "@/app/actions/replicate/generatePrompts";
import { checkRegistrationPrompt } from "@/app/actions/replicate/checkRegistrationPrompt";
import { useSession } from "next-auth/react";


const poppins400 = Poppins({
  subsets: ["latin"],
  weight: ["400"],
});

interface FormProps {}

const Form: FC<FormProps> = ({}) => {
  const { data: session } = useSession()

  const [question, setQuestion] = useState("");
  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    const generatedPromptsString = await generatePrompts(question);
    const good_enough = await checkRegistrationPrompt(question);
    if (!good_enough) {
      throw new Error(
        "Please make your narration more defined and personal to you."
      );
    }
    console.log(generatedPromptsString);
    const res = await fetch("/api/auth/change", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email:session?.user?.email,
        question: generatedPromptsString,
      }),
    });

    if (res.status === 201) {
      window.location.reload();
    }
  };
  return (
    <>
      <div className="text-black">
              Change your narration.(50 words minimum)
            </div>
            <form className="" onSubmit={handleSubmit} autoComplete="off">
              <div className="relative z-0 w-[100%] mb-5 group mt-4">
                <input
                  type="question"
                  name="question"
                  id="question"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  className="block py-2.5 px-0 w-full text-md text-black bg-transparent border-0 border-b-[1.5px] border-black appearance-none dark:text-black dark:border-black dark:focus:border-[#E589E5] focus:outline-none focus:ring-0 focus:border-[#E589E5] peer"
                  placeholder=" "
                  required
                />
                <label className="peer-focus:font-medium absolute text-sm text-gray-900 dark:text-gray-900 duration-[300ms] transform -translate-y-6 scale-75 top-4 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#8f589e] peer-focus:dark:text-[#8f589e] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                  Desciption
                </label>
              </div>
              <Button
                type="submit"
                size={"default"}
                variant={"black"}
                className={`${poppins400.className} rounded-full w-[300px] mt-4  `}
              >
                Submit
              </Button>
            </form>
    </>
  );
};

export default Form;
