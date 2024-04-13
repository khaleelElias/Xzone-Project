import './App.css'
import { Route, Routes } from 'react-router';
import BettingPage from './Pages/BettingPage/Betting';
import HomePage from './Pages/HomePage/HomePage';
import Footer from './components/Footer';
function App() {
  
  return (
    <>
      <Routes>
          <Route index element={<HomePage />} />
          <Route path='/betting' element={<BettingPage />} />
        </Routes>
      <Footer />
    </>
  );
}

export default App