import { useContext } from "react";
import { AppStateContext } from "../appState/appState.context";
import "./taskCard.css";

export const TaskCard = ({ card, cardIdx, cardlistIdx }) => {
  const { title, description } = card;
  const { stateAndDispatch } = useContext(AppStateContext);
  const [appState, dispatch] = stateAndDispatch;
  const updatedState = [...appState];
  const handleCardRemove = () => {
    updatedState[cardlistIdx].cards.splice(cardIdx, 1);
    dispatch({ type: "removeCard", value: updatedState });
  };

  const handleCardInput = (e) => {
    updatedState[cardlistIdx].cards[cardIdx][e.target.name] = e.target.value;
    dispatch({ type: "cardInput", value: updatedState });
  };

  const onDragStart = (e, taskObj) => {
    e.dataTransfer.setData("obj", taskObj.id);
    e.dataTransfer.setData("cardIdx", cardIdx);
    e.dataTransfer.setData("cardListIdx", cardlistIdx);
  };
  return (
    <div
      className="task-card"
      onDragStart={(e) => onDragStart(e, card)}
      draggable
    >
      <button className="card-remove-btn" onClick={handleCardRemove}>
        X
      </button>
      <input
        name="title"
        onChange={handleCardInput}
        className="task-title"
        value={title}
        placeholder="title"
      />
      <input
        name="description"
        onChange={handleCardInput}
        className="task-description"
        value={description}
        placeholder="description"
      />
    </div>
  );
};
