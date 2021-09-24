import { useState } from "react";
import { useAuth } from "../../context/authProvider";
import { useRouter } from "next/router";

const SignUp = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const router = useRouter();

  const { GoogleSignUp, SignUpWithEmail } = useAuth();
  const { email, password, confirmPassword } = data;

  //Form validation

  const handleValidation = () => {
    let fields = data;
    let formIsValid = true;

    //Email
    if (!fields["email"]) {
      formIsValid = false;
      setError("Email cannot be empty");
      return formIsValid;
    }

    if (typeof fields["email"] !== "undefined") {
      let lastAtPos = fields["email"].lastIndexOf("@");
      let lastDotPos = fields["email"].lastIndexOf(".");

      if (
        !(
          lastAtPos < lastDotPos &&
          lastAtPos > 0 &&
          fields["email"].indexOf("@@") == -1 &&
          lastDotPos > 2 &&
          fields["email"].length - lastDotPos > 2
        )
      ) {
        formIsValid = false;
        setError("Email is not valid");
        return formIsValid;
      }
    }
    //password

    if (!fields["password"]) {
      formIsValid = false;
      setError("Password can't be empty");
      return formIsValid;
    }
    if (fields["password"].length < 6) {
      (formIsValid = false),
        setError("Password should be atleast of 6 characters");
      return formIsValid;
    }
    if (!fields["confirmPassword"]) {
      formIsValid = false;
      setError("Confirm password can't be empty");
      return formIsValid;
    }
    if (
      typeof fields["password"] !== "undefined" &&
      typeof fields["confirmPassword"] !== "undefined"
    ) {
      if (fields["password"] !== fields["confirmPassword"]) {
        console.log("yes validation");
        setError("Password and Confirm password doesn't match");
        formIsValid = false;
        return formIsValid;
      }
    }

    return formIsValid;
  };

  //Form submission
  const handleOnChange = (name) => (e) => {
    setData({ ...data, [name]: e.target.value });
  };

  const handleOnSubmit = (event) => {
    event.preventDefault();
    try {
      if (handleValidation()) {
        SignUpWithEmail(email, password)
          .then((result) => {
            router.push("/welcome");
            setData({
              ...data,
              email: "",
              confirmPassword: "",
              password: "",
            });
          })
          .catch((error) => {
            console.log(error);
            const errorMessage = error.message;
            setError(errorMessage);
            throw new Error(error);
          });

        setError("");
      } else {
        throw new Error("Something went wrong");
      }
    } catch {
      console.log(error);
      setError(error);
    }
  };

  // Firebase google signup
  const handleGoogleSignUp = (e) => {
    e.preventDefault();
    GoogleSignUp()
      .then((result) => {
        // The signed-in user info.
        const user = result.user;
        router.push("/welcome");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        setError(errorMessage);
      });
  };
  return (
    <div className="my-1 w-full">
      <div className="flex justify-center items-center text-sm font-bold py-4 text-red-400">
        {error}
      </div>
      <form className="lg:pt-4 ">
        <div className="flex flex-col md:h-full">
          <input
            className="m-2 p-2 mt-6 pl-2 placeholder-gray-500 border-b-2 min-w-full min-h-full  tracking-wide  focus:outline-none placeholder-opacity-75 text-sm lg:pt-10"
            placeholder="jonh@email.com*"
            value={email}
            type="email"
            onChange={handleOnChange("email")}
          />
          <input
            className="p-2  m-2  mt-4 pl-2 placeholder-gray-500  min-w-full min-h-full border-b-2 tracking-wide  focus:outline-none placeholder-opacity-75 text-sm lg:pt-10"
            placeholder="Password"
            value={password}
            type="password"
            onChange={handleOnChange("password")}
          />
          <input
            className="p-2  m-2  mt-4 pl-2 placeholder-gray-500  min-w-full min-h-full border-b-2 tracking-wide  focus:outline-none placeholder-opacity-75 text-sm lg:pt-10"
            placeholder="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={handleOnChange("confirmPassword")}
          />

          <div className="mt-4 xl:mt-10">
            <button
              className="w-full m-2 p-2 bg-black text-white border-2 shadow-md rounded-xl text-sm xl:text-md"
              onClick={handleOnSubmit}
            >
              Sign Up{" "}
            </button>
            <div className="flex justify-center font-bold"> or </div>

            <div className="flex-col flex xl:flex-row ">
              <button
                className="w-full m-2 flex justify-center items-center p-2 bg-white border-2 shadow-md rounded-xl text-sm xl:text-md"
                onClick={handleGoogleSignUp}
              >
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    preserveAspectRatio="xMidYMid"
                    viewBox="0 0 256 262"
                  >
                    <path
                      fill="#4285F4"
                      d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
                    />
                    <path
                      fill="#34A853"
                      d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
                    />
                    <path
                      fill="#FBBC05"
                      d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
                    />
                    <path
                      fill="#EB4335"
                      d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
                    />
                  </svg>
                </span>
                <div className="mx-2">Sign Up with Google</div>
              </button>
            </div>
          </div>
        </div>
        <div className="justify-end items-end mt-4 ml-4 xl:mt-10 text-xs">
          By clicking the button above, you agree to our{" "}
          <span className="text-blue-500">terms of use</span> and
          <span className="text-blue-500"> privacy policies.</span>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
