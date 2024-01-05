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
  const image = await generateImage(user.question);
  return (
    <>
      <div className="relative h-screen w-screen items-center justify-center flex">
        <Image
          fill={true}
          alt="background image"
          src={bg}
          className="object-cover z-[-1]"
        ></Image>
        <div className="p-10 backdrop-blur-sm bg-white bg-opacity-[0.15] rounded-xl flex items-center justify-center flex-col">
          <Image
            src={image[0]}
            width={500}
            height={500}
            alt="prompt"
            className="rounded-3xl"
          />
          {session.user?.email ? <Form email={session.user?.email} /> : ""}
        </div>
      </div>
    </>
  );
};

export default page;
