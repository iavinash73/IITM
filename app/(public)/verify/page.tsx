import User from "@/app/models/User";
import { authOptions } from "@/app/utils/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { FC, useState } from "react";
import { generateImage } from "@/app/actions/replicate/generateImage";
import Image from "next/image";
import img from "@/public/auth/photo.avif";
import bg from "@/public/auth/bg.png";
import Form from "@/app/components/verify/Form";

interface pageProps {}

const page: FC<pageProps> = async ({}) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login/?callbackUrl=/verify");
  }
  let user = await User.findOne({ email: session.user?.email });
  // console.log(session.user?.email);
  const questions = JSON.parse(user.question);
  const image1 = await generateImage(questions[0]);
  const image2 = await generateImage(questions[2]);
  console.log(image1[0])
  console.log(image2[0])
  return (
    <div className="p-[5rem]">
        <div className="flex items-center justify-center w-full space-x-10 mb-5">
        <Image
            src={image1[0]}
            width={400}
            height={400}
            alt="prompt"
            className="rounded-3xl"
          />
          <div className="bg-slate-200 w-[400px] h-[400px] rounded-3xl">

          </div>
          <Image
            src={image2[0]}
            width={400}
            height={400}
            alt="prompt"
            className="rounded-3xl"
          />
        </div>
        {session.user?.email ? <Form email={session.user?.email} /> : ""}

    </div>
  );
};

export default page;
