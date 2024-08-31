import { NavLink } from "react-router-dom";
import React from "react";
import activeBg from "../assets/ActivePage.png";

function NavBar1() {
  const navItems = [
    { to: "/", label: "HOME" },
    { to: "/events", label: "EVENTS" },
    { to: "/livescore", label: "LIVE SCORE" },
    { to: "/calendar", label: "CALENDAR" },
    { to: "/sponsors", label: "SPONSORS" },
    { to: "/team", label: "TEAM" },
    { to: "/profile", label: "PROFILE" },
    { to: "/rulebook", label: "RULEBOOK" },
  ];

  return (
    <nav className="flex flex-wrap justify-center scale-90 items-center mx-auto text-white px-4 bg-[#270B5D]/[0.9] rounded-full">
      {navItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) =>
            `px-1 text-sm font-semibold transition-all duration-300 my-1 rounded ${
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
      ))}
    </nav>
  );
}

export default NavBar1;
