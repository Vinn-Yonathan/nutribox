import { Link } from "react-router";
import { useEffect, useRef, useState } from "react";
import { X, Menu, ShoppingCart } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useLocalStorage } from "react-use";
import ProfileMenuNav from "../common/ProfileMenuNav";
import { userDetail, userLogout } from "../../lib/api/UserApi";
import { alertError, alertSuccess } from "../../lib/alert";
import ThemeButton from "../common/ThemeButton";
import ScrollTrigger from "gsap/ScrollTrigger";
import ProfileMenuButton from "../common/ProfileMenuButton";
import Badge from "@mui/material/Badge";
// import { useLocalStorageState } from "../../hooks/useLocalStorageState";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { cartDetail } from "../../lib/api/CartApi";
import { PuffLoader } from "react-spinners";

gsap.registerPlugin(ScrollTrigger);

const NavBar = ({ className }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [accessToken, setAccessToken] = useLocalStorage("access-token", "");
  const guestItemCart = useSelector((state) => state.cartGuest.items);
  const [cartSize, setCartSize] = useState(0);
  const queryClient = useQueryClient();

  const btnThemeMobileRef = useRef();
  const btnThemeDekstopRef = useRef();

  const { data: cart } = useQuery({
    queryKey: ["carts"],
    queryFn: async () => {
      const response = await cartDetail(accessToken);
      const responseBody = await response.json();
      console.log(responseBody);

      if (response.status !== 200) {
        throw new Error(Object.values(responseBody.errors).flat().join("\n"));
      }

      return responseBody.data;
    },
    enabled: !!accessToken,
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

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

  const mutation = useMutation({
    mutationFn: async () => {
      const response = await userLogout(accessToken);
      const responseBody = await response.json();
      console.log(responseBody);

      if (response.status !== 200) {
        console.log(responseBody.errors);
        throw new Error(Object.values(responseBody.errors).flat().join("\n"));
      }
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["user"] });
    },
    onSuccess: async () => {
      queryClient.removeQueries({ queryKey: ["user"] });
      queryClient.removeQueries({ queryKey: ["carts"] });
      setAccessToken("");
      alertSuccess("User Log Out Successfully!");
    },
    onError: async (error) => {
      await alertError(error.message);
    },
  });

  const handleOpen = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleProfileMenuOpen = () => {
    setProfileMenuOpen(!profileMenuOpen);
  };

  // async function handleLogout() {
  //   const response = await userLogout(accessToken);
  //   const responseBody = await response.json();
  //   console.log(responseBody);

  //   if (response.status === 200) {
  //     await alertSuccess("User Log Out Successfully!");
  //     setAccessToken("");
  //     setUser("");
  //   } else {
  //     console.log(responseBody.errors);
  //     await alertError(Object.values(responseBody.errors).flat().join("\n"));
  //   }
  // }

  useEffect(() => {
    if (accessToken) {
      setCartSize(cart?.items.length ?? 0);
    } else {
      setCartSize(guestItemCart.length);
    }
  }, [cart, guestItemCart, accessToken]);

  // useEffect(() => {
  //   getUserDetail();
  // }, [accessToken]);

  // animation
  useGSAP(() => {
    gsap.fromTo(
      [btnThemeMobileRef.current, btnThemeDekstopRef.current],
      { rotateY: 0 },
      {
        rotateY: 360,
        duration: 1,
        ease: "expo.out",
      },
    );
  }, [isDark]);

  useGSAP(() => {
    gsap.to("#navbar-main", {
      scrollTrigger: {
        trigger: "body",
        start: "100 top",
        end: "200 top",
        scrub: true,
        markers: false,
      },
      backdropFilter: "blur(8px)",
      ease: "power4.out",
      duration: 0.3,
    });
  }, []);

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

  const RenderProfileMenu = () => {
    if (isLoading) return null;
    // return (
    //   <PuffLoader color="var(--primary)" className="self-center my-10" />
    // );
    if (isError) return console.error(error.message);

    return (
      <ProfileMenuNav
        fullName={`${user.first_name} ${user.last_name}`}
        email={user.email}
        handleLogout={() => mutation.mutate()}
      />
    );
  };

  const RenderProfileMenuMobile = () => {
    if (isLoading) return null;
    // return (
    //   <PuffLoader color="var(--primary)" className="self-center my-10" />
    // );
    if (isError) return console.error(error.message);

    return (
      <ProfileMenuNav
        fullName={`${user.first_name} ${user.last_name}`}
        email={user.email}
        isOpen={profileMenuOpen}
        handleClose={handleProfileMenuOpen}
        handleLogout={() => mutation.mutate()}
      />
    );
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
              <Link
                to="/#section-about"
                className="font-jomhuria hover:text-slate-100"
              >
                ABOUT
              </Link>
            </li>
            <li>
              <Link
                to="/#section-fm"
                className="font-jomhuria hover:text-slate-100"
              >
                FEATURED MENU
              </Link>
            </li>
            <li>
              <Link
                to="/#section-location"
                className="font-jomhuria hover:text-slate-100"
              >
                LOCATION
              </Link>
            </li>
          </ul>
        </div>
      ) : (
        // Dekstop navbar
        <div className="flex justify-between items-center px-3 md:paddingx py-3">
          <Link to="/#section-hero" className="font-jomhuria text-5xl">
            NUTRIBOX
          </Link>

          <ul className="hidden md:flex-center space-x-4 text-3xl">
            <li className="flex-center">
              <Link
                to="/#section-about"
                className="font-jomhuria hover:gradient-text transition duration-75 ease-in"
              >
                ABOUT
              </Link>
            </li>
            <li className="flex-center">
              <Link
                to="/#section-fm"
                className="font-jomhuria hover:gradient-text transition duration-75 ease-in"
              >
                FEATURED MENU
              </Link>
            </li>
            <li className="flex-center">
              <Link
                to="/#section-location"
                className="font-jomhuria hover:gradient-text transition duration-75 ease-in"
              >
                LOCATION
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

                {profileMenuOpen && <RenderProfileMenu />}
              </div>
            )}

            <li className="flex-center">
              <Link
                to="/cart"
                className="font-jomhuria hover:gradient-text transition duration-75 ease-in"
              >
                <Badge
                  badgeContent={cartSize}
                  color="primary"
                  max={99}
                  sx={{
                    "& .MuiBadge-badge": {
                      bgcolor: "var(--primary)",
                      color: "var(--background)",
                    },
                  }}
                >
                  <ShoppingCart size={20} />
                </Badge>
              </Link>
            </li>

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

                {profileMenuOpen && <RenderProfileMenuMobile />}
              </div>
            )}

            <li className="flex-center">
              <Link
                to="/cart"
                className="font-jomhuria hover:gradient-text transition duration-75 ease-in"
              >
                <Badge
                  badgeContent={cartSize}
                  color="primary"
                  max={99}
                  sx={{
                    "& .MuiBadge-badge": {
                      bgcolor: "var(--primary)",
                      color: "var(--background)",
                    },
                  }}
                >
                  <ShoppingCart size={25} />
                </Badge>
              </Link>
            </li>

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
