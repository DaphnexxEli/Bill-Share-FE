import { Link } from "react-router-dom";
import api from "../services/api";

export default function Navbar() {
  const token = localStorage.getItem("access_token");
  const is_staff = JSON.parse(localStorage.getItem("is_staff"));
  const name = localStorage.getItem("first_name");

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
      <div className="flex justify-end flex-1 px-2">
        <div className="flex items-stretch">
          {is_staff && <h1 className="text-white text-center m-auto font-bold">Admin</h1>}
          {token && (
            <div className="dropdown dropdown-end text-white">
              <label
                tabIndex={0}
                className="btn btn-ghost rounded-btn flex w-32"
              >
                {name ? name : "user"}{" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </label>
              <ul
                tabIndex={0}
                className="menu dropdown-content z-[1] p-2 shadow bg-Emerald2 rounded-box w-52 mt-4"
              >
                <li>
                  <Link to="/" onClick={handleLogout}>
                    Logout
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
