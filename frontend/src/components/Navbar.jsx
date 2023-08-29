import { Link } from "react-router-dom";
import api from "../services/api";

export default function Navbar() {
  const token = localStorage.getItem("access_token");
  const is_staff = JSON.parse(localStorage.getItem("is_staff"));

  const handleLogout = async () => {
    await api.logout();
    window.location.reload();
  };

  return (
    <div className="navbar bg-Emerald2 ">
      <div className="navbar bg-Emerald2">
        <Link to="/" className="btn btn-ghost normal-case text-xl text-white">
          Bill-Share
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1 text-white font-sans">
          <li>{is_staff && <a>Admin</a>}</li>
          <li>
            {token && (
              <Link to="/" onClick={handleLogout}>
                Logout
              </Link>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
}
