
import { About_Us, Betting, Footer, Loader, Navbar, Welcome, Team } from './components'

import './App.css'

function App() {
  
  return (
    <>
    
    <div className='min-h-screen'>
      <h1 className='text-6x1 font-bold '>Khaleel</h1>
      <div className='gradiant-bg-welcome'>
        <Navbar />
      </div>
      <Welcome />
      <Betting />
      <About_Us />
      <Team/>
    </div>
    </>
  );
}

export default App
