import { useState } from "react";
import styles from "./App.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ContainerPersonagem from "./components/ContainerPersonagem";

function App() {
  const [It_is_Ok, setIt_is_Ok] = useState(false);
  const [page, setPage] = useState();
  const [ID_Character, setID] = useState();
  const [information, setinfo] = useState({
    name: "",
    status: "",
    gender: "",
    species: "",
    image: "",
    type: "",
  });

  let message = (string) =>
    toast.error(string, {
      position: "top-right",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  let Alert = (string) =>
    toast.warning(string, {
      position: "top-right",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

  return (
    <div className={styles.App}>
      <form>
        <div className={styles.containerInput}>
          <div className={styles.divInput}>
            <label htmlFor="page">Página:</label>
            <input
              type="number"
              id="page"
              max="42"
              min="1"
              onChange={(e) => setPage(e.target.value)}
              placeholder="Página. max 42"
            />
          </div>
          <div className={styles.divInput}>
            <label htmlFor="Id_Character">ID de personagem:</label>
            <input
              type="number"
              id="Id_Character"
              max="19"
              min="0"
              onChange={(e) => setID(e.target.value)}
              placeholder="ID. max 19"
            />
          </div>
        </div>
        <div className={styles.buttonContainer}>
          <button onClick={Search} className={styles.button}>
            Pesquisar
          </button>
        </div>
        <ToastContainer />
      </form>
      {It_is_Ok && (
        <ContainerPersonagem
          name={information.name}
          gender={information.gender}
          species={information.species}
          status={information.status}
          image={information.image}
          type={information.type}
        />
      )}
    </div>
  );

  function Search(e) {
    e.preventDefault();
    if (!page || !ID_Character) {
      message("Nenhum campo pode ficar vazio!");
      setIt_is_Ok(false);
      return;
    } else if ((page > 42) | (ID_Character > 19)) {
      message("Esta Página ou ID não existe");
      setIt_is_Ok(false);
      return;
    } else if (page === "42" && ID_Character > 5) {
      Alert("Na última página, existem apenas 5 personagens");
      setIt_is_Ok(false);
      return;
    } else {
      setIt_is_Ok(true);
      fetch(`https://rickandmortyapi.com/api/character/?page=${page}`)
        .then((promise) => promise.json())
        .then((json) => {
          let DATA = json.results;
          setinfo({
            name: DATA[ID_Character].name,
            status: DATA[ID_Character].status,
            gender: DATA[ID_Character].gender,
            species: DATA[ID_Character].species,
            image: DATA[ID_Character].image,
            type: DATA[ID_Character].type,
          });
        });
    }
  }
}

export default App;
