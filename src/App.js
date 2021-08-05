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
import { library } from "@fortawesome/fontawesome-svg-core";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
library.add(faHeart);

function App() {
  const [userToken, setUserToken] = useState(Cookies.get("userToken") || null);
  const [userName, setUserName] = useState(Cookies.get("userName") || null);

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

  return (
    <Router>
      <Header
        userName={userName}
        setUserToken={setUserToken}
        setUserName={setUserName}
      />
      <Switch>
        <Route exact path="/comics">
          <Comics />
        </Route>
        <Route path="/comics/:id">
          <CharacterComics />
        </Route>
        <Route path="/favorites">
          <Favorites />
        </Route>
        <Route path="/login">
          <LogIn setUser={setUser} setDataUserName={setDataUserName} />
        </Route>
        <Route path="/signup">
          <SignUp setUser={setUser} setDataUserName={setDataUserName} />
        </Route>

        <Route path="/">
          <Characters />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
