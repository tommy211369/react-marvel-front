import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Grid({ items, characters }) {
  // en appuyant sur le coeur, ajout à favorites
  // condition : si c'est un personnage ou un comics
  return (
    <div className="grid">
      {items.map((item) => {
        return (
          <div key={item._id} className="item">
            <FontAwesomeIcon icon="heart" className="heart" />
            <Link to={items === characters && `/comics/${item._id}`}>
              <img
                src={`${item.thumbnail.path}.${item.thumbnail.extension}`}
                alt={item.name ? item.name : item.title}
              />
              {item.description && (
                <p className="description">{item.description}</p>
              )}
            </Link>
            {item.name ? <p>{item.name}</p> : <p>{item.title}</p>}
          </div>
        );
      })}
    </div>
  );
}
