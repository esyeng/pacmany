import React from "react";
import { Link, NavLink } from "react-router-dom";

export const Navbar = () => {
  return (
    <div>
      <nav className="navbar">
        <div>
          <ul className="nav-links">
            <li className="nav-item">
              <NavLink id="shirt-logo" to="/">
                <h3>Pac-Many</h3>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/">
                <h5>Home</h5>
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};
