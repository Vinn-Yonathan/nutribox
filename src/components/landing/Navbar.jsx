import { Link } from "react-router";
import { useEffect, useRef, useState } from "react";
import { X, Menu } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useLocalStorage } from "react-use";
import ProfileMenuNav from "../common/ProfileMenuNav";
import { userDetail, userLogout } from "../../lib/api/UserApi";
import { alertError, alertSuccess } from "../../lib/alert";
import ThemeButton from "../common/ThemeButton";
import ProfileMenuButton from "../common/ProfileMenuButton";

const NavBar = ({ className }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [accessToken, setAccessToken] = useLocalStorage("access-token", "");
  const [user, setUser] = useState({});

  const btnThemeMobileRef = useRef();
  const btnThemeDekstopRef = useRef();

  const handleOpen = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleProfileMenuOpen = () => {
    setProfileMenuOpen(!profileMenuOpen);
  };

  async function getUserDetail() {
    if (!accessToken) return;
    const response = await userDetail(accessToken);
    const responseBody = await response.json();
    console.log(responseBody);

    if (response.status === 200) {
      setUser(responseBody.data);
    } else {
      console.log(responseBody.errors);
      await alertError(Object.values(responseBody.errors).flat().join("\n"));
    }
  }

  async function handleLogout() {
    console.log("test");
    const response = await userLogout(accessToken);
    const responseBody = await response.json();
    console.log(responseBody);

    if (response.status === 200) {
      await alertSuccess("User Log Out Successfully!");
      setAccessToken("");
      setUser("");
    } else {
      console.log(responseBody.errors);
      await alertError(Object.values(responseBody.errors).flat().join("\n"));
    }
  }

  useEffect(() => {
    getUserDetail();
  }, [accessToken]);

  // animation
  useGSAP(() => {
    gsap.fromTo(
      [btnThemeMobileRef.current, btnThemeDekstopRef.current],
      { rotateY: 0 },
      {
        rotateY: 360,
        duration: 1,
        ease: "expo.out",
      }
    );
  }, [isDark]);

  const handleDark = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark");
  };

  const handleEnter = () => {
    gsap.to(".icon-close", {
      stroke: "var(--highlight)",
      duration: 0.1,
      ease: "expo.in",
    });
  };
  const handleLeave = () => {
    gsap.to(".icon-close", {
      stroke: "var(--text)",
      duration: 0.05,
      ease: "power3.out",
    });
  };

  return (
    <nav
      className={`nav z-50 fixed top-0 w-full ${className} filter-none`}
      id="navbar-main"
      aria-label="Main Navigation"
    >
      {mobileMenuOpen ? (
        <div className="w-screen h-[65vh] bg-primary rounded-b-4xl flex flex-col p-10 space-y-3 md:hidden">
          {/* Mobile navbar*/}
          <button
            className="self-end"
            onClick={handleOpen}
            aria-label="close menu"
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
          >
            <X className="icon-close" stroke="var(--text)" size={35} />
          </button>
          <ul className="flex-center flex-col space-y-10 text-5xl content-center">
            <li>
              <a
                href="#section-about"
                className="font-jomhuria hover:text-slate-100"
              >
                ABOUT
              </a>
            </li>
            <li>
              <a
                href="#section-fm"
                className="font-jomhuria hover:text-slate-100"
              >
                FEATURED MENU
              </a>
            </li>
            <li>
              <a
                href="#section-location"
                className="font-jomhuria hover:text-slate-100"
              >
                LOCATION
              </a>
            </li>
            <li>
              <Link to="#" className="font-jomhuria hover:text-slate-100">
                CART
              </Link>
            </li>
          </ul>
        </div>
      ) : (
        // Dekstop navbar
        <div className="flex justify-between items-center px-3 md:paddingx py-3">
          <a href="#section-hero" className="font-jomhuria text-5xl">
            NUTRIBOX
          </a>

          <ul className="hidden md:flex-center space-x-4 text-3xl">
            <li className="flex-center">
              <a
                href="#section-about"
                className="font-jomhuria hover:gradient-text transition duration-75 ease-in"
              >
                ABOUT
              </a>
            </li>
            <li className="flex-center">
              <a
                href="#section-fm"
                className="font-jomhuria hover:gradient-text transition duration-75 ease-in"
              >
                FEATURED MENU
              </a>
            </li>
            <li className="flex-center">
              <a
                href="#section-location"
                className="font-jomhuria hover:gradient-text transition duration-75 ease-in"
              >
                LOCATION
              </a>
            </li>
            <li className="flex-center">
              <Link
                to="#"
                className="font-jomhuria hover:gradient-text transition duration-75 ease-in"
              >
                CART
              </Link>
            </li>

            {/* Auth Button */}
            {!accessToken ? (
              <>
                <li className="flex-center">
                  <Link
                    to="/register"
                    className="font-jomhuria hover:gradient-text transition duration-75 ease-in"
                  >
                    SIGN UP
                  </Link>
                </li>

                <li className="flex-center">
                  <Link
                    to="/login"
                    className="font-jomhuria hover:gradient-text transition duration-75 ease-in"
                  >
                    SIGN IN
                  </Link>
                </li>
              </>
            ) : (
              <div className="relative flex items-center">
                <ProfileMenuButton
                  handleProfileMenuOpen={handleProfileMenuOpen}
                  className="pb-[0.3rem]"
                />

                {profileMenuOpen && (
                  <ProfileMenuNav
                    fullName={`${user.first_name} ${user.last_name}`}
                    email={user.email}
                    handleLogout={handleLogout}
                  />
                )}
              </div>
            )}

            {/* Desktop Theme Button */}
            <li className="flex-center">
              <ThemeButton
                ref={btnThemeDekstopRef}
                handleDark={handleDark}
                size={25}
                isDark={isDark}
                className="pb-[0.3rem]"
              />
            </li>
          </ul>

          {/* ----------------Mobile Button-------------- */}

          <div className="md:hidden flex-center space-x-4">
            {/* Mobile Auth Button */}
            {!accessToken ? (
              <>
                <Link
                  to="/register"
                  className="flex-center font-jomhuria text-3xl hover:gradient-text transition duration-75 ease-in"
                >
                  SIGN UP
                </Link>
                <Link
                  to="/login"
                  className="flex-center font-jomhuria text-3xl hover:gradient-text transition duration-75 ease-in"
                >
                  SIGN IN
                </Link>
              </>
            ) : (
              <div className="relative flex items-center">
                <ProfileMenuButton
                  handleProfileMenuOpen={handleProfileMenuOpen}
                  size={30}
                />

                {profileMenuOpen && (
                  <ProfileMenuNav
                    fullName={`${user.first_name} ${user.last_name}`}
                    email={user.email}
                    isOpen={profileMenuOpen}
                    handleClose={handleProfileMenuOpen}
                    handleLogout={handleLogout}
                  />
                )}
              </div>
            )}

            {/* Mobile Theme Button */}
            <ThemeButton
              ref={btnThemeMobileRef}
              handleDark={handleDark}
              size={30}
              isDark={isDark}
            />

            <button
              onClick={handleOpen}
              className="text-4xl"
              aria-label="Open Menu"
              aria-expanded={mobileMenuOpen}
            >
              <Menu color="var(--text)" size={35} />
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;

// const [firstName, setFirstName] = useState("");
// const [lastName, setLastName] = useState("");
// const [email, setEmail] = useState("");
// const [address, set] = useState("");

// fixed top-0 py-3 flex justify-between w-full

// flex space-x-4 text-3xl content-center
