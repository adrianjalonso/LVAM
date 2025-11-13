 export interface Pages {
  carrinho: number[];
  setCarrinho: React.Dispatch<React.SetStateAction<number[]>>
  favoritos: number[];
  setFavoritos: React.Dispatch<React.SetStateAction<number[]>>;
  busca: string;
  setBusca: React.Dispatch<React.SetStateAction<string>>;
  total: number,
  setTotal: React.Dispatch<React.SetStateAction<number>>,
  totalMasculino: number,
  setTotalMasculino: React.Dispatch<React.SetStateAction<number>>
  totalFeminino: number,
  setTotalFeminino: React.Dispatch<React.SetStateAction<number>>
  totalKids: number,
  setTotalKids: React.Dispatch<React.SetStateAction<number>>
}