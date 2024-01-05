"use client";
import { FC, useState } from "react";
import { Button } from "../button/Button";
import { Poppins } from "next/font/google";
import { verifyImage } from "@/app/actions/replicate/verifyImage";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

interface FormProps {
  email: string;
}

const poppins400 = Poppins({
  subsets: ["latin"],
  weight: ["400"],
});

const Form: FC<FormProps> = ({ email }) => {
  const [desc, setDec] = useState("");
  const router = useRouter();

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    const verify = await verifyImage({ answer: desc, email });
    if (!verify) {
      signOut({
        callbackUrl: "/login",
        redirect: true,
      });
    }
    if (verify) {
      router?.push("/dashboard");
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit} autoComplete="off">
        <div className="relative z-0 w-[100%] mb-5 group mt-6">
          <input
            type="text"
            name="desc"
            id="desc"
            value={desc}
            onChange={(e) => setDec(e.target.value)}
            className="block py-2.5 px-0 w-full text-md text-black bg-transparent border-0 border-b-[1.5px] border-black appearance-none dark:text-black dark:border-black dark:focus:border-[#E589E5] focus:outline-none focus:ring-0 focus:border-[#E589E5] peer"
            placeholder=" "
            required
          />
          <label className="peer-focus:font-medium absolute text-sm text-gray-900 dark:text-gray-900 duration-[300ms] transform -translate-y-6 scale-75 top-4 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#8f589e] peer-focus:dark:text-[#8f589e] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            Your desc
          </label>
        </div>
        <Button
          type="submit"
          size={"default"}
          variant={"black"}
          className={`${poppins400.className} rounded-full w-[300px] mt-4 `}
        >
          Submit
        </Button>
      </form>
    </>
  );
};

export default Form;
