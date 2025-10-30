import React, {  useState } from "react"

export default function Testes() {

  const [QuantidadeDeNomes, setQuantidadeDeNomes] = useState<number>(0);
  const [nomes, setNomes] = useState<string[]>([])
  const [nomeActual, setNomeActual] = useState<string>('')

   const nuevoValor= (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuantidadeDeNomes(Number(e.target.value))
    setNomes([])
   } 

   const handleNomeChange= (e: React.ChangeEvent<HTMLInputElement>) => {
    setNomeActual(e.target.value)
   }

   const handleAddNome = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();


    if (nomeActual.trim() === "") return
    if( nomes.length < QuantidadeDeNomes) {
      setNomes([...nomes,nomeActual.trim()])
      setNomeActual("")
    }
   }

   const [tema,setTema] = useState(false)
  const temaNovo = tema ? "" : "hidden"

   const finalizar = () => {
    setTema(!tema)
   }
   

  return (
  <div className="flex justify-center items-center h-screen flex-col gap-5">
    <div className="flex gap-5 ">
      <label> quantidade de nomes: </label>
      <input 
      value={QuantidadeDeNomes}
      onChange={nuevoValor}  
      className="outline-dashed"
      type="text" />
      <button  className="border-red-400 bg-red-400">ok</button>
      </div>
    <div className="flex gap-5">
      <label> nomes: </label>
      <input value={nomeActual} onChange={handleNomeChange} className="outline-dashed" type="text" />
      <button onClick={handleAddNome} className="border-red-400 bg-red-400 ">ok</button>
      </div>
    <div className="flex gap-5">
      <p>
        Nombres cadastrados:
        <strong className={`${temaNovo}`}>{`os nomes sao :${nomes}`}</strong>

      </p>
      
      <button onClick={finalizar}  className="border-red-400 bg-red-400 disabled">Finalizar</button>
      </div>
  </div>
)
}