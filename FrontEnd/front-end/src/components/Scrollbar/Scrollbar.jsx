import React from "react";
import { Link } from "react-router-dom";

const Scrollbar = ({ capitulos, slug, manhwaTitle }) => {
  // Pegamos o primeiro e o último com segurança
  const primeiroCap =
    capitulos && capitulos.length > 0 ? capitulos[capitulos.length - 1] : null;
  const ultimoCap = capitulos && capitulos.length > 0 ? capitulos[0] : null;

  // Função para garantir que o link aponte para a rota de LEITURA correta
  const getReadPath = (chapterNum) => {
    if (!chapterNum) return "#";
    
    // Mapeamento baseado no título para bater com suas rotas do App.js
    if (manhwaTitle === "Nano Machine") return `/Read/NanoMachineChapter/${slug}/${chapterNum}`;
    if (manhwaTitle === "Infinite Mage") return `/Read/InfiniteMageChapter/${slug}/${chapterNum}`;
    if (manhwaTitle === "Star-Embracing Swordmaster") return `/Read/StarEnbracingSwordmasterChapter/${slug}/${chapterNum}`;
    if (manhwaTitle === "Revenge of the Iron-Blooded Sword Hound") return `/Read/RevendeOfTheIronChapter/${slug}/${chapterNum}`;
    if (manhwaTitle === "The Regressed Mercenary's Machinations") return `/Read/TheRegressedMercenaryChapter/${slug}/${chapterNum}`;
    
    // Fallback genérico caso precise
    return `/read/${slug}/${chapterNum}`;
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-2 px-1">
        <h2 className="text-xl font-bold border-l-4 border-[#8E3FDD] pl-3 text-white">
          Chapter <span className="text-[#8E3FDD] ml-1">{manhwaTitle || "Loading..."}</span>
        </h2>
      </div>

      {/* Botões de Destaque Superiores */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Card do Primeiro Capítulo */}
        <Link
          to={getReadPath(primeiroCap?.numero)}
          className="bg-[#8E3FDD] p-6 rounded-md text-center border border-white/5 shadow-lg hover:brightness-110 transition-all"
        >
          <span className="block text-xs uppercase text-white/70 font-bold mb-1 tracking-wider">
            First Chapter
          </span>
          <span className="text-2xl font-bold block ">
            Chapter {primeiroCap?.numero || "1"}
          </span>
        </Link>

        {/* Card do Último Capítulo (Latest) */}
        <Link
          to={getReadPath(ultimoCap?.numero)}
          className="bg-[#8E3FDD] p-6 rounded-md text-center border border-white/5 shadow-lg hover:brightness-110 transition-all"
        >
          <span className="block text-xs uppercase text-white/70 font-bold mb-1 tracking-wider">
            Latest Release
          </span>
          <span className="text-2xl font-bold block ">
            Chapter {ultimoCap?.numero || "---"}
          </span>
        </Link>
      </div>

      {/* Input de Busca */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search Chapter. Example: 25 or 178"
          className="w-full bg-[#1A1A1A] border border-white/10 rounded-md py-3 px-5 text-sm text-gray-400 focus:outline-none focus:border-[#8E3FDD] transition-all"
        />
      </div>

      {/* Lista de Capítulos com Scroll */}
      <div className="bg-[#1A1A1A] rounded-md border border-white/5 overflow-hidden shadow-2xl">
        <div className="max-h-[35rem] overflow-y-auto scrollbar-thin scrollbar-thumb-[#8E3FDD] scrollbar-track-transparent p-3 space-y-3">
          {capitulos && capitulos.length > 0 ? (
            capitulos.map((chapter) => (
              <Link
                key={chapter.id}
                to={getReadPath(chapter.numero)}
                className="group block bg-[#222] border border-white/5 rounded-md hover:bg-[#282828] transition-all relative overflow-hidden"
              >
                <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-[#8E3FDD] group-hover:w-[6px] transition-all"></div>
                <div className="py-4 px-6">
                  <span className="text-white font-bold text-sm tracking-wide">
                    Chapter {chapter.numero}
                  </span>
                </div>
              </Link>
            ))
          ) : (
            <div className="text-[#A2A2A2] text-sm text-center py-10 font-medium italic">
              Nenhum capítulo disponível no momento.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Scrollbar;
