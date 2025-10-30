import { Route, Routes } from "react-router-dom"
import Login from "./Login"
import PaginaPrincipal from "./PaginaPrincipal"




export default function App () {
  return (
    <div className="h-full w-full flex justify-center flex-col ">
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/PaginaPrincipal" element={<PaginaPrincipal />} />
    </Routes>
    </div>
  )
}