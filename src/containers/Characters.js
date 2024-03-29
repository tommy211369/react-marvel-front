import React, { useState, useEffect } from "react";
import Grid from "../components/Grid";
import SearchInput from "../components/SearchInput";
import Spinner from "../components/Spinner";
import axios from "axios";
import PaginationCharacters from "../components/PaginationCharacters";
import spidey from "../assets/img/spider-man.png";

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
  const [limit, setLimit] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        // `http://localhost:4000/characters?name=${characterInput}&skip=${skip}`
        // `https://marvel-backend.onrender.com/characters?name=${characterInput}&skip=${skip}`
        const response = await axios.get(
          `https://marvel-backend.onrender.com/characters?name=${characterInput}&skip=${skip}`
        );

        // console.log(response.data);
        setLimit(response.data.charac.limit);
        setCharactersTotal(response.data.count);
        setCharacters(response.data.characters);

        setTimeout(() => setIsLoading(false), 1500);
      } catch (error) {
        console.log(error.message);
        // alert(error.message);
      }
    };

    fetchCharacters();
  }, [characterInput, skip, setCharacters, page]);

  const handleCharacter = (e) => {
    setCharacterInput(e.target.value);
  };

  return isLoading ? (
    <div>
      <Spinner />
      <div className="loading">
        <img src={spidey} alt="spider-man" />
      </div>
    </div>
  ) : (
    <div className="container">
      <SearchInput
        type="text"
        placeholder="Rechercher un personnage"
        handle={handleCharacter}
      />

      {characters.length > 0 && (
        <PaginationCharacters
          setSkip={setSkip}
          page={page}
          setPage={setPage}
          characters={characters}
          charactersTotal={charactersTotal}
          limit={limit}
        />
      )}

      <Grid
        items={characters}
        characters={characters}
        userName={userName}
        type="Personnage"
        userToken={userToken}
        userFavorites={userFavorites}
        setUserFavorites={setUserFavorites}
      />

      {characters.length > 0 && (
        <PaginationCharacters
          setSkip={setSkip}
          page={page}
          setPage={setPage}
          characters={characters}
          charactersTotal={charactersTotal}
          limit={limit}
        />
      )}
    </div>
  );
}
