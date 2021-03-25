import React, { useContext } from "react";
import uuid from "react-uuid";
import { TaskCard } from "../taskCard/taskCard";
import { AppStateContext } from "../appState/appState.context";
import "./cardList.css";

export const CardList = ({ cardlist, cardlistIdx }) => {
  const { cards, title } = cardlist;
  const { stateAndDispatch } = useContext(AppStateContext);

  const [appState, dispatch] = stateAndDispatch;
  const updatedState = [...appState];
  const handleCardAdd = () => {
    updatedState[cardlistIdx].cards.push({
      id: uuid(),
      title: "",
      description: ""
    });
    dispatch({ type: "addCard", value: updatedState });
  };

  const handleListRemove = () => {
    updatedState.splice(cardlistIdx, 1);
    dispatch({ type: "removeList", value: updatedState });
  };

  const handleListTitleChange = (e) => {
    updatedState[cardlistIdx].title = e.target.value;
    dispatch({ type: "addListTitle", value: updatedState });
  };

  const onDragOver = (e) => {
    e.preventDefault();
  };

  const onDrop = (e, cardlist) => {
    const cardInsIdx = e.dataTransfer.getData("cardIdx");
    const cardlistInsIdx = e.dataTransfer.getData("cardListIdx");
    let insIdx = updatedState.findIndex(
      (listObj) => listObj.id === cardlist.id
    );
    insIdx = insIdx === -1 ? 0 : insIdx;
    updatedState[insIdx].cards.unshift(
      updatedState[cardlistInsIdx].cards[cardInsIdx]
    );

    updatedState[cardlistInsIdx].cards.splice(cardInsIdx, 1);
    dispatch({ type: "moveTask", value: updatedState });
  };

  return (
    <div
      className="card-list"
      onDragOver={(e) => onDragOver(e)}
      onDrop={(e) => onDrop(e, cardlist)}
    >
      <input
        className="card-list-name"
        onChange={handleListTitleChange}
        placeholder="card list name"
        value={title}
      />
      <button className="listadd-btn" onClick={handleListRemove}>
        Remove List
      </button>
      <span className="card-number">
        {updatedState[cardlistIdx].cards.length}
      </span>
      <div className="card-list-container">
        {cards.map((card, cardIdx, arr) => (
          <TaskCard
            key={card.id}
            card={card}
            cardIdx={cardIdx}
            cardlistIdx={cardlistIdx}
          />
        ))}
      </div>
      <button className="card-add-btn" onClick={handleCardAdd}>
        +
      </button>
    </div>
  );
};
