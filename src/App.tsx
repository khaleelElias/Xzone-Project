import "./App.css";
import { Route, Routes } from "react-router";
import BettingPage from "./Pages/BettingPage/Betting";
import HomePage from "./Pages/HomePage/HomePage";
function App() {
  return (
    <>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="/pixslip" element={<BettingPage />} />
      </Routes>
    </>
  );
}

export default App;
