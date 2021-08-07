import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";

export default function SignUp({ setUser, setDataUserName }) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [errorPassword, setErrorPassword] = useState(false);

  const history = useHistory();

  const userData = {
    email: email,
    username: username,
    password: password,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (password === confirm) {
        setErrorPassword(false);
        // "http://localhost:4000/signup"
        // "https://reacteur-marvel-by-tommy.herokuapp.com/signup"
        const response = await axios.post(
          "https://reacteur-marvel-by-tommy.herokuapp.com/signup",
          userData
        );

        setDataUserName(response.data.resNewUser.username);
        setUser(response.data.resNewUser.token);
        // console.log(response.data);
        history.push("/");
      } else {
        setErrorPassword(true);
      }
    } catch (e) {
      // console.log(e.message);
      alert(e);
    }
  };

  return (
    <div className="login">
      <div className="wrapper">
        <div className="form-header">
          <Link to="/login">Se connecter</Link>
          <Link className="signup-page">S'enregistrer</Link>
        </div>

        {errorPassword && (
          <p
            style={{
              color: "red",
              fontFamily: "Arial",
              textAlign: "center",
              marginTop: "15px",
            }}
          >
            Le mot de passe et la confirmation sont différents
          </p>
        )}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nom d'utilisateur"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            required
          />
          <input
            type="email"
            placeholder="Adresse mail"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
          />
          <input
            type="password"
            placeholder="Mot de passe"
            className={errorPassword && "pass-error "}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
          />
          <input
            type="password"
            placeholder="Confirmer mot de passe"
            className={errorPassword && "pass-error "}
            onChange={(e) => {
              setConfirm(e.target.value);
            }}
            required
          />
          <input type="submit" value="Valider" />
        </form>
      </div>
    </div>
  );
}
