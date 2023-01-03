import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import Spinner from "../components/Spinner";
import deadPoolLove from "../assets/img/deadpool-love.jpeg";

export default function Favorites({
  userToken,
  userFavorites,
  setUserFavorites,
  userId,
}) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        if (userToken !== null) {
          const response = await axios.get(
            // `https://marvel-backend.onrender.com/favorites?token=${userToken}`
            // `http://localhost:4000/favorites?token=${userToken}`
            `https://marvel-backend.onrender.com/favorites?token=${userToken}`
          );

          // console.log(response.data);
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
  }, [userToken, userFavorites, setUserFavorites]);

  const handleRemoveItem = async (user, id) => {
    try {
      await axios.delete(
        // `http://localhost:4000/favorites/delete?user=${userId}&id=${id}`
        // `https://marvel-backend.onrender.com/favorites/delete?user=${userId}&id=${id}`
        `https://marvel-backend.onrender.com/favorites/delete?user=${userId}&id=${id}`
      );

      // console.log(response.data);
      setUserFavorites(userFavorites);
    } catch (error) {
      console.log(error.response);
    }
  };

  return isLoading ? (
    <Spinner />
  ) : (
    <div className="favorites">
      <h1>Vos favoris</h1>
      <div className="deadpool-love">
        <img src={deadPoolLove} alt="deadpool love" />
      </div>

      <div className="container">
        {userToken ? (
          userFavorites.length > 0 ? (
            userFavorites.map((item) => {
              return (
                <div key={item.id} className="favorite">
                  {item.type === "Personnage" ? (
                    <h2>
                      Nom : <span>{item.title}</span>
                    </h2>
                  ) : (
                    <h2>
                      Titre : <span>{item.title}</span>
                    </h2>
                  )}
                  <p>{item.type}</p>
                  <div>
                    <img src={item.image} alt={item.title} />
                    <button onClick={() => handleRemoveItem(userId, item.id)}>
                      Retirer des favoris
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <p>Aucun favoris</p>
          )
        ) : (
          <Redirect to="/login" />
        )}
      </div>
    </div>
  );
}
