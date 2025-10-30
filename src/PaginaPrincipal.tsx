import React, { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import "./index.css";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

interface PaginaPrincipalProps {
  favoritos: number[];
  setFavoritos: React.Dispatch<React.SetStateAction<number[]>>;
  busca: string;
  setBusca: React.Dispatch<React.SetStateAction<string>>;
}

export default function PaginaPrincipal({
  busca,
  setBusca,
  favoritos,
  setFavoritos,
}: PaginaPrincipalProps) {
  interface Perfume {
    id: number;
    name_perfume: string;
    price: number;
    foto: string;
    genero: string;
  }

  const [perfumes, setPerfumes] = useState<Perfume[]>([]);
  const [perfumesFiltrados, setPerfumesFiltrados] = useState<Perfume[]>([]);
  const [generoSelecionado, setGeneroSelecionado] = useState<string>("todos");
  const [total, setTotal] = useState(0);
  const [totalMasculino, setTotalMasculino] = useState(0);
  const [totalFeminino, setTotalFeminino] = useState(0);
  const [totalKids, setTotalKids] = useState(0);

  useEffect(() => {
    getPerfumes();
    obterTotais();
  }, []);

  async function obterTotais() {
    const { data } = (await supabase.from("perfumes").select("genero")) as {
      data: Perfume[] | null;
    };
    if (data) {
      setTotalMasculino(
        data.filter((perfume) => perfume.genero === "masculino").length
      );
      setTotalFeminino(
        data.filter((perfume) => perfume.genero === "feminino").length
      );
      setTotalKids(data.filter((perf) => perf.genero === "kids").length);
      setTotal(data.length);
    }
  }

  async function getPerfumes() {
    const { data } = (await supabase.from("perfumes").select()) as {
      data: Perfume[] | null;
    };
    if (data) setPerfumes(data), setPerfumesFiltrados(data);
  }

  useEffect(() => {
    let resultado = perfumes;
    if (generoSelecionado !== "todos") {
      resultado = resultado.filter(
        (perfume) => perfume.genero === generoSelecionado
      );
    }

    if (busca.trim() !== "") {
      resultado = resultado.filter((perfume) =>
        perfume.name_perfume.toLowerCase().includes(busca.toLowerCase())
      );
    }
    setPerfumesFiltrados(resultado);
  }, [busca, generoSelecionado, perfumes]);

  function filtrarPorGenero(genero: string) {
    setGeneroSelecionado(genero);
  }

  function toggleFavoritos(id: number) {
    setFavoritos((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
    );
  }

  return (
    <div className="h-screen w-screen flex justify-start items-center flex-col  bg-white">
      <div className="flex flex-col items-start justify-center h-screen pt-4 pb-8  w-screen">
        <main className="  flex-1 flex flex-row w-screen items-start overflow-y-auto bg-light">
          <aside className="bg-light pt-14 pb-4  w-52 h-full overflow-y-auto border-dashed border-red-400 justify-center items-start p-5 rounded-lg lg:flex md:flex hidden">
            <section className="bg-white w-full rounded-lg shadow-md h-max">
              <h1
                onClick={() => filtrarPorGenero("todos")}
                className="font-semibold p-2 "
              >{`TODOS (${total})`}</h1>
              <p onClick={() => filtrarPorGenero("masculino")} className="p-2">
                Masculino{" "}
                <span className="text-xs">{`(${totalMasculino})`}</span>
              </p>
              <p onClick={() => filtrarPorGenero("feminino")} className="p-2">
                Feminino <span className="text-xs">{`(${totalFeminino})`}</span>
              </p>
              <p onClick={() => filtrarPorGenero("kids")} className="p-2">
                Kids<span className="text-xs">{`(${totalKids})`}</span>
              </p>
            </section>
          </aside>
          <section className="grid md:grid-cols-[repeat(3,minmax(200px,1fr))] lg:grid-cols-[repeat(4,minmax(200px,1fr))] grid-cols-[repeat(2,minmax(150px,1fr))] gap-6 p-4 w-full md:w-5/6 lg:w-4/5 pt-14 pb-4 ">
            {perfumesFiltrados.map((perfume) => {
              const isFavorited = favoritos.includes(perfume.id);
              const clase = isFavorited ? "favorite" : "notfavorite";
              return (
                <figure
                  className="flex flex-col gap-3 pb-3 rounded-lg overflow-hidden shadow-md bg-white transform hover:-translate-y-2 transition-transform duration-300 pt-2"
                  key={perfume.id}
                >
                  <div className="w-full bg-center bg-no-repeat bg-cover relative">
                    <img
                      className=" w-full h-full object-cover"
                      src={`./src/imagens/${perfume.name_perfume}.png`}
                      alt="foto"
                    />
                  </div>
                  <div className="p-3">
                    <div className="flex justify-between items-center">
                      <div>
                        <h1 className="text-lg font-bold leading-normal">
                          {perfume.name_perfume}
                        </h1>
                        <p className="text-base font-medium text-primary">{`R$ ${perfume.price.toFixed(
                          2
                        )}`}</p>
                      </div>
                      <div
                        onClick={() => toggleFavoritos(perfume.id)}
                        className="flex justify-center items-center  p-1 bg-light size-8 rounded-md hover:bg-primary/20 cursor-pointer transition-colors duration-300 mr-1"
                      >
                        <img src={`./src/imagens/${clase}.svg`} alt="" />
                      </div>
                    </div>
                    <button className="w-full mt-2 text-sm font-bold text-white bg-primary rounded-lg py-2.5 hover:bg-primary/90 transition-colors">
                      Adicionar ao Carrinho
                    </button>
                  </div>
                </figure>
              );
            })}
          </section>
        </main>
      </div>
    </div>
  );
}
