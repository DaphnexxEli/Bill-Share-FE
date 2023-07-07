import { Link, useMatch, useResolvedPath } from "react-router-dom";
import api from '../services/api';

export default function Navbar() {
  const token = localStorage.getItem('userToken')
  const is_staff = localStorage.getItem('is_staff')
  return (
    <div className="navbar bg-Emerald2">
      <div className="flex-1">
        {token && <Link to="/" className="btn btn-ghost normal-case text-xs sm:text-xl text-white">Bill share-Sharing Expenses</Link>}
        {!token && <Link to="/" className="btn btn-ghost normal-case text-xs sm:text-xl text-white">Bill share-Sharing Expenses</Link>}
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1 text-white">
          <li>
          {is_staff && <Link to="/forAdmin">
            <a>Admin</a>
            </Link>}
          </li>
          {/* <li tabIndex={0}>
            <a>
              Party
              <svg
                className="fill-current"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
              >
                <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
              </svg>
            </a>
            <ul className="p-2 bg-Emerald2">
              <li>
                <a>On-going</a>
              </li>
              <li>
                <a>History</a>
              </li>
            </ul>
          </li> */}
          <li>
            {/* {!token && <Link to='/loginpage'>Login</Link>} */}
            {token && <Link to='/' onClick={api.logout()}>Logout</Link>}
            {/* <Link to='/loginpage'>Login</Link>
            <Link to='/loginpage'>Logout</Link> */}
          </li>
        </ul>
      </div>
    </div>
  );
}

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to)
  const isActive = useMatch({ path: resolvedPath.pathname, end: true })

  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  )
}
