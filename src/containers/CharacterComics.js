import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function CharacterComics() {
  const { id } = useParams();
  const [characterId, setCharacterId] = useState("");
  const [characterInfos, setCharacterInfos] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setCharacterId(id);

    const fetchCharacterComics = async () => {
      try {
        const response = await axios.get(
          `https://reacteur-marvel-by-tommy.herokuapp.com/comics/${id}`
        );

        setCharacterInfos(response.data);
        setIsLoading(false);
        console.log(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchCharacterComics();
  }, [id]);

  return isLoading ? (
    <p>Loading ...</p>
  ) : (
    <div>
      <h1>{characterInfos.name}</h1>
      {characterInfos.comics.length > 0 ? (
        characterInfos.comics.map((comic) => {
          return <p key={comic._id}>{comic.title}</p>;
        })
      ) : (
        <p>Pas de comics</p>
      )}
    </div>
  );
}
