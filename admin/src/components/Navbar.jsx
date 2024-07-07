import { Link } from "react-router-dom";
import "../index.css"

function Navbar() {
    return (
        <div className="navbar">
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/admin">Admin Portal</Link>
                </li>
                <li>
                    <Link to="/scores">Scores</Link>
                </li>
            </ul>
        </div>
    )
}

export default Navbar;