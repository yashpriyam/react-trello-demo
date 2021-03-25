import { createContext, useReducer } from "react";
import { appState, reducer } from "./appState.reducer";

export const AppStateContext = createContext();

export const AppStateContextProvider = ({ children }) => {
  const stateAndDispatch = useReducer(reducer, appState);

  return (
    <AppStateContext.Provider value={{ stateAndDispatch }}>
      {children}
    </AppStateContext.Provider>
  );
};
