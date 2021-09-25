import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAuth } from "../context/authProvider";

const UserInfo = ({ email }) => {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
  });
  const { currentUser, UpdateUserProfile } = useAuth();
  const router = useRouter();
  const [error, setError] = useState("");

  const { firstName, lastName } = data;

  const handleOnChange = (name) => (e) => {
    setData({ ...data, [name]: e.target.value });
  };
  useEffect(() => {
    console.log(currentUser);
  }, []);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    UpdateUserProfile(firstName, lastName)
      .then((result) => {
        console.log(result);
        router.push("/welcome");
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(currentUser);
    console.log(data);
  };

  return (
    <div>
      <div className="flex justify-center aling-center md:my-10 my-4">
        <div className="my-1  p-4 px-10 shadow-2xl rounded-xl ">
          <div className="flex justify-center items-center text-sm font-bold py-4 text-red-400">
            {error}
          </div>
          <form className="lg:pt-4 mx-10">
            <div className="flex justify-center items-center text-xl font-bold">
              Update your details
            </div>
            <input
              className="m-2 p-2 mt-6 pl-2 placeholder-gray-500 border-b-2 min-w-full min-h-full  tracking-wide  focus:outline-none placeholder-opacity-75 text-sm lg:pt-10"
              placeholder="First Name*"
              value={firstName}
              type="text"
              onChange={handleOnChange("firstName")}
            />

            <input
              className="m-2 p-2 mt-6 pl-2 placeholder-gray-500 border-b-2 min-w-full min-h-full  tracking-wide  focus:outline-none placeholder-opacity-75 text-sm lg:pt-10"
              placeholder="Last Name"
              value={lastName}
              type="text"
              onChange={handleOnChange("lastName")}
            />

            <input
              className="m-2 p-2 mt-6 pl-2 placeholder-gray-500 border-b-2 min-w-full min-h-full  tracking-wide  focus:outline-none placeholder-opacity-75 text-sm lg:pt-10"
              placeholder={currentUser ? currentUser.email : " "}
              disabled={true}
              type="email"
              onChange={handleOnChange("email")}
            />

            <div className="flex justify-end">
              <button
                className="my-4 py-2 px-4 bg-blue-600 border-2 rounded-md text-white"
                onClick={handleOnSubmit}
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
