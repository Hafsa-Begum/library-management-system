import { Outlet } from "react-router"
import Footer from "./features/home/Footer"
import Header from "./features/home/Header"

function App() {
  return (
    <>
    <Header/>
    <Outlet/>
    <Footer/>
    </>
  )
}

export default App