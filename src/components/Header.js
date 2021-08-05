import React from "react";
import logo from "../assets/img/logo.jpeg";
import ironMan from "../assets/img/iron-man.jpeg";
import { Link, useHistory } from "react-router-dom";
//logo marvel
// navigation Chracters, Comics, Favorites

export default function Header() {
  const history = useHistory();
  return (
    <div className="header">
      <div className="header-img">
        <img src={logo} alt="marvel" />
      </div>

      <nav>
        <img
          src={ironMan}
          alt="deadpool-head"
          onClick={() => {
            history.push("/login");
          }}
        />
        <ul>
          <Link to="/">Personnages</Link>
          <Link to="/comics">Comics</Link>
          <Link to="/favorites">Favoris</Link>
        </ul>
      </nav>
    </div>
  );
}
