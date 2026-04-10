import { UserRound } from "lucide-react";
import React from "react";
import ProfileField from "../../components/common/ProfileField";
import { Button } from "../../components/common/Button";
import { useNavigate, useOutletContext } from "react-router";

const UserProfile = () => {
  const { user } = useOutletContext();
  // console.log("user", user);
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/profile/edit");
  };

  return (
    <>
      <section className="flex-center flex-col gap-y-8 p-8">
        <div className="p-5 bg-primary rounded-full w-fit">
          <UserRound size={50} />
        </div>

        <h1 className="font-fraunces font-bold text-center text-4xl lg:text-5xl">
          {user.first_name} {user.last_name}
        </h1>
      </section>

      <section className="flex flex-col font-poppins mx-12 my-8 lg:my-12 gap-y-6 lg:gap-y-12 md:flex-row md:flex-wrap text-text-muted">
        <ProfileField label={"First name"} value={user.first_name} />
        <ProfileField label={"Last name"} value={user.last_name} />
        <ProfileField label={"E-mail"} value={user.email} />
        <ProfileField label={"Address"} value={user.address || "Not set"} />
      </section>

      <Button
        title={"Edit Profile"}
        className={"mx-auto mb-8"}
        type={"button"}
        onClick={handleClick}
      />
    </>
  );
};

export default UserProfile;
