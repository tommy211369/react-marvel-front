import React from "react";
import logo from "../assets/img/logo.jpeg";
import ironMan from "../assets/img/iron-man.jpeg";
import deadpool from "../assets/img/deadpool-head.jpeg";
import { Link, useHistory } from "react-router-dom";
import Cookies from "js-cookie";

export default function Header({
  userName,
  setUserName,
  userToken,
  setUserToken,
  setUserFavorites,
}) {
  const history = useHistory();
  return (
    <div className="header">
      <div className="header-img">
        <img src={logo} alt="marvel" />
      </div>

      <nav>
        {!userName ? (
          <img
            src={ironMan}
            alt="ironman-head"
            onClick={() => {
              history.push("/login");
            }}
          />
        ) : (
          <img
            className="deadpool"
            src={deadpool}
            alt="deadpool-head"
            onClick={() => {
              setUserName(null);
              setUserToken(null);
              setUserFavorites(null);
              Cookies.remove("userToken");
              Cookies.remove("userName");
              Cookies.remove("userFavorites");
            }}
          />
        )}

        <ul>
          <Link to="/">Personnages</Link>
          <Link to="/comics">Comics</Link>

          {userToken ? (
            <Link to="/favorites">Favoris</Link>
          ) : (
            <Link to="/login">Favoris</Link>
          )}
        </ul>

        {userName && (
          <p className="username">
            Bienvenue <span>{userName}</span> !
          </p>
        )}
      </nav>
    </div>
  );
}
