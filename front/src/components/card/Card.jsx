import { Link, useLocation } from "react-router-dom";
import Style from "../card/ImagenCard.module.scss";
import { removeFav, addFav } from "../../redux/actions.js";
import { connect } from "react-redux";
import { useEffect, useState } from "react";

export function Card({
  onClose,
  name,
  status,
  species,
  gender,
  origin,
  image,
  id,
  addFav,
  removeFav,
  myFavorites,
}) {
  const { pathname } = useLocation();

  const [isFav, setIsFav] = useState(false);

  const handleFavorite = () => {
    const character = {
      id,
      name,
      status,
      species,
      gender,
      origin,
      image,
    };

    if (isFav) {
      setIsFav(false);
      removeFav(id);
    } else {
      setIsFav(true);
      addFav(character);
    }
  };

  useEffect(() => {
    myFavorites?.forEach((fav) => {
      if (fav.id === id) {
        setIsFav(true);
      }
    });
  }, [myFavorites]);

  return (
    <div className={Style.cardstyle}>
      <div className={Style.botones}>
        {isFav ? (
          <button onClick={handleFavorite}>❤️</button>
        ) : (
          <button onClick={handleFavorite}>🤍</button>
        )}
        {pathname !== "/favorites" && (
          <button className={Style.myButton} onClick={() => onClose(id)}>
            <h1>#{id} x</h1>
          </button>
        )}
      </div>

      <Link to={`/detail/${id}`}>
        <h2>{name}</h2>
      </Link>
      <Link to={`/detail/${id}`}>
        <img className={Style.image} src={image} alt="image" />
      </Link>
      <h3>Status: {status}</h3>
      <h3>Specie: {species}</h3>
      <h3>Gender: {gender}</h3>
      <h3>Origin: {origin}</h3>
    </div>
  );
}
export const mapDispatchToProps = (dispatch) => {
  return {
    addFav: (character) => {
      dispatch(addFav(character));
    },
    removeFav: (id) => {
      dispatch(removeFav(id));
    },
  };
};

export const mapStateToProps = (state) => {
  return {
    myFavorites: state.myFavorites,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Card);
