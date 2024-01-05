import { authOptions } from "@/app/utils/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { FC } from "react";
import Image from "next/image";
import bg from "@/public/auth/bg.png";
import Link from "next/link";

interface pageProps {}

const page: FC<pageProps> = async ({}) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login/?callbackUrl=/verify");
  }
  //   let user = await User.findOne({ email: session.user?.email });
  //   // console.log(session.user?.email);
  //   const image = await generateImage(user.question);
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
          {/* <Image
            src={image[0]}
            width={500}
            height={500}
            alt="prompt"
            className="rounded-3xl"
          /> */}
          <div>
            <Link
              href={"register"}
              className="hover:cursor-pointer hover:underline"
            >
              Click here if you want to change your narration
            </Link>
            <div className="inline ml-20">
              <Link
                href={"dashboard"}
                className="text-[#0000FF] inline hover:underline"
              >
                Continue to dashboard
              </Link>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="blue"
                className="w-6 h-6 inline"
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
      </div>
    </>
  );
};

export default page;
