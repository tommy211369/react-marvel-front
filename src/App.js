import "./App.css";
import { useState } from "react";
import Cookies from "js-cookie";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Characters from "./containers/Characters";
import Comics from "./containers/Comics";
import CharacterComics from "./containers/CharacterComics";
import Favorites from "./containers/Favorites";
import LogIn from "./containers/LogIn";
import SignUp from "./containers/SignUp";
import Header from "./components/Header";
import ScrollToTop from "./components/ScrollToTop";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
library.add(faHeart);

function App() {
  const [userToken, setUserToken] = useState(Cookies.get("userToken") || null);
  const [userName, setUserName] = useState(Cookies.get("userName") || null);
  const [userFavorites, setUserFavorites] = useState(
    Cookies.get("userFavorites") || null
  );
  const [userId, setUserId] = useState(Cookies.get("userId") || null);

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

  // store userId as cookie
  const setDataUserId = (userId) => {
    setUserId(userId);
    Cookies.set("userId", userId);
  };

  return (
    <Router>
      <Header
        userName={userName}
        setUserName={setUserName}
        userToken={userToken}
        setUserToken={setUserToken}
        setUserFavorites={setUserFavorites}
        setUserId={setUserId}
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
          <CharacterComics />
        </Route>
        <Route path="/favorites">
          <Favorites
            userToken={userToken}
            userFavorites={userFavorites}
            setUserFavorites={setUserFavorites}
            userId={userId}
          />
        </Route>
        <Route path="/login">
          <LogIn
            setUser={setUser}
            setDataUserName={setDataUserName}
            setDataUserId={setDataUserId}
          />
        </Route>
        <Route path="/signup">
          <SignUp
            setUser={setUser}
            setDataUserName={setDataUserName}
            setDataUserId={setDataUserId}
          />
        </Route>

        <Route path="/">
          <Characters
            userName={userName}
            userToken={userToken}
            userFavorites={userFavorites}
            setUserFavorites={setUserFavorites}
          />
        </Route>
      </Switch>
      <ScrollToTop />
    </Router>
  );
}

export default App;
