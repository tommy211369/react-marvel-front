import React from "react";
import logo from "../assets/img/logo.jpeg";
import { Link } from "react-router-dom";
//logo marvel
// navigation Chracters, Comics, Favorites

export default function Header() {
  return (
    <div className="header">
      <div className="header-img">
        <img src={logo} alt="marvel" />
      </div>

      <nav>
        <ul>
          <Link to="/">Personnages</Link>
          <Link to="/comics">Comics</Link>
          <Link to="/favorites">Favoris</Link>
        </ul>
      </nav>
    </div>
  );
}
