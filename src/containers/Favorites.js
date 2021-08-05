import React from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";

export default function Favorites({
  userFavorites,
  userToken,
  setUserFavorites,
}) {
  const handleRemoveItem = async (user, id) => {
    try {
      const response = await axios.delete(
        // `http://localhost:4000/favorites/delete?user=${user}&id=${id}`
        // `https://reacteur-marvel-by-tommy.herokuapp.com/favorites/delete?user=${user}&id=${id}`
        `https://reacteur-marvel-by-tommy.herokuapp.com/favorites/delete?user=${user}&id=${id}`
      );

      console.log(response.data);
      setUserFavorites(userFavorites);
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="favorites">
      <h1>Vos favoris</h1>

      <div className="container">
        {userToken ? (
          userFavorites.map((item) => {
            return (
              <div>
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
