"use client";
import { Button } from "@/app/components/button/Button";
import eye from "@/public/auth/eye.png";
import eyec from "@/public/auth/eyec.png";
import { signIn, useSession } from "next-auth/react";
import { Poppins } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const poppins400 = Poppins({
  subsets: ["latin"],
  weight: ["400"],
});
const poppins500 = Poppins({
  subsets: ["latin"],
  weight: ["500"],
});
const poppins600 = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

type Inputs = {
  email: string;
  name: string;
  password: string;
};

const Form = () => {
  const [showPassword1, setShowPassword1] = useState<boolean>(false);
  const [showPassword2, setShowPassword2] = useState<boolean>(false);
  const params = useSearchParams()!;
  const router = useRouter();
  const session = useSession();

  if (session.status === "authenticated") {
    router?.push("/sample");
  }

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    repeatPassword: "",
    question:""
  });

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    const { name, email, password, repeatPassword,question } = formData;
    try {
      var wordsArray = question.split(/\s+/);
      console.log(wordsArray.length);
      if (password !== repeatPassword) {
        throw new Error("Your passwords don't match !!");
      }
      // else if(wordsArray.length< 50)
      // {
      //   throw new Error("Desciption is less than 50 words!!");
      // }
       else {
        // console.log(formData);
        formSubmit(formData);
      }
    } catch (error: any) {
      if (error.message === "Your passwords don't match !!") {
        toast.error(error.message);
      } 
      else if (error.message === "Desciption is less than 50 words!!") {
        toast.error(error.message);
      } 
      else {
        console.error(error);
      }
    }
  };

  const formSubmit = async (form: any) => {
    const { name, email, password,question } = form;
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          question
        }),
      });

      if (res.status === 201) {
        signIn("credentials", {
          email,
          password,
        });
      } 
      else {
        const errorData = await res.json();
        if (errorData.error === "User Already Exists") {
          toast.error("User already exists. Please choose a different email.");
        } else {
          toast.error("An error occurred.");
        }
      }
    } catch (err: any) {
      console.log(err);
    }
  };

  return (
    <>
      <form className="" onSubmit={handleSubmit} autoComplete="off">
        <div className={`text-[34px] ${poppins600.className} mb-3`}>
          Register with your email
        </div>
        <div className={`${poppins400.className}`}>
          <div className="relative z-0 w-[100%] mb-5 group">
            <input
              type="name"
              name="name"
              id="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="block py-2.5 px-0 w-full text-md text-black bg-transparent border-0 border-b-[1.5px] border-black appearance-none dark:text-black dark:border-black dark:focus:border-[#E589E5] focus:outline-none focus:ring-0 focus:border-[#E589E5] peer"
              placeholder=" "
              required
            />
            <label className="peer-focus:font-medium absolute text-sm text-gray-900 dark:text-gray-900 duration-[300ms] transform -translate-y-6 scale-75 top-4 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#8f589e] peer-focus:dark:text-[#8f589e] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Name
            </label>
          </div>
          <div className="relative z-0 w-[100%] mb-5 group">
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="block py-2.5 px-0 w-full text-md text-black bg-transparent border-0 border-b-[1.5px] border-black appearance-none dark:text-black dark:border-black dark:focus:border-[#E589E5] focus:outline-none focus:ring-0 focus:border-[#E589E5] peer"
              placeholder=" "
              required
            />
            <label className="peer-focus:font-medium absolute text-sm text-gray-900 dark:text-gray-900 duration-[300ms] transform -translate-y-6 scale-75 top-4 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#8f589e] peer-focus:dark:text-[#8f589e] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Email address
            </label>
          </div>
          <div className="relative z-0 w-[100%] mb-5 group">
            <input
              type={showPassword1 ? "text" : "password"}
              name="password"
              id="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="block py-2.5 px-0 w-full text-md text-gray-900 bg-transparent border-0 border-b-[1.5px] border-black appearance-none dark:text-black dark:border-black dark:focus:border-[#E589E5] focus:outline-none focus:ring-0 focus:border-[#E589E5] peer"
              placeholder=" "
              required
            />
            <label className="peer-focus:font-medium absolute text-sm text-gray-900 dark:text-gray-900 duration-[300ms] transform -translate-y-6 scale-75 top-4 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-[#8f589e] peer-focus:dark:text-[#8f589e] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Password
            </label>
            <button
              type="button"
              className="absolute right-4 top-4 cursor-pointer"
              onClick={() => setShowPassword1(!showPassword1)}
            >
              {showPassword1 ? (
                <Image height={20} width={20} alt="open_eye" src={eye}></Image>
              ) : (
                <Image height={20} width={20} alt="open_eye" src={eyec}></Image>
              )}
            </button>
          </div>
          <div className="relative z-0 w-[100%] mb-5 group">
            <input
              type={showPassword2 ? "text" : "password"}
              name="repeat_password"
              id="repeat_password"
              value={formData.repeatPassword}
              onChange={(e) =>
                setFormData({ ...formData, repeatPassword: e.target.value })
              }
              className="block py-2.5 px-0 w-full text-md text-gray-900 bg-transparent border-0 border-b-[1.5px] border-black appearance-none dark:text-black dark:black dark:focus:border-[#E589E5] focus:outline-none focus:ring-0 focus:border-[#E589E5] peer"
              placeholder=" "
              required
            />
            <label className="peer-focus:font-medium absolute text-sm text-gray-900 dark:text-gray-900 duration-[300ms] transform -translate-y-6 scale-75 top-4 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-[#8f589e] peer-focus:dark:text-[#8f589e] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Confirm password
            </label>
            <button
              type="button"
              className="absolute right-4 top-4 cursor-pointer"
              onClick={() => setShowPassword2(!showPassword2)}
            >
              {showPassword2 ? (
                <Image height={20} width={20} alt="open_eye" src={eye}></Image>
              ) : (
                <Image height={20} width={20} alt="open_eye" src={eyec}></Image>
              )}
            </button>
          </div>
          <div className="text-black">Give a description that only you would know.(50 words minimum)</div>
          <div>This will be used to verify you when you login</div>

          <div className="relative z-0 w-[100%] mb-5 group mt-4">
            <input
              type="question"
              name="question"
              id="question"
              value={formData.question}
              onChange={(e) =>
                setFormData({ ...formData, question: e.target.value })
              }
              className="block py-2.5 px-0 w-full text-md text-black bg-transparent border-0 border-b-[1.5px] border-black appearance-none dark:text-black dark:border-black dark:focus:border-[#E589E5] focus:outline-none focus:ring-0 focus:border-[#E589E5] peer"
              placeholder=" "
              required
            />
            <label className="peer-focus:font-medium absolute text-sm text-gray-900 dark:text-gray-900 duration-[300ms] transform -translate-y-6 scale-75 top-4 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#8f589e] peer-focus:dark:text-[#8f589e] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Desciption
            </label>
          </div>
          <p className={`w-full text-[13px] ${poppins400.className}`}>
            <Link href="/login" className="hover:underline">
              {" "}
              Already have an account?
            </Link>
          </p>
          <div className="w-full items-center flex justify-center">
            <Button
              type="submit"
              size={"default"}
              variant={"black"}
              className={`${poppins400.className} rounded-full w-[300px] mt-4  `}
            >
              Submit
            </Button>
          </div>
        </div>
      </form>
    </>
  );
};

export default Form;
