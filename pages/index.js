import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import SignUp from "../components/onboard/signUpform";
import Switch from "../components/onboard/switch";
import pic from "../public/img/login.jpg";
import Login from "../components/onboard/logInForm";

export default function Onboard() {
  const [isSignUp, setIsSignUp] = useState(true);

  return (
    <div className="h-screen w-full">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="overflow-x-hidden h-screen">
        <div className=" grid lg:grid-cols-2 grid-cols-1 xl:gap-x-6 gap-x-6">
          <div className="hidden lg:block flex my-auto">
            <Image src={pic} alt="Mind Map Picture" layout="responsive" />
          </div>
          <div>
            <div className="flex ">
              <div className="md:p-10 md:px-20 flex flex-col max-w-8/12 flex justify-center items-center md:h-full  h-screen">
                <div className=" border-1 shadow-xl md:px-8 md:py-4 py-2 px-4 rounded-xl h-full">
                  <div className="my-2">
                    <Switch isSignUp={isSignUp} setIsSignUp={setIsSignUp} />
                  </div>
                  <div className="my-4 h-full">
                    {isSignUp ? <SignUp /> : <Login />}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
