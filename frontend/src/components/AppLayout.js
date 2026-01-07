import { Outlet, Link, NavLink } from "react-router-dom";

export function AppLayout() {
    return (
        <>
            <div className="drawer drawer-open">
                <input id="my-drawer" type="checkbox" className="drawer-toggle" />

                <div className="drawer-content">
                    <Outlet />
                </div>

                <div className="drawer-side">
                    <label htmlFor="my-drawer" className="drawer-overlay"></label>
                    <Link to='/' className="bg-base-200 p-4 text-base-content w-80">Splitly</Link>
                    <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                        <li>
                            <NavLink 
                                className={({ isActive }) =>
                                    isActive ? 'active font-bold text-primary' : ""
                                }
                                to='/app'
                                end
                            >
                                Dashboard
                            </NavLink>
                        </li>
                        <li>
                            <NavLink 
                                className={({ isActive }) =>
                                    isActive ? 'active font-bold text-primary' : ''
                                }
                                to='/app/config'
                            >
                                Configurations
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
}