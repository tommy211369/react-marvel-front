import React, { useState, useEffect } from "react";
import Grid from "../components/Grid";
import SearchInput from "../components/SearchInput";
import Spinner from "../components/Spinner";
import axios from "axios";
import Pagination from "../components/Pagination";
export default function Characters({
  userName,
  userToken,
  userFavorites,
  setUserFavorites,
}) {
  const [characters, setCharacters] = useState("");
  const [characterInput, setCharacterInput] = useState("");
  const [charactersTotal, setCharactersTotal] = useState("");
  const [skip, setSkip] = useState(0);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        // `http://localhost:4000/characters?name=${characterInput}&skip=${skip}`
        // `https://reacteur-marvel-by-tommy.herokuapp.com/characters?name=${characterInput}&skip=${skip}`
        const response = await axios.get(
          `https://reacteur-marvel-by-tommy.herokuapp.com/characters?name=${characterInput}&skip=${skip}`
        );

        // console.log(response.data);
        setCharactersTotal(response.data.count);
        setCharacters(response.data.characters);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
        // alert(error.message);
      }
    };

    fetchCharacters();
  }, [characterInput, skip, setCharacters]);

  const handleCharacter = (e) => {
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

      {characters.length > 0 && (
        <Pagination
          setSkip={setSkip}
          page={page}
          setPage={setPage}
          characters={characters}
          charactersTotal={charactersTotal}
        />
      )}

      <Grid
        items={characters}
        characters={characters}
        userName={userName}
        type="Character"
        userToken={userToken}
        userFavorites={userFavorites}
        setUserFavorites={setUserFavorites}
      />

      {characters.length > 0 && (
        <Pagination
          setSkip={setSkip}
          page={page}
          setPage={setPage}
          characters={characters}
          charactersTotal={charactersTotal}
        />
      )}
    </div>
  );
}
