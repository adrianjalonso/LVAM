import { Link } from "react-router-dom";

export default function Header ({className, onSearchChange, isFavorited, disable}: {className: string,isFavorited?: number, disable?: boolean, onSearchChange?: (value: string) => void}){

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange?.(e.target.value);}

  const divIconClass = "flex justify-center items-center  p-1 bg-light h-10 w-10 rounded-md hover:bg-primary/20 cursor-pointer transition-colors duration-300"

  const desactivar = disable ? "hidden" : ""

  return(
  <header className={className}>
  <h1 className="text-3xl font-extralight">Logo</h1>
  <div className={`flex-1 px-8 `}>
    <label className="flex flex-col w-full !h-10">
    <div className="flex w-full flex-1 items-stretch rounded-lg h-full">
    <div className={`text-gray-500 flex border-none bg-light items-center justify-center pl-4 rounded-l-lg border-r-0 ${desactivar}`}>
      <i className="material-symbols-outlined">search</i>
    </div>
      <input onChange={handleSearch} className={`duration-1000 flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg  focus:outline-0 focus:ring-2 focus:ring-primary/50 border-none bg-light  h-full placeholder:text-gray-500 px-4 rounded-l-none border-l-0 pl-2 text-base font-normal leading-normal ${desactivar}`} placeholder="O que você está procurando?" />
      </div>
    </label>
  </div>
  <div className="flex gap-3">
    <div className={divIconClass}><i className="text-2xl material-symbols-outlined ">person</i></div>
    <div className={divIconClass}>
      
      <i className=" text-2xl material-symbols-outlined">shopping_cart</i>
      </div>
    <Link to="/Favoritos" className={`${divIconClass} relative`}>
      <span className="flex justify-center items-center absolute text-white text-center text-xs font-semibold rounded-full top-1 left-6 bg-primary size-[14px]"><p>{isFavorited}</p></span>
      <i className="text-2xl material-symbols-outlined">favorite</i></Link>
    <Link to="/" className={divIconClass}><i className=" text-2xl material-symbols-outlined">logout</i></Link>
  </div>
  </header>)
}