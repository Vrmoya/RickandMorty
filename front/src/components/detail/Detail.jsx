import axios from "axios";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Styles from "./Detail.module.scss";

const Detail = () => {
  const { id } = useParams();
  const [character, setCharacter] = useState({});

  useEffect(() => {
    // axios(`https://rym2.up.railway.app/api/character/${id}?key=pi-vrmoya`)
    axios(`http://localhost:3001/rickandmorty/character/${id}`).then(
      ({ data }) => {
        if (data.name) {
          setCharacter(data);
          // console.log(data);
        } else {
          window.alert("No hay personajes con ese ID");
        }
      }
    );
    return setCharacter({});
  }, [id]);

  return (
    <div className={Styles.characterDetails}>
      {character.name && (
        <>
          <div className={Styles.description}>
            <h2 className={Styles.name}>{character.name}</h2>
            <img
              className={Styles.image}
              src={character.image}
              alt={character.name}
            />
          </div>
          <div className={Styles.description}>
            <h3>Status: {character.status}</h3>
            <h3>Specie: {character.species}</h3>
            <h3>Gender: {character.gender}</h3>
            <h3>Origin: {character.origin?.name}</h3>
          </div>
        </>
      )}
    </div>
  );
};
export default Detail;
