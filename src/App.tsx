import "./App.css";
import { Route, Routes } from "react-router";
import BettingPage from "./Pages/BettingPage";
import HomePage from "./Pages/HomePage";
import AdminPage from "./Pages/AdminPanel";
function App() {
  return (
    <>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="/pixslip" element={<BettingPage />} />
        <Route path="/admin_panel" element={<AdminPage />} />
      </Routes>
    </>
  );
}

export default App;
