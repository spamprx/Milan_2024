import { NavLink } from "react-router-dom";
import React from "react";
import activeBg from "../assets/ActivePage.png";

function NavBar1() {
  const navItems = [
    { to: "/", label: "HOME" },
    { to: "/events", label: "EVENTS" },
    { to: "/livescore", label: "LIVESCORE" },
    { to: "/calendar", label: "CALENDAR" },
    { to: "/sponsors", label: "SPONSORS" },
    { to: "/team", label: "TEAM" },
    { to: "/profile", label: "PROFILE" },
    { to: "external", label: "RULEBOOK" },
    { to: "/loading", label: "LOADING" },
  ];

  return (
    <nav className="flex flex-wrap justify-center scale-90 items-center mx-auto text-white px-4 bg-[#270B5D]/[0.9] rounded-full">
      {navItems.map((item) =>
        item.to === "external" ? (
          // Special handling for the external Rulebook link
          <a
            key={item.to}
            href="https://drive.google.com/file/d/19x6wXCwdY1wUR0YByT8_KhcxGI6hLIU9/view"
            target="_blank"
            rel="noopener noreferrer"
            className="px-1 text-sm transition-all duration-300 my-1 rounded hover:text-yellow-400 scale-100"
          >
            {item.label}
          </a>
        ) : (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `px-1 text-sm transition-all duration-300 my-1 rounded ${
                isActive
                  ? "bg-no-repeat bg-center bg-contain text-white scale-105"
                  : "hover:text-yellow-400 scale-100"
              }`
            }
            style={({ isActive }) =>
              isActive
                ? {
                    backgroundImage: `url(${activeBg})`,
                    width: "clamp(5rem, 8vw, 6.5rem)",
                    height: "clamp(2rem, 3vw, 2.5rem)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }
                : {}
            }
          >
            {item.label}
          </NavLink>
        )
      )}
    </nav>
  );
}

export default NavBar1;
