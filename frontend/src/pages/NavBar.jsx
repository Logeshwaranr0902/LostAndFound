import { useState } from "react";
import { NavLink } from "react-router-dom";

function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="relative">
      <button
        className="fixed top-4 left-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition z-50"
        onClick={toggleMenu}
      >
        Menu
      </button>
      {menuOpen && (
        <div className="fixed top-14 left-4 bg-white shadow-lg rounded-md p-4 flex flex-col space-y-2 z-50">
          <NavLink
            to="/findpage"
            className={({ isActive }) =>
              `px-4 py-2 rounded-md ${
                isActive ? "bg-blue-600 text-white" : "bg-gray-200 text-black"
              }`
            }
          >
            Find Page
          </NavLink>
          <NavLink
            to="/reportpage"
            className={({ isActive }) =>
              `px-4 py-2 rounded-md ${
                isActive ? "bg-blue-600 text-white" : "bg-gray-200 text-black"
              }`
            }
          >
            Report Page
          </NavLink>
          {/* <NavLink
            to="/reglostpage"
            className={({ isActive }) =>
              `px-4 py-2 rounded-md ${
                isActive ? "bg-blue-600 text-white" : "bg-gray-200 text-black"
              }`
            }
          >
            Lost Product Ad Page
          </NavLink> */}
        </div>
      )}
    </div>
  );
}

export default NavBar;
