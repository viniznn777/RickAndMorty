import React from "react";
import style from "./ContainerPersonagem.module.css";

const Personagem = ({ name, status, species, gender, image, type }) => {
  return (
    <div className={style.container}>
      <div className={style.leftSide}>
        <div className={style.Image}>
          <img
            src={image}
            alt="Se está vendo esta mensagem, talvez nós não encontramos a imagem ou seu personagem"
          />
        </div>
      </div>
      <div className={style.rightSide}>
        <div className={style.description}>
          <h1>{name}</h1>
          <ol>
            <li>
              Gênero: <span>{gender}</span>
            </li>
            <li>
              Espécie: <span>{species}</span>
            </li>
            <li>
              Status de vida: <span>{status}</span>
            </li>
            {type && (
              <li>
                Tipo: <span>{type}</span>
              </li>
            )}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default Personagem;
