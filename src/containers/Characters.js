import React, { useState, useEffect } from "react";
import Grid from "../components/Grid";
import SearchInput from "../components/SearchInput";
import Spinner from "../components/Spinner";
import axios from "axios";

export default function Characters({
  userName,
  userToken,
  userFavorites,
  characters,
  setCharacters,
  appLoading,
}) {
  const [characterInput, setCharacterInput] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        // `http://localhost:4000/characters?name=${characterInput}`
        const response = await axios.get(
          `https://reacteur-marvel-by-tommy.herokuapp.com/characters?name=${characterInput}`
        );
        console.log(response.data);
        setCharacters(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchCharacters();
  }, [characterInput]);

  const handleCharacter = (e) => {
    console.log(e.target.value);
    setCharacterInput(e.target.value);
  };

  return isLoading ? (
    <Spinner />
  ) : (
    <div className="container">
      <SearchInput
        type="text"
        placeholder="Rechercher un personnage"
        handle={handleCharacter}
      />

      <Grid
        items={characters}
        characters={characters}
        userName={userName}
        type="Character"
        userToken={userToken}
        userFavorites={userFavorites}
        appLoading={appLoading}
      />
    </div>
  );
}
