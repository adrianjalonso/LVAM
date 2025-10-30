import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import Header from "./Header";
import Footer from "./Footer";
import './index.css';


const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_ANON_KEY)

export default function PaginaPrincipal() {

  interface Perfume {
  id: number,
  name_perfume: string,
  price: number,
  foto: string,
  genero: string,
 }

  const [perfumes, setPerfumes] = useState<Perfume[]>([])
  const [busca, setBusca] = useState("");

 useEffect (()=>{
  getPerfumes()
  obterTotais()
 }, [])

 const [total,setTotal] = useState(0)
 const [totalMasculino, setTotalMasculino] = useState(0);
 const [totalFeminino, setTotalFeminino] = useState(0)
 

 async function obterTotais() {
  const {data} = await supabase.from("perfumes").select("genero") as {data: Perfume[] | null} 
  if (data){
     setTotalMasculino(data.filter(perfume => perfume.genero === "masculino").length)
     setTotalFeminino(data.filter(perfume => perfume.genero === "feminino").length)
     setTotal(data.length)
  }
 }

  async function getPerfumes() {
  const {data} = await supabase.from("perfumes").select() as {data: Perfume[]| null};
  if(data)
    setPerfumes(data)
 }


 const itensFiltrados = perfumes.filter((item) => {
  const nomeIncluiBusca = item.name_perfume.toLowerCase().includes(busca.toLowerCase());
  return nomeIncluiBusca;
});


  return (
  <div className="h-screen w-screen flex justify-center items-center flex-col  bg-white">
    <Header onSearchChange={setBusca} className={"w-full left-0 top-0 fixed h-14 bg-white border-b flex justify-between items-center px-4 md:px-10 py-4 z-10"} />
    <div className="flex flex-row pt-56 pb-8">
    
      <main className=" border border-dashed border-red-700 flex-1 flex flex-row items-center overflow-y-auto bg-light">
        <aside className="bg-light pt-14 pb-4 flex w-52 h-full overflow-y-auto border-dashed border-red-400 justify-center items-start p-5 rounded-lg">
      <section className="bg-white w-full h-full rounded-lg shadow-md">
        <h1 className="font-semibold p-2 ">{`Categorias (${total})`}</h1>
        <p className="p-2">Masculino <span className="text-xs">{`(${totalMasculino})`}</span></p>
        <p className="p-2">Feminino <span className="text-xs">{`(${totalFeminino})`}</span></p>
        <p className="p-2">Kids</p>
      </section>
      
      </aside>
          <section className="grid md:grid-cols-[repeat(3,minmax(200px,1fr))] lg:grid-cols-[repeat(4,minmax(200px,1fr))] grid-cols-[repeat(2,minmax(150px,1fr))] gap-6 p-4 w-full md:w-5/6 lg:w-4/5 pt-14 pb-4">
            {itensFiltrados.map((perfume)=>(
              

              <figure className="flex flex-col gap-3 pb-3 rounded-lg overflow-hidden shadow-md bg-white transform hover:-translate-y-2 transition-transform duration-300 pt-2" key={perfume.id}>
                <div className="w-full bg-center bg-no-repeat bg-cover relative"><img className=" w-full h-full object-cover" src={`./src/imagens/${perfume.name_perfume}.png`} alt="foto" />
                </div>
                <div className="p-3">
                  <h1 className="text-lg font-bold leading-normal">{perfume.name_perfume}</h1>
                  <p className="text-base font-medium text-primary">{`R$ ${perfume.price.toFixed(2)}`}</p>
                  <button className="w-full mt-2 text-sm font-bold text-white bg-primary rounded-lg py-2.5 hover:bg-primary/90 transition-colors">Adicionar ao Carrinho</button>
                </div>
              </figure>
            ))}
          </section>
        </main>
    </div>
    <Footer className={"w-full justify-center flex left-0 bottom-0 fixed h-8 bg-primary"} />
  </div>
  );
}
