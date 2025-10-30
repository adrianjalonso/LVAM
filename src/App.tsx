import { Route, Routes } from "react-router-dom"
import Login from "./Login"
import PaginaPrincipal from "./PaginaPrincipal"
import Favoritos from "./Favoritos"
import Header from "./Header"
import Footer from "./Footer"
import { useState } from "react"


export default function App () {

  const [favoritos, setFavoritos] = useState<number[]>([]);
  const [busca, setBusca] = useState("")



  return (
    <div className="h-full w-full flex justify-center flex-col ">
      <Header isFavorited={favoritos.length} 
      onSearchChange={setBusca}
      className={
          "w-full left-0 top-0 fixed h-14 bg-white border-b flex justify-between items-center px-4 md:px-10 py-4 z-10"
        } />
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/PaginaPrincipal" element={<PaginaPrincipal busca={busca} setBusca={setBusca} favoritos={favoritos} setFavoritos={setFavoritos}/>} />
      <Route path="/Favoritos" element={<Favoritos />} />
    </Routes>
    <Footer className={
          "w-full justify-center flex left-0 bottom-0 fixed h-8 bg-primary"
        } />
    </div>
  )
}