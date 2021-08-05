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
  const [appLoading, setAppLoading] = useState(true);
  const [characters, setCharacters] = useState("");

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

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        if (userToken) {
          const response = await axios.get(
            // `https://reacteur-marvel-by-tommy.herokuapp.com/favorites?token=${userToken}`
            // `http://localhost:4000/favorites?token=${userToken}`
            `https://reacteur-marvel-by-tommy.herokuapp.com/favorites?token=${userToken}`
          );

          console.log(response.data);
          setUserFavorites(response.data.userFavorites);
          Cookies.set("userFavorites", response.data.userFavorites);
          setAppLoading(false);
        } else {
          Cookies.remove("userFavorites");
          setAppLoading(false);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchFavorites();
  }, [userToken, userFavorites]);

  // faire une fonction add/remove item (pour Grid, CharacterComics, Favorites)

  return (
    <Router>
      <Header
        userToken={userToken}
        userName={userName}
        setUserToken={setUserToken}
        setUserName={setUserName}
        userFavorites={userFavorites}
        setUserFavorites={setUserFavorites}
      />
      <Switch>
        <Route exact path="/comics">
          <Comics
            userName={userName}
            userToken={userToken}
            userFavorites={userFavorites}
            setUserFavorites={setUserFavorites}
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
            setUserFavorites={setUserFavorites}
            userToken={userToken}
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
            setUserFavorites={setUserFavorites}
            appLoading={appLoading}
          />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
