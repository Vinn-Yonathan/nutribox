import React, { useEffect, useRef } from "react";
import { Link } from "react-router";

const ProfileMenuNav = ({
  fullName,
  email,
  handleLogout,
  isOpen,
  handleClose,
}) => {
  const menuRef = useRef();

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e) => {
      console.log("mousedown", e.target);
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        handleClose();
      }
    };

    const timer = setTimeout(() => {
      document.addEventListener("click", handleClickOutside);
    }, 0);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen, handleClose]);

  return (
    <div
      ref={menuRef}
      role="menu"
      aria-label="Profile menu"
      className="absolute top-full left-1/2 -translate-x-1/2 px-[.5em] py-[.8em] w-max bg-surface shadow-text-muted shadow-md/20 rounded-2xl flex flex-col space-y-4"
    >
      <div className="font-poppins">
        <p className="text-base font-medium">{fullName}</p>
        <p className="text-xs text-text-muted">{email}</p>
      </div>
      <ul className="flex flex-col space-y-1">
        <li className="text-sm">
          <Link to="/profile">My Profile</Link>
        </li>
        <li className="text-sm text-red-400">
          <button onClick={handleLogout}>Log out</button>
        </li>
      </ul>
    </div>
  );
};

export default ProfileMenuNav;
