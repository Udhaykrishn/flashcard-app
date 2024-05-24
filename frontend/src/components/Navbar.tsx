import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { UserContext } from "../context/UserContext";
import axios from "axios";

const Navbar: React.FC = () => {
  const cookies = new Cookies();
  const navigate = useNavigate();
  const userContext = useContext(UserContext);
  const { user, setUser } = userContext || {};

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data } = await axios.get("/profile");
        setUser?.(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [setUser]);

  const handleLogout = () => {
    cookies.remove("access_token");
    userContext?.setUser(null);
    navigate("/");
  };

  const token = cookies.get("access_token");

  return (
    <nav className="bg-gray-800 py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div>
          <Link to="/" className="text-white font-bold text-xl">
            FlashCards
          </Link>
        </div>
        <div>
          <ul className="flex space-x-4">
            {user && (
              <li>
                <h2 className="text-white">{user.name}</h2>
              </li>
            )}
            {token ? (
              <>
                <li>
                  <Link
                    to="/dashboard"
                    className="text-white hover:text-gray-300 transition-colors duration-300"
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="text-white hover:text-gray-300 transition-colors duration-300"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    to="/auth/login"
                    className="text-white hover:text-gray-300 transition-colors duration-300"
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    to="/auth/signup"
                    className="text-white hover:text-gray-300 transition-colors duration-300"
                  >
                    Sign Up
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
