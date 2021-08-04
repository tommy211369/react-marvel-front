import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Comics() {
  const [comicsList, setComicsList] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchComics = async () => {
      try {
        const response = await axios.get(
          "https://reacteur-marvel-by-tommy.herokuapp.com/comics"
        );

        setComicsList(response.data);
        setIsLoading(false);
        console.log(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchComics();
  }, []);

  return isLoading ? (
    <p>Loading ...</p>
  ) : (
    <div>
      {comicsList.map((comics) => {
        return <p key={comics._id}>{comics.title}</p>;
      })}
    </div>
  );
}
