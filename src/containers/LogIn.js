import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";

export default function LogIn({ setUser, setDataUserName }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorLogin, setErrorLogin] = useState(false);

  const history = useHistory();

  const userData = {
    email: email,
    password: password,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setErrorLogin(false);
      // "http://localhost:4000/login"
      // "https://reacteur-marvel-by-tommy.herokuapp.com/login"
      const response = await axios.post(
        "https://reacteur-marvel-by-tommy.herokuapp.com/login",
        userData
      );

      // console.log(response.data);
      setDataUserName(response.data.resUser.username);
      setUser(response.data.resUser.token);
      history.push("/");
    } catch (e) {
      // console.log(e);
      setErrorLogin(true);
    }
  };

  return (
    <div className="form">
      <div className="wrapper">
        <div className="form-header">
          <Link className="loginpage">Se connecter</Link>
          <Link to="/signup">S'enregistrer</Link>
        </div>

        {errorLogin && (
          <p
            style={{
              color: "red",
              fontFamily: "Arial",
              textAlign: "center",
              marginTop: "15px",
            }}
          >
            Email et/ou mot de passe non reconnu(s)
          </p>
        )}

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            className={errorLogin && "form-error"}
            placeholder="Adresse mail"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
          />

          <input
            type="password"
            placeholder="Mot de passe"
            className={errorLogin && "form-error"}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
          />

          <input type="submit" value="Valider" />
        </form>
      </div>
    </div>
  );
}
