import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Characters() {
  const [characters, setCharacters] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await axios.get(
          "https://reacteur-marvel-by-tommy.herokuapp.com/characters"
        );
        setCharacters(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchCharacters();
  }, []);

  return isLoading ? (
    <p>Loading ...</p>
  ) : (
    <div>
      {characters.map((character) => {
        return (
          <Link key={character._id} to={`/comics/${character._id}`}>
            {character.name}
          </Link>
        );
      })}
    </div>
  );
}
