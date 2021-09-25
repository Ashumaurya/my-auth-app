import router, { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuth } from "../context/authProvider";
import Onboard from ".";
const Welcome = () => {
  const { currentUser, SignUserOut } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (currentUser) return;
    router.replace("/welcome", "/", { shallow: true });
  }, [currentUser]);

  if (!currentUser) return <Onboard />;
  return (
    <div>
      <div className="container mx-auto my-10">
        <div className="flex  item-center mx-2 font-bold cursor-pointer justify-end">
          <div
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
            Logout
          </div>
        </div>
        <div>
          {currentUser && (
            <div className="my-10 flex justify-center  flex-col items-center">
              <div className="my-4">Email : {currentUser.email} </div>
              <div className="my-4">
                DisplayName : {currentUser.displayName}{" "}
              </div>
              <div className="my-4">
                Last Singed In : {currentUser.metadata.lastSignInTime}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Welcome;
