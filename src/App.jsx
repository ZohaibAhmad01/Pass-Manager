import './App.css'
import Manager from './Components/Manager'
import Navabar from './Components/Navabar'
import Footer from './Components/Footer'

function App() {

  return (
    <>
     <div>
      <Navabar/>
      <div className="min-h-[80vh] ">
        <Manager/>
      </div>
      <Footer/>
     </div>
    </>
  )
}

export default App
