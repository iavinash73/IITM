import { authOptions } from "@/app/utils/auth";
import { getServerSession } from "next-auth";
import { redirect, useRouter } from "next/navigation";
import { FC } from "react";
import Image from "next/image";
import bg from "@/public/auth/bg.png";
import Link from "next/link";
import User from "@/app/models/User";
import { Button } from "@/app/components/button/Button";
import { Outfit, Poppins } from "next/font/google";
import { generatePrompts } from "@/app/actions/replicate/generatePrompts";
import { checkRegistrationPrompt } from "@/app/actions/replicate/checkRegistrationPrompt";
import { signIn, useSession } from "next-auth/react";
import router from "next/router";
import Form from "@/app/components/sample/Form";
import { generateImage } from "@/app/actions/replicate/generateImage";

const poppins400 = Poppins({
  subsets: ["latin"],
  weight: ["400"],
});

const outfit500 = Outfit({
  subsets: ["latin"],
  weight: ["500"],
});

interface pageProps {}

const page: FC<pageProps> = async ({}) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login/?callbackUrl=/verify");
  }
  const user = await User.findOne({ email: session.user?.email });
  // console.log(session.user?.email);
  console.log(user.question);
  const questions = JSON.parse(user.question);
  const image1 = await generateImage(questions[0]);
  const image2 = await generateImage(questions[1]);
  const image3 = await generateImage(questions[2]);
  // console.log(image1[0])
  // console.log(image2[0])

  return (
    <>
      <div className="relative h-screen w-screen items-center justify-center flex-col">
        <Image
          fill={true}
          alt="background image"
          src={bg}
          className="object-cover z-[-1]"
        ></Image>
        {/* <div className="p-10 backdrop-blur-sm bg-white bg-opacity-[0.15] rounded-xl flex items-center justify-center flex-col"> */}
        <div className="flex items-center justify-center mx-auto pt-[100px] space-x-10 mb-5 w-[80%]">
          <Image
            src={image1[0]}
            width={400}
            height={400}
            alt="prompt"
            className="rounded-3xl"
          />
          <Image
            src={image2[0]}
            width={400}
            height={400}
            alt="prompt"
            className="rounded-3xl"
          />
          <Image
            src={image3[0]}
            width={400}
            height={400}
            alt="prompt"
            className="rounded-3xl"
          />
        </div>
        <div className="mx-[10%]">
          <Form />
          <div className="inline ml-20">
            <div className="flex items-center w-[20%] mb-6 mt-4">
              {/* <hr className="flex-grow border-t border-gray-700" /> */}
              <span className={`mx-3 text-gray-900 ${outfit500.className}`}>
                OR
              </span>
              {/* <hr className="flex-grow border-t border-gray-700" /> */}
            </div>
            <Link
              href={"dashboard"}
              className="text-[#0000FF] inline hover:underline pt-[20px]"
            >
              Continue to dashboard
            </Link>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="blue"
              className="w-6 h-6 inline pt-[20px]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
              />
            </svg>
          </div>
        </div>
      </div>
      {/* </div> */}
    </>
  );
};

export default page;
