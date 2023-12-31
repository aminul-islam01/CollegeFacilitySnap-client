import { Link } from "react-router-dom";
import Search from "./Search";
import { useContext } from "react";
import { UserContext } from "../Providers/AuthProviders";


const Navbar = () => {
    const { user, logOut } = useContext(UserContext);

    const navItem = <>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/colleges">Colleges</Link></li>
        <li><Link to="/admission">Admissions</Link></li>
        <li><Link to="/my-college">My College</Link></li>
    </>

    return (
        <div className="fixed top-0 z-10 w-full">
            <div className="navbar bg-base-200">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            {navItem}
                        </ul>
                    </div>
                    <a className="btn btn-ghost normal-case text-xl">College Facility Snap</a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {navItem}
                    </ul>
                </div>
                <div className="navbar-end">
                    {user? <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img src={user?.photoURL} />
                            </div>
                        </label>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            <li>
                                <a className="justify-between">
                                    Profile
                                    <span className="badge">New</span>
                                </a>
                            </li>
                            <li><a>Settings</a></li>
                            <li><Link onClick={logOut} to="/">Logout</Link></li>
                        </ul>
                    </div>
                    : <button className="btn btn-neutral"><Link to="/login">Login</Link></button>}
                </div>
            </div>
            <Search></Search>
        </div>
    );
};

export default Navbar;