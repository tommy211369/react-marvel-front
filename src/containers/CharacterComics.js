import React, { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { useParams } from "react-router-dom";

export default function CharacterComics({}) {
  const { id } = useParams();
  const [characterInfos, setCharacterInfos] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCharacterComics = async () => {
      try {
        // `http://localhost:4000/comics/${id}`
        // `https://reacteur-marvel-by-tommy.herokuapp.com/comics/${id}`
        const response = await axios.get(
          `https://reacteur-marvel-by-tommy.herokuapp.com/comics/${id}`
        );

        setCharacterInfos(response.data);
        setIsLoading(false);
        // console.log(response.data);
      } catch (error) {
        // console.log(error.message);
        alert(error.message);
      }
    };
    fetchCharacterComics();
  }, [id]);

  return isLoading ? (
    <Spinner />
  ) : (
    <div className="character-comics">
      <div className="character-infos">
        <img
          src={`${characterInfos.thumbnail.path}.${characterInfos.thumbnail.extension}`}
          alt={characterInfos.name}
        />
        <div>
          <h1>{characterInfos.name}</h1>
          <p>{characterInfos.description}</p>
        </div>
      </div>

      <div className="comics-list">
        {characterInfos.comics.length > 0 ? (
          characterInfos.comics.map((comic) => {
            return (
              <div key={comic._id} className="comics">
                <h2>{comic.title}</h2>
                <div>
                  <img
                    src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                    alt={comic.title}
                  />
                  {comic.description && <p>{comic.description}</p>}
                </div>
              </div>
            );
          })
        ) : (
          <p style={{ textAlign: "center" }}>
            Aucun comics pour {characterInfos.name}
          </p>
        )}
      </div>
    </div>
  );
}
