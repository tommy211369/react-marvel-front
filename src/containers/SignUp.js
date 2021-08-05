import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";

export default function SignUp({ setUser, setDataUserName }) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const history = useHistory();

  const userData = {
    email: email,
    username: username,
    password: password,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `https://reacteur-marvel-by-tommy.herokuapp.com/signup`,
        userData
      );

      setDataUserName(response.data.resNewUser.username);
      setUser(response.data.resNewUser.token);
      console.log(response.data);
      history.push("/");
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <div className="login">
      <div className="wrapper">
        <div className="form-header">
          <Link to="/login">Se connecter</Link>
          <Link>S'enregistrer</Link>
        </div>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nom d'utilisateur"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <input
            type="email"
            placeholder="Adresse mail"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            type="password"
            placeholder="Mot de passe"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <input
            type="password"
            placeholder="Confirmer mot de passe"
            onChange={(e) => {
              setConfirm(e.target.value);
            }}
          />
          <input type="submit" value="Valider" />
        </form>
      </div>
    </div>
  );
}
