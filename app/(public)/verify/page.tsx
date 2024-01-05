import User from "@/app/models/User";
import { authOptions } from "@/app/utils/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { FC } from "react";
import { generateImage } from "@/app/actions/replicate/generateImage";
import Image from "next/image";
interface pageProps {}

const page: FC<pageProps> = async ({}) => {
  
  const session = await getServerSession(authOptions);
  if (!session) {
      redirect("/login/?callbackUrl=/verify");
  } 
  let user = await User.findOne({email: session.user?.email});
  console.log(user.question);
  const image = await generateImage(user.question);
  console.log(image);
  return <div className='items-center flex h-screen'>
    <Image src={image[0]} width={500} height={500} alt="prompt" />
  </div>
};

export default page;