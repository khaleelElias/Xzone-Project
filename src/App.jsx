
import { About_Us, Betting, Footer, Services, Navbar, Welcome, Team, SportsHighlights } from './components'

import './App.css'

function App() {
  
  return (
    <>
    
    <div className="min-h-screen">
    <div className="gradient-bg-welcome">
        <Navbar />
        <Welcome />
      </div>
      <Betting />
      <Services />
      <About_Us />
      <Team/>
      <SportsHighlights/>
      <Footer />
    </div>
    </>
  );
}

export default App
