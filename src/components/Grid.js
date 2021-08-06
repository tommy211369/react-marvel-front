import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

import Fade from "react-reveal/Fade";
import axios from "axios";
import Spinner from "../components/Spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Grid({
  items,
  characters,
  userName,
  type,
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

  return isLoading ? (
    <Spinner />
  ) : items ? (
    <div className="grid">
      <Fade top>
        {items.map((item) => {
          let exist = "";
          if (userFavorites !== null && userFavorites.length > 0) {
            exist = userFavorites.find((elem) => elem.id === item._id);
          }
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
                    // `http://localhost:4000/user/favorites`
                    // `https://reacteur-marvel-by-tommy.herokuapp.com/user/favorites`
                    const response = await axios.post(
                      `https://reacteur-marvel-by-tommy.herokuapp.com/user/favorites`,
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
  ) : (
    <p style={{ color: "white" }}>Aucun résultat ...</p>
  );
}
