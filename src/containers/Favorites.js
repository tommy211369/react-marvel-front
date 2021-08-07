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
}) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        if (userToken !== null) {
          const response = await axios.get(
            // `https://reacteur-marvel-by-tommy.herokuapp.com/favorites?token=${userToken}`
            // `http://localhost:4000/favorites?token=${userToken}`
            `https://reacteur-marvel-by-tommy.herokuapp.com/favorites?token=${userToken}`
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
        // `http://localhost:4000/favorites/delete?user=${user}&id=${id}`
        // `https://reacteur-marvel-by-tommy.herokuapp.com/favorites/delete?user=${user}&id=${id}`
        `https://reacteur-marvel-by-tommy.herokuapp.com/favorites/delete?user=${user}&id=${id}`
      );

      // console.log(response.data);
      setUserFavorites(userFavorites);
    } catch (error) {
      console.log(error.message);
      alert(error.message);
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
                  {item.type === "Character" ? (
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
            <p>Aucun favoris</p>
          )
        ) : (
          <Redirect to="/login" />
        )}
      </div>
    </div>
  );
}
