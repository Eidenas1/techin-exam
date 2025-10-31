import login_icon from "../../assets/login_icon.svg";
import book_icon from "../../assets/book_icon.svg";
import admin_panel_icon from '../../assets/admin_panel_icon.svg'
import { Link } from "react-router";
import { useState, useEffect } from "react";
import ModalController from "../../pages/Login/ModalController";
import axios from "axios";
// eslint-disable-next-line no-unused-vars
import {motion} from "framer-motion"
import { useNavigate } from "react-router";
const API_URL = import.meta.env.VITE_API_URL;

const Nav = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const [showRegister, setShowRegister] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();

   useEffect(() => {
    setIsLoggedIn(document.cookie.includes("jwt="));
  }, [showAuth, showLogin, showRegister]);



   const logout = async () => {
    try {
      await axios.get(`${API_URL}/auth/logout`, { withCredentials: true});
      setIsLoggedIn(false);
      navigate("/");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

    const fetchUser = async () => {
    try {
      const res = await axios.get(`${API_URL}/auth/me`, {
        withCredentials: true,
      });
      setUserRole(res.data.role);
      setIsLoggedIn(true);
    } catch (error) {
      console.error("Not logged in:", error);
      setUserRole(null);
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const openAuth = (type) => {
    setShowAuth(true);
    setShowLogin(type === "login");
    setShowRegister(type === "register");
  };

  const closeLogin = () => {
    setShowLogin(false);
  };
  const closeRegister = () => {
    setShowRegister(false);
    setShowAuth(false);
  };
  const openRegister = () => {
    setShowRegister(true);
    setShowLogin(false);
  };
  const openLogin = () => {
    setShowLogin(true);
    setShowRegister(false);
    setShowAuth(true);
  };

  return (
    isLoggedIn ? (
      userRole === "admin" ? (
        <nav className="flex flex-col sticky top-0 h-1/2 w-1/4 bg-black gap-y-32 px-8 py-16 z-10 max-md:hidden">
          <h1 className="text-white text-7xl text-center">Doth</h1>
          <div className="flex gap-y-24 items-center w-full flex-col">
            <div className="flex flex-row gap-16">
              <img src={login_icon} alt="Log in Icon" width={35} />
              <div className="flex flex-col w-max gap-8">
                <motion.button
                  whileHover={{ scale: 1.15 }}
                  className="text-white text-4xl text-center cursor-pointer"
                  onClick={logout}
                >
                 Logout
                </motion.button>
              </div>
            </div>
            <div className="flex flex-row w-max gap-16">
              <img src={book_icon} alt="Book List Icon" width={35} />
              <Link to="/">
                <motion.button
                  className="text-white text-4xl text-center cursor-pointer"
                  whileHover={{ scale: 1.15 }}
                >
                  Book List
                </motion.button>
              </Link>
            </div>
            <div className="flex flex-row w-max gap-16">
              <img src={admin_panel_icon} alt="Book List Icon" width={35} />
              <Link to="/admin">
                <motion.button
                  className="text-white text-3xl text-center cursor-pointer"
                  whileHover={{ scale: 1.15 }}
                >
                  Admin Panel
                </motion.button>
              </Link>
            </div>
          </div>
          {showAuth && (
            <ModalController
              showLogin={showLogin}
              showRegister={showRegister}
              openRegister={openRegister}
              openLogin={openLogin}
              closeLogin={closeLogin}
              closeRegister={closeRegister}
              onAuthSuccess={fetchUser}
            />
          )}
        </nav>
      ) : userRole === "user" ? (
        <nav className="flex flex-col sticky top-0 h-1/2 w-1/4 bg-black gap-y-32 px-8 py-16 z-50 max-md:hidden">
          <h1 className="text-white text-7xl text-center">Doth</h1>
          <div className="flex gap-y-24 items-center w-full flex-col">
            <div className="flex flex-row gap-16">
              <img src={login_icon} alt="Log in Icon" width={35} />
              <div className="flex flex-col w-max gap-8">
                <motion.button
                  whileHover={{ scale: 1.15 }}
                  className="text-white text-4xl text-center cursor-pointer"
                  onClick={logout}
                >
                  Logout
                </motion.button>
              </div>
            </div>
            <div className="flex flex-row w-max gap-16">
              <img src={book_icon} alt="Book List Icon" width={35} />
              <Link to="/">
                <motion.button
                  className="text-white text-4xl text-center cursor-pointer"
                  whileHover={{ scale: 1.15 }}
                >
                  Book List
                </motion.button>
              </Link>
            </div>
          </div>
          {showAuth && (
            <ModalController
              showLogin={showLogin}
              showRegister={showRegister}
              openRegister={openRegister}
              openLogin={openLogin}
              closeLogin={closeLogin}
              closeRegister={closeRegister}
              onAuthSuccess={fetchUser}
            />
          )}
        </nav>
      ) : null
    ) : (
     <nav className="flex flex-col sticky top-0 h-1/2 w-1/4 bg-black gap-y-32 px-8 py-16 z-50 max-md:hidden">
          <h1 className="text-white text-7xl text-center">Doth</h1>
          <div className="flex gap-y-24 items-center w-full flex-col">
            <div className="flex flex-row gap-16">
              <img src={login_icon} alt="Log in Icon" width={35} />
              <div className="flex flex-col w-max gap-8">
                <motion.button
                  whileHover={{ scale: 1.15 }}
                  className="text-white text-4xl text-center cursor-pointer"
                  onClick={() => openAuth("login")}
                >
                  Log In
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.15 }}
                  className="text-white text-4xl text-center cursor-pointer"
                     onClick={() => openAuth("register")}
                >
                  Sign Up
                </motion.button>
              </div>
            </div>
            <div className="flex flex-row w-max gap-16">
              <img src={book_icon} alt="Book List Icon" width={35} />
              <Link to="/">
                <motion.button
                  className="text-white text-4xl text-center cursor-pointer"
                  whileHover={{ scale: 1.15 }}
                >
                  Book List
                </motion.button>
              </Link>
            </div>
          </div>
          {showAuth && (
            <ModalController
              showLogin={showLogin}
              showRegister={showRegister}
              openRegister={openRegister}
              openLogin={openLogin}
              closeLogin={closeLogin}
              closeRegister={closeRegister}
              onAuthSuccess={fetchUser}
            />
          )}
        </nav>
    )
  );
};

export default Nav;
