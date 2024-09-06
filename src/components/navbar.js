"use client";
import { useState } from "react";
import logo from "../assests/logo.png";
import { useNavigate } from "react-router-dom";  // Import useNavigate for navigation

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);  // For mobile menu toggle
  const [userRole, setUserRole] = useState(null);  // Store the user's role after login
  const navigate = useNavigate();  // Initialize React Router's navigation hook

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLoginNavigation = () => {
    navigate("/login");  // Navigate to login page when login button is clicked
  };

  const closeMobileMenu = () => {
    setIsOpen(false);
  };

  return (
    <>
      <nav className="bg-white py-4 sticky w-full top-0 z-10 rounded-br-10">
        <div className="container flex items-center justify-between">
          <div className="flex-shrink-0">
            <a href="/">
              <img className="h-[50px]" src={logo} alt="logo" />
            </a>
          </div>
          <div className="hidden xl:block">
            <marquee behavior="scroll" direction="left" className="text-black-900 text-base font-semibold">
              <span className="inline-flex items-center">
                you can count on
                <span className="bg-yellow-200 text-yellow-900 font-bold mx-2 px-2 py-1 rounded-lg">
                  Live journey information
                </span>
              </span>
            </marquee>
          </div>

          <div className="hidden xl:flex items-center space-x-4">
            <a href="#contact" className="rounded-lg border border-black-800 text-black-900 text-base font-semibold py-2.5 px-6 hover:text-black-500">Contact Us</a>
            {/* Navigate to login page */}
            {!userRole && (
              <button
                onClick={handleLoginNavigation}
                className="rounded-lg bg-blue-700 text-white text-base font-semibold py-2.5 px-6 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
              >
                Login
              </button>
            )}
            {/* Conditional Rendering for Users and Trains after login */}
            {userRole === "admin" && (
              <a href="/users" className="rounded-lg border border-black-800 text-black-900 text-base font-semibold py-2.5 px-6 hover:text-black-500">
                Users
              </a>
            )}
            {(userRole === "admin" || userRole === "train_editor") && (
              <a href="/trains" className="rounded-lg border border-black-800 text-black-900 text-base font-semibold py-2.5 px-6 hover:text-black-500">
                Trains
              </a>
            )}
          </div>

          <div className="xl:hidden">
            <button onClick={toggleMenu} className="block text-black-500 focus:outline-none">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`${isOpen ? "absolute right-0 mt-2 w-full bg-white rounded-xl shadow-lg z-50 px-3 py-3" : "hidden"} xl:hidden mt-4`}>
          <ul className="flex flex-col space-y-2 items-center">
            <li className="py-3 w-full">
              <a href="#contact" onClick={closeMobileMenu} className="text-black-900 text-base font-medium block">Contact us</a>
            </li>
            <li className="py-3 w-full">
              {/* Navigate to login page from mobile menu */}
              {!userRole && (
                <button
                  onClick={handleLoginNavigation}
                  className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Login
                </button>
              )}
              {/* Render Users and Trains links for mobile menu */}
              {userRole === "admin" && (
                <a href="/users" className="text-black-900 text-base font-medium block">Users</a>
              )}
              {(userRole === "admin" || userRole === "train_editor") && (
                <a href="/trains" className="text-black-900 text-base font-medium block">Trains</a>
              )}
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
