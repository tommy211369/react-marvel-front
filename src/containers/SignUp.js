import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import validator from "validator";

export default function SignUp({ setUser, setDataUserName }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [errorPassword, setErrorPassword] = useState(false);
  const [userExist, setUserExist] = useState(false);
  const [emptyUsername, setEmptyUsername] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);

  const history = useHistory();

  const userData = {
    email: email,
    username: username,
    password: password,
    confirm: confirm,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setErrorPassword(false);
      setUserExist(false);
      setEmptyUsername(false);
      setErrorEmail(false);

      if (validator.isEmail(email)) {
        // "http://localhost:4000/signup"
        // "https://reacteur-marvel-by-tommy.herokuapp.com/signup"
        const response = await axios.post(
          "http://localhost:4000/signup",
          userData
        );

        setDataUserName(response.data.resNewUser.username);
        setUser(response.data.resNewUser.token);
        history.push("/");
      } else {
        setErrorEmail(true);
      }
    } catch (e) {
      console.log(e.response);
      if (e.response.status === 409) {
        setUserExist(true);
      } else if (e.response.status === 400) {
        setEmptyUsername(true);
      } else if (e.response.status === 401) {
        setErrorPassword(true);
      } else {
        alert(e);
        console.log(e.response);
      }
    }
  };

  return (
    <div className="form">
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

        {userExist && (
          <p
            style={{
              color: "red",
              fontFamily: "Arial",
              textAlign: "center",
              marginTop: "15px",
            }}
          >
            Cette adresse mail existe déjà
          </p>
        )}

        {emptyUsername && (
          <p
            style={{
              color: "red",
              fontFamily: "Arial",
              textAlign: "center",
              marginTop: "15px",
            }}
          >
            Nom d'utilisateur manquant
          </p>
        )}

        {errorEmail && (
          <p
            style={{
              color: "red",
              fontFamily: "Arial",
              textAlign: "center",
              marginTop: "15px",
            }}
          >
            Entrez une adresse mail valide
          </p>
        )}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className={emptyUsername && "form-error"}
            placeholder="Nom d'utilisateur"
            onChange={(e) => {
              console.log("username : ", e.target.value);
              setUsername(e.target.value);
            }}
          />

          <input
            placeholder="Adresse mail"
            className={(userExist || errorEmail) && "form-error"}
            onChange={(e) => {
              console.log("email : ", e.target.value);
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
          <input
            type="password"
            placeholder="Confirmer mot de passe"
            className={errorPassword && "form-error"}
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
