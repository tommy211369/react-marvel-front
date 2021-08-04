import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Characters from "./containers/Characters";
import Comics from "./containers/Comics";
import CharacterComics from "./containers/CharacterComics";
import Favorites from "./containers/Favorites";
import Header from "./components/Header";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
library.add(faHeart);

function App() {
  return (
    <Router>
      <Header />
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

        <Route path="/">
          <Characters />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
