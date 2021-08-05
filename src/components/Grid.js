import React, { useState } from "react";
import { Link } from "react-router-dom";
import Fade from "react-reveal/Fade";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Grid({
  items,
  characters,
  userName,
  type,
  userToken,
  userFavorites,
}) {
  return (
    <div className="grid">
      <Fade top>
        {items.map((item) => {
          const exist = userFavorites.find((elem) => elem.id === item._id);
          console.log(exist);
          return (
            <div key={item._id} className="item">
              <FontAwesomeIcon
                icon="heart"
                className={exist ? "heart-red" : "heart"}
                onClick={async () => {
                  try {
                    const itemDatas = {
                      itemId: item._id,
                      userName: userName,
                      itemType: type,
                      itemTitle: item.title ? item.title : item.name,
                      itemPicture: `${item.thumbnail.path}.${item.thumbnail.extension}`,
                    };

                    // `https://reacteur-marvel-by-tommy.herokuapp.com/user/favorites`
                    const response = await axios.post(
                      "http://localhost:4000/user/favorites",
                      itemDatas,
                      {
                        headers: {
                          authorization: `Bearer ${userToken}`,
                        },
                      }
                    );

                    console.log(response.data);
                  } catch (error) {
                    console.log("Message d'erreur Front : ", error.message);
                  }
                }}
              />
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
      </Fade>
    </div>
  );
}
