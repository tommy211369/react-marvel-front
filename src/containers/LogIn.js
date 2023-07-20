import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";

export default function LogIn({ setUser, setDataUserName, setDataUserId }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);

  const history = useHistory();

  const userData = {
    email: email,
    password: password,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setErrorEmail(false);
      setErrorPassword(false);
      // "http://localhost:4000/login"
      // "https://marvel-backend.onrender.com/login"
      const response = await axios.post(
        "https://marvel-backend.onrender.com/login",
        userData
      );

      // console.log(response.data);
      setDataUserName(response.data.resUser.username);
      setUser(response.data.resUser.token);
      setDataUserId(response.data.resUser.id);

      history.push("/");
    } catch (e) {
      console.log(e.response);
      if (e.response.status === 401) {
        setErrorEmail(true);
      } else if (e.response.status === 400) {
        setErrorPassword(true);
      }
    }
  };

  return (
    <div className="form">
      <div className="wrapper">
        <div className="form-header">
          <Link className="loginpage">Connexion</Link>
          <Link to="/signup">S'enregistrer</Link>
        </div>

        {errorEmail && (
          <p
            style={{
              color: "red",
              fontFamily: "Arial",
              textAlign: "center",
              marginTop: "15px",
            }}
          >
            Adresse mail non reconnue
          </p>
        )}

        {errorPassword && (
          <p
            style={{
              color: "red",
              fontFamily: "Arial",
              textAlign: "center",
              marginTop: "15px",
            }}
          >
            Erreur de mot de passe
          </p>
        )}

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            className={errorEmail && "form-error"}
            placeholder="Adresse mail"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
          />

          <input
            type="password"
            placeholder="Mot de passe"
            className={errorPassword && "form-error"}
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
