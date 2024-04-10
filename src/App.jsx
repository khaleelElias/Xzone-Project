
import { About_Us, Betting, Footer, Loader, Navbar, Welcome, Team } from './components'

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
      <About_Us />
      <Team/>
    </div>
    </>
  );
}

export default App
