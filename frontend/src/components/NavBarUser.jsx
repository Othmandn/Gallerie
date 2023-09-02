import React, { useState, useContext, useEffect, useRef } from "react";
import axios from "axios";
import { Turn as Hamburger } from "hamburger-react";
import { Link, NavLink } from "react-router-dom";
import Cookies from "js-cookie";
import ReactModal from "react-modal";
import AuthContext from "../context/AuthContext";
import BurgerMenu from "./BurgerMenu";
import Login from "./Login";
import RedButton from "./RedButton";
import GreyButton from "./GreyButton";
import navbarLogo from "../assets/navbar_logo.png";
import hexagonRedBg from "../assets/hexagon_red_bg.png";
import hexagonBlueBg from "../assets/hexagon_blue_bg.png";
import gear from "../assets/Engrenage.png";
import icon from "../assets/Icon.png";
import art from "../assets/art.png";
import frame from "../assets/Frame.png";
import logout from "../assets/log-out.png";
import pinceau from "../assets/pinceau.png";

function NavBarUser() {
  const [homeHovered, setHomeHovered] = useState(false);
  const [galleryHovered, setGalleryHovered] = useState(false);
  const [aboutHovered, setAboutHovered] = useState(false);
  const [favoritesHovered, setFavoritesHovered] = useState(false);
  const [loginModalOpened, setLoginModalOpened] = useState(false);
  const [burgerMenuOpen, setBurgerMenuOpen] = useState(false);
  const [isSectionVisible, setIsSectionVisible] = useState(false);

  const {
    userId,
    userRole,
    loggedUserData,
    setLoggedUserData,
    isLoadedUser,
    setIsLoadedUser,
  } = useContext(AuthContext);

  const [isModalLogOutOpen, setIsModalLogOutOpen] = useState(false);

  const customModalStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      zIndex: 1,
    },
  };
  const divRef = useRef(null);
  const openerRef = useRef(null);
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/loggeduser/${userId}`)
      .then((response) => {
        setLoggedUserData(response.data);
        setIsLoadedUser(true);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleLogOut = () => {
    Cookies.remove("jwt");
    Cookies.remove("role");
    Cookies.remove("sub");
    setIsModalLogOutOpen(false);
    window.location.href = "/";
  };
  const handleOpenLogOutModal = () => {
    setIsSectionVisible(false);
    setIsModalLogOutOpen(true);
    document.body.classList.add("disable-scroll");
  };
  const handleCloseLogOutModal = () => {
    setIsModalLogOutOpen(false);
    document.body.classList.remove("disable-scroll");
  };
  window.onscroll = () => {
    setIsSectionVisible(false);
  };
  const handleClickOutside = (event) => {
    if (divRef.current && !divRef.current.contains(event.target)) {
      setIsSectionVisible(false);
    }
  };
  const handleOpenerClick = (event) => {
    event.stopPropagation();
    setIsSectionVisible((prevVisible) => !prevVisible);
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div>
      {isLoadedUser && (
        <div className=" w-[100%] z-10 fixed top-0 left-0">
          <div className="navbar-header relative flex justify-between items-center bg-[#7F253E] h-[52px] lg:h-[60px] px-3  shadow-[0px_-3px_15px_#333]">
            <Link to="/">
              <div>
                <img
                  className="logo h-[35px] w-auto sm:h-[55px] "
                  src={navbarLogo}
                  alt="logo"
                />
              </div>
            </Link>

            <div className="mr-[6%] desktopLinks hidden lg:flex lg:w-fit navbar-links items-center gap-[50px] text-white ">
              <NavLink
                to="/"
                className="hover:font-medium flex w-[100px] items-center"
                onMouseEnter={() => setHomeHovered(true)}
                onMouseLeave={() => setHomeHovered(false)}
                onClick={() => setIsSectionVisible(false)}
              >
                <img
                  src={homeHovered ? hexagonRedBg : hexagonBlueBg}
                  alt="hexagon"
                  className="h-[28px] w-[26.32px] mr-2"
                />
                <p>ACCUEIL</p>
              </NavLink>
              <NavLink
                to="/gallery"
                className="hover:font-medium flex w-[100px] items-center"
                onMouseEnter={() => setGalleryHovered(true)}
                onMouseLeave={() => setGalleryHovered(false)}
                onClick={() => setIsSectionVisible(false)}
              >
                <img
                  src={galleryHovered ? hexagonRedBg : hexagonBlueBg}
                  alt="hexagon"
                  className="h-[28px] w-[26.32px] mr-2"
                />
                <p>GALERIE</p>
              </NavLink>
              {userRole === 1 && (
                <NavLink
                  to={`/user/${userId}/favorite`}
                  className="hover:font-medium flex w-[100px] items-center"
                  onMouseEnter={() => setFavoritesHovered(true)}
                  onMouseLeave={() => setFavoritesHovered(false)}
                  onClick={() => setIsSectionVisible(false)}
                >
                  <img
                    src={favoritesHovered ? hexagonRedBg : hexagonBlueBg}
                    alt="hexagon"
                    className="h-[28px] w-[26.32px] mr-2"
                  />
                  <p>FAVORIS</p>
                </NavLink>
              )}

              <NavLink
                to="/about"
                className="hover:font-medium flex w-[100px] items-center whitespace-nowrap"
                onMouseEnter={() => setAboutHovered(true)}
                onMouseLeave={() => setAboutHovered(false)}
                onClick={() => setIsSectionVisible(false)}
              >
                <img
                  src={aboutHovered ? hexagonRedBg : hexagonBlueBg}
                  alt="hexagon"
                  className="h-[28px] w-[26.32px] mr-2 "
                />
                <p>A PROPOS</p>
              </NavLink>
            </div>
            <div className="flex">
              <div className="navbar-links flex items-center gap-1.7 sm:gap-[10px] ">
                <button
                  ref={openerRef}
                  onClick={handleOpenerClick}
                  type="button"
                  className="flex items-center gap-2 text-sm font-semibold"
                >
                  {loggedUserData &&
                  loggedUserData.length > 0 &&
                  loggedUserData[0].image ? (
                    <img
                      className="rounded-full w-[30px] lg:w-[45px] h-[30px] lg:h-[45px] object-cover"
                      src={loggedUserData[0].image}
                      alt="login"
                    />
                  ) : (
                    <div className="bg-white bg-opacity-20 border border-solid border-white w-[30px] h-[30px] object-cover rounded-full flex items-center justify-center">
                      <h1 className="text-white text-[16px]">
                        {loggedUserData[0].firstname.charAt(0)}
                        {loggedUserData[0].lastname.charAt(0)}
                      </h1>
                    </div>
                  )}
                </button>
                <div
                  ref={divRef}
                  className={`bg-white xl:mt-[5px] text-left fixed right-0 top-14 transition-all duration-500 xl:w-[20dvw] w-[55dvw] border rounded-lg ${
                    isSectionVisible
                      ? "transform translate-x-0"
                      : "transform translate-x-full"
                  }`}
                >
                  <section className="w-full flex flex-col border-2 border-gray-200 border-solid rounded-lg">
                    {loggedUserData && loggedUserData[0] && (
                      <section className="flex gap-3 p-1 border-b-[1px] border-gray-300 border-solid">
                        {loggedUserData &&
                        loggedUserData.length > 0 &&
                        loggedUserData[0].image ? (
                          <img
                            className="rounded-full w-11 h-11 object-cover"
                            src={loggedUserData[0].image}
                            alt="profil-pic"
                          />
                        ) : (
                          <div className="bg-[#7F253E] w-11 h-11 object-cover rounded-full flex items-center justify-center">
                            <h1 className="text-white text-[20px]">
                              {loggedUserData[0].firstname.charAt(0)}
                              {loggedUserData[0].lastname.charAt(0)}
                            </h1>
                          </div>
                        )}
                        <div>
                          <p>
                            {loggedUserData[0].lastname}&nbsp;
                            {loggedUserData[0].firstname}
                          </p>
                          <p>{loggedUserData[0].email}</p>
                        </div>
                      </section>
                    )}
                    <NavLink
                      to={userRole === 0 ? "/admin" : "/user"}
                      onClick={() => setIsSectionVisible(false)}
                      className="p-[8px]"
                    >
                      <div className="flex items-center gap-2">
                        <img
                          src={icon}
                          alt="icon"
                          className="w-3 h-3 object-cover"
                        />
                        <p className="text-black">Profil</p>
                      </div>
                    </NavLink>

                    <NavLink
                      onClick={() => setIsSectionVisible(false)}
                      to="/settings"
                      className="p-[8px]"
                    >
                      <div className="flex items-center gap-2">
                        <img
                          src={gear}
                          alt="icon"
                          className="w-3 h-3 object-cover"
                        />
                        <p className="text-black">Paramètres</p>
                      </div>
                    </NavLink>
                    {userRole === 0 && (
                      <div className="flex flex-col">
                        <NavLink
                          to="/admin/artworks"
                          onClick={() => setIsSectionVisible(false)}
                          className="p-[8px]"
                        >
                          <div className="flex items-center gap-2">
                            <img
                              src={art}
                              alt="icon"
                              className="w-3 h-3 object-cover"
                            />
                            <p className="text-black">Oeuvres</p>
                          </div>
                        </NavLink>
                        <NavLink
                          to="/admin/artists"
                          onClick={() => setIsSectionVisible(false)}
                          className="p-[8px]"
                        >
                          <div className="flex items-center gap-2 ">
                            <img
                              src={pinceau}
                              alt="icon"
                              className="w-3 h-3 object-cover"
                            />
                            <p className="text-black">Artistes</p>
                          </div>
                        </NavLink>
                        <NavLink
                          to="/admin/users"
                          onClick={() => setIsSectionVisible(false)}
                          className="p-[8px]"
                        >
                          <div className="flex items-center gap-2">
                            <img
                              src={frame}
                              alt="icon"
                              className="w-3 h-3 object-cover"
                            />
                            <p className="text-black">Users</p>
                          </div>
                        </NavLink>
                      </div>
                    )}
                    <div className="w-full border-t-[1px] border-gray-300 border-solid " />
                    <button type="button" onClick={handleOpenLogOutModal}>
                      <div className="flex items-center gap-2 p-[8px]">
                        <img
                          src={logout}
                          alt="icon"
                          className="w-3 h-3 object-cover"
                        />
                        <p className="text-base">Déconnexion</p>
                      </div>
                    </button>
                  </section>
                </div>

                <ReactModal
                  isOpen={isModalLogOutOpen}
                  style={customModalStyles}
                  ariaHideApp={false}
                  onRequestClose={() => {
                    setIsModalLogOutOpen(false);
                  }}
                  className="h-fit  w-[80vw] sm:w-fit md:w-[40vw] lg:w-[30vw] lg:max-w-[40vw] border-none rounded-2xl p-5 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  bg-white flex "
                  contentLabel="Modal"
                >
                  <div className="bg-white  rounded-xl text-center flex flex-col gap-6 mx-auto">
                    <h2 className="text-xl">
                      Etes vous sur de vouloir vous déconnecter ?
                    </h2>
                    <div className="h-11">
                      <RedButton
                        text="Oui, me déconnecter"
                        type="button"
                        onClick={handleLogOut}
                      />
                    </div>
                    <div className="h-11">
                      <GreyButton
                        text="Non, rester connecté"
                        type="button"
                        onClick={handleCloseLogOutModal}
                      />
                    </div>
                  </div>
                </ReactModal>
              </div>
              <div className="Hamburger lg:hidden">
                <Hamburger
                  color="#fff"
                  size={24}
                  toggled={burgerMenuOpen}
                  toggle={setBurgerMenuOpen}
                />
              </div>
            </div>

            <Login
              loginModalOpened={loginModalOpened}
              setLoginModalOpened={setLoginModalOpened}
            />

            <BurgerMenu
              burgerMenuOpen={burgerMenuOpen}
              setBurgerMenuOpen={setBurgerMenuOpen}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default NavBarUser;
