import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

import Spinner from "../components/Spinner";

export default function Favorites({
  userFavorites,
  userToken,
  setUserFavorites,
}) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        if (userToken !== null) {
          const response = await axios.get(
            // `https://reacteur-marvel-by-tommy.herokuapp.com/favorites?token=${userToken}`
            // `http://localhost:4000/favorites?token=${userToken}`
            `http://localhost:4000/favorites?token=${userToken}`
          );

          console.log(response.data);
          setUserFavorites(response.data.userFavorites);
          Cookies.set("userFavorites", response.data.userFavorites);
          setIsLoading(false);
        } else {
          Cookies.remove("userFavorites");
          setUserFavorites(null);
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchFavorites();
  }, [userToken, userFavorites]);

  const handleRemoveItem = async (user, id) => {
    try {
      const response = await axios.delete(
        // `http://localhost:4000/favorites/delete?user=${user}&id=${id}`
        // `https://reacteur-marvel-by-tommy.herokuapp.com/favorites/delete?user=${user}&id=${id}`
        `http://localhost:4000/favorites/delete?user=${user}&id=${id}`
      );

      console.log(response.data);
      setUserFavorites(userFavorites);
    } catch (error) {
      console.log(error.message);
    }
  };
  return isLoading ? (
    <Spinner />
  ) : (
    <div className="favorites">
      <h1>Vos favoris</h1>

      <div className="container">
        {userToken ? (
          userFavorites.map((item) => {
            return (
              <div key={item.id}>
                {item.type === "Character" ? (
                  <p>
                    Nom : <span>{item.title}</span>
                  </p>
                ) : (
                  <p>
                    Titre : <span>{item.title}</span>
                  </p>
                )}
                <p>{item.type}</p>
                <div>
                  <img src={item.image} alt={item.title} />
                  <button
                    onClick={() => handleRemoveItem(item.userName, item.id)}
                  >
                    Retirer des favoris
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <Redirect to="/login" />
        )}
      </div>
    </div>
  );
}
