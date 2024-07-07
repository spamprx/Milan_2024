import { NavLink } from "react-router-dom";

function Navbar({ showNav, setShowNav }) {
    return (
        <div className={showNav ? "navbar-show" : "navbar-hide"}>
        <div className="navbar-effect" onClick={() => setShowNav(!showNav)} />
        {showNav && <div className={showNav ? "options-show" : "options-hide"}>
            <NavLink
            onClick={() => setShowNav(!showNav)}
            to="/"
            className={({ isActive, isPending }) =>
                isPending
                ? "navbar-pending"
                : isActive
                ? "navbar-active"
                : "navbar-pending"
            }
            >
            HOME
            </NavLink>
            |
            <NavLink
            onClick={() => setShowNav(!showNav)}
            to="/events"
            className={({ isActive, isPending }) =>
                isPending
                ? "navbar-pending"
                : isActive
                ? "navbar-active"
                : "navbar-pending"
            }
            >
            EVENTS
            </NavLink>
            |
            <NavLink
            onClick={() => setShowNav(!showNav)}
            to="/livescore"
            className={({ isActive, isPending }) =>
                isPending
                ? "navbar-pending"
                : isActive
                ? "navbar-active"
                : "navbar-pending"
            }
            >
            LIVE SCORE
            </NavLink>
            |
            <NavLink
            onClick={() => setShowNav(!showNav)}
            to="/login"
            className={({ isActive, isPending }) =>
                isPending
                ? "navbar-pending"
                : isActive
                ? "navbar-active"
                : "navbar-pending"
            }
            >
            LOGIN
            </NavLink>
            |
            <NavLink
            onClick={() => setShowNav(!showNav)}
            to="/calendar"
            className={({ isActive, isPending }) =>
                isPending
                ? "navbar-pending"
                : isActive
                ? "navbar-active"
                : "navbar-pending"
            }
            >
            CALENDAR
            </NavLink>
            |
            <NavLink
            onClick={() => setShowNav(!showNav)}
            to="/sponsors"
            className={({ isActive, isPending }) =>
                isPending
                ? "navbar-pending"
                : isActive
                ? "navbar-active"
                : "navbar-pending"
            }
            >
            SPONSORS
            </NavLink>
            |
            <NavLink
            onClick={() => setShowNav(!showNav)}
            to="/team"
            className={({ isActive, isPending }) =>
                isPending
                ? "navbar-pending"
                : isActive
                ? "navbar-active"
                : "navbar-pending"
            }
            >
            TEAM
            </NavLink>
            |
            <NavLink
            onClick={() => setShowNav(!showNav)}
            to="/profile"
            className={({ isActive, isPending }) =>
                isPending
                ? "navbar-pending"
                : isActive
                ? "navbar-active"
                : "navbar-pending"
            }
            >
            PROFILE
            </NavLink>
            |
            <NavLink
            onClick={() => setShowNav(!showNav)}
            to="/rulebook"
            className={({ isActive, isPending }) =>
                isPending
                ? "navbar-pending"
                : isActive
                ? "navbar-active"
                : "navbar-pending"
            }
            >
            RULEBOOK
            </NavLink>
        </div>}
        </div>
    );
}

export default Navbar;
