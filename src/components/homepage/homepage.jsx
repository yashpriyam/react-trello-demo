import { useContext } from "react";
import uuid from "react-uuid";
import { AppStateContext } from "../appState/appState.context";
import { CardList } from "../cardList/cardList";
import "./homepage.css";

const HomePage = () => {
  const { stateAndDispatch } = useContext(AppStateContext);
  const [appState, dispatch] = stateAndDispatch;
  let updatedState = [...appState];

  const storedState = JSON.parse(localStorage.getItem("userData"));
  if (updatedState.length) updatedState = storedState.state;

  const handleListAdd = () => {
    updatedState.push({ id: uuid(), title: "CardList", cards: [] });
    dispatch({ type: "addList", value: updatedState });
  };

  return (
    <div className="homepage-container">
      <button className="listadd-btn" onClick={handleListAdd}>
        Add List
      </button>
      <div className="cardlist-container">
        {updatedState.map((cardlist, cardlistIdx, arr) => (
          <CardList
            key={cardlist.id}
            cardlist={cardlist}
            cardlistIdx={cardlistIdx}
          />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
