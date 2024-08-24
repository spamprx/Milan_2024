import { NavLink } from "react-router-dom";
import React from "react";
import activeBg from "../assets/ActivePage.png";

function NavBar1() {
  return (
    <div className="flex justify-center items-center text-white p-2">
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive
            ? `p-4 bg-cover bg-center rounded-full font-bold text-white`
            : "px-4 py-2"
        }
        style={({ isActive }) =>
          isActive
            ? {
                backgroundImage: `url(${activeBg})`,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
              }
            : {}
        }
      >
        HOME
      </NavLink>
      <NavLink
        to="/events"
        className={({ isActive }) =>
          isActive
            ? `p-4 bg-cover bg-center rounded-full font-bold text-white`
            : "px-4 py-2"
        }
        style={({ isActive }) =>
          isActive
            ? {
                backgroundImage: `url(${activeBg})`,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
              }
            : {}
        }
      >
        LEADERBOARD
      </NavLink>
      <NavLink
        to="/livescore"
        className={({ isActive }) =>
          isActive
            ? `p-4 bg-cover bg-center rounded-full font-bold text-white`
            : "px-4 py-2"
        }
        style={({ isActive }) =>
          isActive
            ? {
                backgroundImage: `url(${activeBg})`,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
              }
            : {}
        }
      >
        LIVE SCORE
      </NavLink>
      {/* <NavLink
        to="/login"
        className={({ isActive }) =>
          isActive
            ? `px-4 py-2 bg-cover bg-center rounded-full font-bold text-white`
            : "px-4 py-2"
        }
        style={({ isActive }) =>
          isActive ? { backgroundImage: `url(${activeBg})` } : {}
        }
      >
        LOGIN
      </NavLink> */}
      <NavLink
        to="/calendar"
        className={({ isActive }) =>
          isActive
            ? `p-4 bg-cover bg-center rounded-full font-bold text-white`
            : "px-4 py-2"
        }
        style={({ isActive }) =>
          isActive
            ? {
                backgroundImage: `url(${activeBg})`,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
              }
            : {}
        }
      >
        CALENDAR
      </NavLink>
      <NavLink
        to="/sponsors"
        className={({ isActive }) =>
          isActive
            ? `p-4 bg-cover bg-center rounded-full font-bold text-white`
            : "px-4 py-2"
        }
        style={({ isActive }) =>
          isActive
            ? {
                backgroundImage: `url(${activeBg})`,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
              }
            : {}
        }
      >
        SPONSORS
      </NavLink>
      <NavLink
        to="/team"
        className={({ isActive }) =>
          isActive
            ? `p-4 bg-cover bg-center rounded-full font-bold text-white`
            : "px-4 py-2"
        }
        style={({ isActive }) =>
          isActive
            ? {
                backgroundImage: `url(${activeBg})`,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
              }
            : {}
        }
      >
        TEAM
      </NavLink>
      <NavLink
        to="/profile"
        className={({ isActive }) =>
          isActive
            ? `p-4 bg-cover bg-center rounded-full font-bold text-white`
            : "px-4 py-2"
        }
        style={({ isActive }) =>
          isActive
            ? {
                backgroundImage: `url(${activeBg})`,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
              }
            : {}
        }
      >
        PROFILE
      </NavLink>
      <NavLink
        to="/rulebook"
        className={({ isActive }) =>
          isActive
            ? `p-4 bg-cover bg-center rounded-full font-bold text-white`
            : "px-4 py-2"
        }
        style={({ isActive }) =>
          isActive
            ? {
                backgroundImage: `url(${activeBg})`,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
              }
            : {}
        }
      >
        RULEBOOK
      </NavLink>
    </div>
  );
}

export default NavBar1;
