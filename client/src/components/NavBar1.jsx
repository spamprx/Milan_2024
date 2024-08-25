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
    <nav className="flex flex-wrap justify-center items-center mx-auto text-white py-2 px-4 bg-[#270B5D]/[0.9] rounded-full">
      {navItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) =>
            `px-1 py-1 text-xs font-bold transition-all duration-300 m-0.5 ${
              isActive
                ? "bg-no-repeat bg-center bg-contain text-white"
                : "hover:text-yellow-400"
            }`
          }
          style={({ isActive }) =>
            isActive
              ? {
                  backgroundImage: `url(${activeBg})`,
                  width: "clamp(4.5rem, 8vw, 7rem)",
                  height: "clamp(1.75rem, 4vw, 2.25rem)",
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
