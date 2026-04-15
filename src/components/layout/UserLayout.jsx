import { ArrowLeft } from "lucide-react";
import { Outlet } from "react-router";
import { userDetail } from "../../lib/api/UserApi";
import { useLocalStorage } from "react-use";
import BackButton from "../common/BackButton";
import registerStoreImage from "/register-store.jpg";
import NavBar from "../common/Navbar";
import FooterInfo from "../common/FooterInfo";
import { PuffLoader } from "react-spinners";
import { useQuery } from "@tanstack/react-query";

const UserLayout = () => {
  const [accessToken, _] = useLocalStorage("access-token", "");

  const {
    data: user,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const response = await userDetail(accessToken);
      const responseBody = await response.json();
      console.log(responseBody);

      if (response.status !== 200) {
        throw new Error(Object.values(responseBody.errors).flat().join("\n"));
      }

      return responseBody.data;
    },
    enabled: !!accessToken,
  });

  const RenderContent = () => {
    if (isLoading)
      return (
        <PuffLoader color="var(--primary)" className="self-center my-10" />
      );
    if (isError) return console.error(error.message);

    return <Outlet context={{ user }} />;
  };

  return (
    <div className="min-h-screen relative flex flex-col justify-between">
      <header>
        <NavBar />
      </header>
      <main className="w-screen mt-12 flex-center">
        <div
          className="min-h-screen absolute inset-0 bg-cover opacity-25 -z-10"
          style={{ backgroundImage: `url(${registerStoreImage})` }}
        ></div>

        <div className="w-full my-6 marginx-mobile md:marginx-tablet lg:marginx rounded-2xl relative bg-background flex justify-center flex-col">
          {/* <BackButton
            className={
              "self-start mt-6 mx-12 hover:text-primary transition duration-200"
            }
          /> */}
          <RenderContent />
        </div>
      </main>
      <footer className="px-10">
        <FooterInfo />
      </footer>
    </div>
  );
};

export default UserLayout;
