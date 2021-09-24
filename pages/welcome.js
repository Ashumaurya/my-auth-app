import router, { useRouter } from "next/router";
import { useAuth } from "../context/authProvider";

const Welcome = () => {
  const { currentUser, SignUserOut } = useAuth();
  const router = useRouter();

  return (
    <div>
      <div className="container mx-auto my-10">
        <div className="md:text-6xl text-xl flex justify-center item-center font-bold text-blue-600">
          {" "}
          Welcome!{" "}
        </div>
        <div>
          {currentUser && (
            <div className="my-10 flex justify-center  flex-col items-center">
              <div className="my-4"> {currentUser.displayName}</div>
              <div>{currentUser.email}</div>
              <div>
                {" "}
                <button
                  className="my-4 py-2 px-4 bg-blue-600 border-2 rounded-md text-white"
                  onClick={(e) => {
                    e.preventDefault();
                    SignUserOut()
                      .then(() => {
                        console.log("Signed Out");
                        router.push("/");
                      })
                      .catch((err) => {
                        console.log(err);
                      });
                  }}
                >
                  LogOut
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Welcome;
