import "./App.css";
import { HashRouter as Router } from "react-router-dom";
import Header from "./Components/UI/Header/Header";
import { AppRoutes } from "./Components/AppRoutes";
import { useGetUser } from "@hooks";
import { createContext } from "react";

export const UserContext: any = createContext(useGetUser());
function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <AppRoutes />
      </div>
    </Router>
  );
}

export default App;
