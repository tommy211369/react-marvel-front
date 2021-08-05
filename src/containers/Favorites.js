import React from "react";

export default function Favorites({ userFavorites, userName, characters }) {
  return (
    <div className="favorites">
      <h1>Voir vos favoris</h1>

      <div className="container">
        {userFavorites.map((item) => {
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
                <button>Retirer des favoris</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
