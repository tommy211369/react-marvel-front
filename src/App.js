import "./App.css";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Characters from "./containers/Characters";
import Comics from "./containers/Comics";
import CharacterComics from "./containers/CharacterComics";
import Favorites from "./containers/Favorites";
import LogIn from "./containers/LogIn";
import SignUp from "./containers/SignUp";
import Header from "./components/Header";
import axios from "axios";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
library.add(faHeart);

function App() {
  const [userToken, setUserToken] = useState(Cookies.get("userToken") || null);
  const [userName, setUserName] = useState(Cookies.get("userName") || null);
  const [userFavorites, setUserFavorites] = useState(
    Cookies.get("userFavorites") || null
  );
  const [characters, setCharacters] = useState("");

  useEffect(() => {
    if (userToken) {
      const fetchFavorites = async () => {
        try {
          const response = await axios.get(
            `http://localhost:4000/favorites?token=${userToken}`
          );

          console.log(response.data);
          setUserFavorites(response.data.userFavorites);
          Cookies.set("userFavorites", response.data.userFavorites);
        } catch (error) {
          console.log(error.message);
        }
      };

      fetchFavorites();
    }
  }, [userToken, userFavorites]);

  // store token as cookie
  const setUser = (token) => {
    setUserToken(token);
    Cookies.set("userToken", token);
  };

  // store userName as cookie
  const setDataUserName = (user) => {
    setUserName(user);
    Cookies.set("userName", user);
  };

  // faire une fonction add/remove item (pour Grid, CharacterComics, Favorites)

  return (
    <Router>
      <Header
        userToken={userToken}
        userName={userName}
        setUserToken={setUserToken}
        setUserName={setUserName}
      />
      <Switch>
        <Route exact path="/comics">
          <Comics
            userName={userName}
            userToken={userToken}
            userFavorites={userFavorites}
          />
        </Route>
        <Route path="/comics/:id">
          <CharacterComics userFavorites={userFavorites} />
        </Route>
        <Route path="/favorites">
          <Favorites
            userName={userName}
            userFavorites={userFavorites}
            characters={characters}
            setCharacters={setCharacters}
          />
        </Route>
        <Route path="/login">
          <LogIn setUser={setUser} setDataUserName={setDataUserName} />
        </Route>
        <Route path="/signup">
          <SignUp setUser={setUser} setDataUserName={setDataUserName} />
        </Route>

        <Route path="/">
          <Characters
            userName={userName}
            userToken={userToken}
            userFavorites={userFavorites}
            characters={characters}
            setCharacters={setCharacters}
          />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
