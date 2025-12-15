import React from "react";
import { CircleUserRound } from "lucide-react";

const ProfileMenuButton = ({ size, handleProfileMenuOpen, className }) => {
  return (
    <button
      onClick={handleProfileMenuOpen}
      aria-label="Toggle Profile Menu"
      className={`${className}`}
    >
      <CircleUserRound size={size} />
    </button>
  );
};

export default ProfileMenuButton;
