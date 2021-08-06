import React, { useState, useEffect } from "react";
import Grid from "../components/Grid";
import SearchInput from "../components/SearchInput";
import Spinner from "../components/Spinner";
import Pagination from "../components/Pagination";
import axios from "axios";

export default function Comics({
  userName,
  userToken,
  userFavorites,
  setUserFavorites,
}) {
  const [comicsList, setComicsList] = useState("");
  const [comicsInput, setComicsInput] = useState("");
  const [comicsTotal, setComicsTotal] = useState("");
  const [skip, setSkip] = useState(0);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchComics = async () => {
      try {
        // `https://reacteur-marvel-by-tommy.herokuapp.com/comics?title=${comicsInput}&skip=${skip}`
        // `http://localhost:4000/comics?title=${comicsInput}&skip=${skip}`
        const response = await axios.get(
          `https://reacteur-marvel-by-tommy.herokuapp.com/comics?title=${comicsInput}&skip=${skip}`
        );
        console.log("ComicsList : ", response.data);

        setComicsTotal(response.data.count);

        setComicsList(response.data.comics);

        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchComics();
  }, [comicsInput, skip]);

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

      {comicsList.length > 0 && (
        <Pagination
          skip={skip}
          setSkip={setSkip}
          page={page}
          setPage={setPage}
          comicsTotal={comicsTotal}
        />
      )}

      <Grid
        items={comicsList}
        userName={userName}
        type="Comics"
        userToken={userToken}
        userFavorites={userFavorites}
        setUserFavorites={setUserFavorites}
      />

      {comicsList.length > 0 && (
        <Pagination
          skip={skip}
          setSkip={setSkip}
          page={page}
          setPage={setPage}
          comicsTotal={comicsTotal}
        />
      )}
    </div>
  );
}
