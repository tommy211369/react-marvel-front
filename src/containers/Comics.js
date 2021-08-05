import React, { useState, useEffect } from "react";
import Grid from "../components/Grid";
import SearchInput from "../components/SearchInput";
import Spinner from "../components/Spinner";

import axios from "axios";

export default function Comics({ userName, userToken, userFavorites }) {
  const [comicsList, setComicsList] = useState("");
  const [comicsInput, setComicsInput] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchComics = async () => {
      try {
        // `http://localhost:4000/comics?title=${comicsInput}`
        const response = await axios.get(
          `https://reacteur-marvel-by-tommy.herokuapp.com/comics?title=${comicsInput}`
        );

        setComicsList(response.data);
        setIsLoading(false);
        console.log(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchComics();
  }, [comicsInput]);

  const handleComics = (e) => {
    setComicsInput(e.target.value);
  };

  return isLoading ? (
    <Spinner />
  ) : (
    <div className="container">
      <SearchInput
        type="text"
        placeholder="Rechercher un comics"
        handle={handleComics}
      />

      <Grid
        items={comicsList}
        userName={userName}
        type="Comics"
        userToken={userToken}
        userFavorites={userFavorites}
      />
    </div>
  );
}
