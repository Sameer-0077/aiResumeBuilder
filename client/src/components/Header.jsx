import React, { useRef } from "react";
import { Link, NavLink } from "react-router-dom";

export default function Header() {
  const sideMenuRef = useRef();
  const opneMenu = () => {
    sideMenuRef.current.style.transform = "translateX(-16rem)";
  };
  const closeMenu = () => {
    sideMenuRef.current.style.transform = "translateX(16rem)";
  };

  return (
    <header className="shadow sticky z-50 top-0">
      <nav className="bg-white border-gray-200 px-2 lg:px-6 py-2.5">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <Link to="/" className="flex items-center">
            <h2 className="text-blue-950 font-bold text-3xl ">ResumeBuilder</h2>
          </Link>
          <div className="flex items-center lg:order-2">
            <Link
              to="/sign-in"
              className="hidden lg:flex text-black border hover:bg-gray-100 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none "
            >
              Sign In
            </Link>
            <Link
              to="/resume-builder"
              className="hidden lg:flex text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-md px-1 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
            >
              Get Started
            </Link>
            <button
              className="block md:hidden focus:outline-none"
              onClick={opneMenu}
            >
              <img
                src="/assets/menu-white.png"
                alt="open-menu"
                className="w-6 h-6 bg-gray-600 p-2"
              />
            </button>
          </div>
          <div
            className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
            id="mobile-menu-2"
          >
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `
                  ${isActive ? "text-blue-600" : "text-gray-600"}
                  block py-2 pr-4 pl-3 duration-200 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-blue-600 lg:p-0 text-md`
                  }
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/resume-builder"
                  className={({ isActive }) =>
                    `
                  ${isActive ? "text-blue-600" : "text-gray-600"}
                  block py-2 pr-4 pl-3 duration-200 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-blue-600 lg:p-0 text-md`
                  }
                >
                  Resume Builder
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/cover-letters"
                  className={({ isActive }) =>
                    `
                  ${isActive ? "text-blue-600" : "text-gray-600"}
                  block py-2 pr-4 pl-3 duration-200 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-blue-600 lg:p-0 text-md`
                  }
                >
                  Cover Latters
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) =>
                    `
                  ${isActive ? "text-blue-600" : "text-gray-600"}
                  block py-2 pr-4 pl-3 duration-200 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-blue-600 lg:p-0 text-md`
                  }
                >
                  Dashboard
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <ul
        ref={sideMenuRef}
        className="flex md:hidden flex-col gap-4 py-20 px-10 fixed -right-64 top-0 bottom-0 w-64 z-50 h-screen bg-blue-50 transition duration-500 text-left"
      >
        <div className="absolute right-6 top-6">
          <img
            src="/assets/close-white.png"
            alt=""
            className="w-6 cursor-pointer bg-gray-600 p-2"
            onClick={closeMenu}
          />
        </div>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              `font-medium text-md px-4 py-2.5 duration-200 border-b-2 border-transparent lg:border-0 lg:hover:bg-transparent lg:p-0 ${
                isActive ? "text-blue-600" : "text-gray-600 hover:text-blue-600"
              }`
            }
            onClick={closeMenu}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/resume-builder"
            className={({ isActive }) =>
              `font-medium text-md px-4 py-2.5 duration-200 border-b-2 border-transparent lg:border-0 lg:hover:bg-transparent lg:p-0 ${
                isActive ? "text-blue-600" : "text-gray-600 hover:text-blue-600"
              }`
            }
            onClick={closeMenu}
          >
            Resume Builder
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/cover-letters"
            className={({ isActive }) =>
              `font-medium text-md px-4 py-2.5 duration-200 border-b-2 border-transparent lg:border-0 lg:hover:bg-transparent lg:p-0 ${
                isActive ? "text-blue-600" : "text-gray-600 hover:text-blue-600"
              }`
            }
            onClick={closeMenu}
          >
            Cover Letters
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `font-medium text-md px-4 py-2.5 duration-200 border-b-2 border-transparent lg:border-0 lg:hover:bg-transparent lg:p-0 ${
                isActive ? "text-blue-600" : "text-gray-600 hover:text-blue-600"
              }`
            }
            onClick={closeMenu}
          >
            Dashboard
          </NavLink>
        </li>
        <li>
          <Link
            to="/#"
            onClick={closeMenu}
            className="block sm:hidden text-gray-900 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-md px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none border boder-gray-400"
          >
            Sign In
          </Link>
        </li>
        <li>
          <Link
            to="/#"
            onClick={closeMenu}
            className="block sm:hidden text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-md px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none border boder-gray-400"
          >
            Get Started
          </Link>
        </li>
      </ul>
    </header>
  );
}
