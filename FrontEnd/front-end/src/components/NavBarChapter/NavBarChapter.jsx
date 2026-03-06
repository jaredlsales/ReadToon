import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";

const NavBarChapter = ({ capitulos, capituloAtual, slug }) => {
  const navigate = useNavigate();

  // Garante que os capítulos existam antes de procurar o índice
  const listaCapitulos = capitulos || [];
  const indexAtual = listaCapitulos.findIndex(c => c.numero === parseInt(capituloAtual));
  
  // Lógica de navegação baseada no array ordenado (do maior para o menor)
  const proxCap = listaCapitulos[indexAtual - 1]; // Capítulo com número maior
  const prevCap = listaCapitulos[indexAtual + 1]; // Capítulo com número menor

  return (
    <div className="flex flex-col md:flex-row flex-wrap gap-y-4 justify-between items-center w-full bg-[#111] p-4 rounded-md border border-white/5">
      
      {/* Seletores de Capítulo e Qualidade */}
      <div className="flex flex-wrap gap-2 sm:flex-nowrap w-full max-w-[600px]">
        
        {/* Dropdown de Capítulos */}
        <div className="relative flex w-full sm:max-w-60">
          <select 
            className="w-full bg-[#222] text-[#9B9B9B] text-[13px] px-4 py-2 rounded-md border border-white/10 appearance-none cursor-pointer focus:border-[#8E3FDD] outline-none"
            value={capituloAtual}
            onChange={(e) => navigate(`/read/${slug}/${e.target.value}`)}
          >
            {listaCapitulos.map((cap) => (
              <option key={cap.id} value={cap.numero}>
                Chapter {cap.numero}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-2.5 text-[#9B9B9B] w-4 pointer-events-none" />
        </div>

        {/* Dropdown de Qualidade - CORRIGIDO AQUI */}
        <div className="w-full relative sm:max-w-60">
          <select className="w-full bg-[#222] text-[#9B9B9B] text-[13px] px-4 py-2 rounded-md border border-white/10 appearance-none cursor-pointer focus:border-[#8E3FDD] outline-none">
            <option>Default Quality</option>
            <option>High Quality</option>
          </select> 
          <ChevronDown className="absolute right-3 top-2.5 text-[#9B9B9B] w-4 pointer-events-none" />
        </div>
      </div>

      {/* Botões Prev e Next */}
      <div className="flex items-center gap-x-3 flex-row w-full sm:w-auto justify-between sm:justify-end">
        
        {/* Botão Anterior (Prev) */}
        {prevCap ? (
          <Link 
            to={`/read/${slug}/${prevCap.numero}`}
            className="flex items-center justify-center bg-[#222] hover:bg-[#333] pl-3 pr-4 py-2 rounded-full transition-all"
          >
            <ChevronLeft className="text-white w-4 h-4" />
            <span className="text-white text-sm ml-1">Prev</span>
          </Link>
        ) : (
          <div className="flex items-center justify-center bg-[#222]/50 pl-3 pr-4 py-2 rounded-full cursor-not-allowed opacity-50">
            <ChevronLeft className="text-[#555] w-4 h-4" />
            <span className="text-[#555] text-sm ml-1">Prev</span>
          </div>
        )}

        {/* Botão Próximo (Next) */}
        {proxCap ? (
          <Link 
            to={`/read/${slug}/${proxCap.numero}`}
            className="flex items-center justify-center bg-[#8E3FDD] hover:brightness-110 pl-4 pr-3 py-2 rounded-full transition-all"
          >
            <span className="text-white text-sm mr-1">Next</span>
            <ChevronRight className="text-white w-4 h-4" />
          </Link>
        ) : (
          <div className="flex items-center justify-center bg-[#222]/50 pl-4 pr-3 py-2 rounded-full cursor-not-allowed opacity-50">
            <span className="text-[#555] text-sm mr-1">Next</span>
            <ChevronRight className="text-[#555] w-4 h-4" />
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBarChapter;