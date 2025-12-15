import { ArrowLeft } from "lucide-react";
import { Outlet } from "react-router";
import { userDetail } from "../../lib/api/UserApi";
import { useEffectOnce, useLocalStorage } from "react-use";
import { useState } from "react";
import { alertError } from "../../lib/alert";
import BackButton from "../common/BackButton";
import registerStoreImage from "../../assets/img/register-store.jpg";

const UserLayout = () => {
  const [accessToken, _] = useLocalStorage("access-token", "");
  const [user, setUser] = useState({});

  const getUserDetail = async () => {
    if (!accessToken) return;
    const response = await userDetail(accessToken);
    const responseBody = await response.json();
    console.log(responseBody);

    if (response.status === 200) {
      console.log("test");
      setUser(responseBody.data);
    } else {
      console.log(responseBody.errors);
      await alertError(Object.values(responseBody.errors).flat().join("\n"));
    }
  };

  useEffectOnce(() => {
    getUserDetail();
  });

  return (
    <main className="w-screen min-h-screen relative flex-center">
      <div
        className="min-h-screen absolute inset-0 bg-cover opacity-25 -z-10"
        style={{ backgroundImage: `url(${registerStoreImage})` }}
      ></div>

      <div className="w-full marginx-mobile md:marginx-tablet lg:marginx rounded-2xl relative bg-background flex justify-center flex-col">
        <BackButton
          className={
            "self-start my-6 mx-12 hover:text-primary transition duration-200"
          }
        />
        <Outlet context={{ user, getUserDetail }} />
      </div>
    </main>
  );
};

export default UserLayout;
