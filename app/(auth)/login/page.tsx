import GoogleButton from "@/app/components/button/GoogleButton";
import bg from "@/public/auth/bg.png";
import { Metadata } from "next";
import { Outfit } from "next/font/google";
import Image from "next/image";
import Form from "../../components/login/Form";

const outfit500 = Outfit({
  subsets: ["latin"],
  weight: ["500"],
});
const outfit600 = Outfit({
  subsets: ["latin"],
  weight: ["600"],
});
export const metadata: Metadata = {
  title: "Auth Demo",
};

export default function Login() {
  return (
    <div className="relative h-screen w-screen items-center justify-center flex">
      <Image
        fill={true}
        alt="background image"
        src={bg}
        className="object-cover"
      ></Image>
      <div className="p-10 backdrop-blur-sm bg-white bg-opacity-[0.15] rounded-xl flex items-center justify-center flex-col">
        <Form />
      </div>
    </div>
  );
}
