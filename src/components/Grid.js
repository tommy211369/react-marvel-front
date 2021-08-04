import React from "react";
import { Link } from "react-router-dom";

export default function Grid({ items, characters }) {
  return (
    <div className="grid">
      {items.map((item) => {
        return (
          <div key={item._id} className="item">
            <Link to={items === characters && `/comics/${item._id}`}>
              <img
                src={`${item.thumbnail.path}.${item.thumbnail.extension}`}
                alt={item.name ? item.name : item.title}
              />

              {item.name ? <p>{item.name}</p> : <p>{item.title}</p>}

              {item.description && (
                <p className="description">{item.description}</p>
              )}
            </Link>
          </div>
        );
      })}
    </div>
  );
}
