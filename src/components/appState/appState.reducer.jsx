export const appState = JSON.parse(localStorage.getItem("userData"))
  ? JSON.parse(localStorage.getItem("userData")).state
  : [];

export const reducer = (state, action) => {
  switch (action.type) {
    case "addCard":
    case "removeCard":
    case "addList":
    case "removeList":
    case "moveTask":
    case "cardInput":
    case "addListTitle":
      localStorage.removeItem("userData");
      state = action.value;
      localStorage.setItem(
        "userData",
        JSON.stringify({
          state
        })
      );
      return state;
    default:
      return state;
  }
};
