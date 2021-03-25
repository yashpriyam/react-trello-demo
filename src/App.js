import { AppStateContextProvider } from "./components/appState/appState.context";
import HomePage from "./components/homepage/homepage";
import "./styles.css";

export default function App() {
  return (
    <AppStateContextProvider>
      <HomePage />
    </AppStateContextProvider>
  );
}
