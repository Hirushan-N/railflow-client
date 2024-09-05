"use client";
import { useState, useRef, useEffect } from "react";
import logo from "../assests/logo.png";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isServicesOpen, setIsServicesOpen] = useState(false);
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsServicesOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const closeMobileMenu = () => {
        setIsOpen(false);
        // You can also close other mobile-specific menus here if needed
    };
    return (
        <>
            <nav className="bg-white py-4 sticky w-full top-0 z-10 rounded-br-10">
                <div className="container flex items-center justify-between">
                    <div className="flex-shrink-0">
                        <a href="/">
                            <img className=" h-[50px]" src={logo} alt="logo" />
                        </a>
                    </div>
                    <div className="hidden xl:block">
                        <marquee behavior="scroll" direction="left" className="text-black-900 text-base font-semibold">
                            <span className="inline-flex items-center">
                                you can count on​ 
                                <span className="bg-yellow-200 text-yellow-900 font-bold mx-2 px-2 py-1 rounded-lg">
                                    Live journey information
                                </span>
                            </span>
                        </marquee>
                    </div>

                    <div className="hidden xl:block">
                        <div className="flex items-center space-x-4">
                            <a href="#contact" className="rounded-lg border border-black-800 text-black-900 text-base font-semibold py-2.5 px-6 hover:text-black-500">Contact Us</a>
                        </div>
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
                {/* mobile menu */}
                <div className={`${isOpen ? "absolute right-0 mt-2 w-full bg-white rounded-xl shadow-lg z-50 px-3 py-3" : "hidden"} xl:hidden mt-4`}>
                    <ul className="flex flex-col space-y-2 items-center">
                        <li className="py-3 w-full">
                            <a href="#contact" onClick={closeMobileMenu} className=" text-black-900 text-base font-medium block">
                                Contact us
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    );
};

export default Navbar;
