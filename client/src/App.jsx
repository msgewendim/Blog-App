import { Outlet } from "react-router-dom";
import Footer from "./components/Footer"
import Header from "./components/Header"


function App() {
  return (
    <div className="app">
      <div className="container">
        <Header/>
        <Outlet />
        <Footer />
      </div>
    </div>
  )
}

export default App; 