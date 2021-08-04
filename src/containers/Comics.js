import React, { useState, useEffect } from "react";
import Grid from "../components/Grid";
import Input from "../components/Input";
import axios from "axios";

export default function Comics() {
  const [comicsList, setComicsList] = useState("");
  const [comicsInput, setComicsInput] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchComics = async () => {
      try {
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
    <p>Loading ...</p>
  ) : (
    <div className="container">
      <Input
        type="text"
        placeholder="Rechercher un comics"
        handle={handleComics}
      />

      <Grid items={comicsList} />
    </div>
  );
}
