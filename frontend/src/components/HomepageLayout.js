import { Link, NavLink, Outlet } from "react-router-dom";

export function HomepageLayout() {
  return (
    <>
      <div className="navbar bg-base-200 shadow-sm">
        <div className="flex-1">
          <Link className="btn btn-ghost text-xl" to="/">Splitly</Link>
        </div>
        <div className="flex-none">
          <ul class="menu menu-horizontal px-1">
            <li>
              <NavLink 
                to="/" 
                end
                className={({ isActive }) => 
                  isActive ? "active font-bold text-primary" : ""
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/login"
                end
                className={({ isActive }) =>
                  isActive ? "active font-bold text-primary" : ""
                }
              >
                Login
              </NavLink>
            </li>
          </ul>
        </div>
      </div>

      <main>
        <Outlet />
      </main>
    </>
  );
}