import { Link, useMatch, useResolvedPath } from "react-router-dom";
import api from "../services/api";

export default function Navbar() {
  const token = localStorage.getItem("access_token");
  const is_staff = JSON.parse(localStorage.getItem("is_staff"));

  const handleLogout = () => {
    api.logout(token);
  };

  return (
    <div className="navbar bg-Emerald2 ">
      <div className="flex-1">
        <Link
          to="/"
          className="btn btn-ghost normal-case text-xs sm:text-xl text-white"
        >
          Bill share-Sharing Expenses
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1 text-white">
          <li>
            {is_staff && (
                <a>Admin</a>
            )}
          </li>
          <li>
            {token && <Link to='/' onClick={handleLogout}>Logout</Link>}
          </li>
        </ul>
      </div>
    </div>
  );
}