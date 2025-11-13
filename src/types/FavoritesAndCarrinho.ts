import type React from "react";

 export interface Favorites {
  favoritos: number[];
  setFavoritos: React.Dispatch<React.SetStateAction<number[]>>;
  carrinho: number[];
  setCarrinho: React.Dispatch<React.SetStateAction<number[]>>;
  total: number,
  setTotal: React.Dispatch<React.SetStateAction<number>>,
  totalMasculino: number,
  setTotalMasculino: React.Dispatch<React.SetStateAction<number>>
  totalFeminino: number,
  setTotalFeminino: React.Dispatch<React.SetStateAction<number>>
  totalKids: number,
  setTotalKids: React.Dispatch<React.SetStateAction<number>>
}

 export interface Carrinho {
  carrinho: number[]
  setCarrinho: React.Dispatch<React.SetStateAction<number[]>>;
  favoritos: number[];
  setFavoritos: React.Dispatch<React.SetStateAction<number[]>>
  total: number,
  setTotal: React.Dispatch<React.SetStateAction<number>>,
  totalMasculino: number,
  setTotalMasculino: React.Dispatch<React.SetStateAction<number>>
  totalFeminino: number,
  setTotalFeminino: React.Dispatch<React.SetStateAction<number>>
  totalKids: number,
  setTotalKids: React.Dispatch<React.SetStateAction<number>>
}