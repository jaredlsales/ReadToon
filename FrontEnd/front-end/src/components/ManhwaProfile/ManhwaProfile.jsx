import React from "react";
import { Bookmark, Star } from "lucide-react";

const ManhwaProfile = ({ manhwa }) => {
  // Se o pai ainda não passou os dados, não mostramos o erro, apenas um estado de espera
  if (!manhwa)
    return (
      <div className="p-10 text-zinc-500">Carregando dados do servidor...</div>
    );

  const genres = manhwa.genero ? manhwa.genero.split(",") : [];

  return (
    <div className="z-10 grid grid-cols-12 gap-4 pt-4 pl-4 pr-4 pb-12 font-sans antialiased">
      {/* Coluna da Esquerda */}
      <div className="relative col-span-full sm:col-span-3 space-y-3 px-6 sm:px-0">
        <img
          alt={manhwa.titulo}
          className="rounded mx-auto md:mx-0 w-[200px] h-[300px] object-cover shadow-2xl border border-zinc-800"
          src={`http://localhost:3333/files/${manhwa.capa_url}`}
        />

        <div className="space-y-1.5">
          {/* Usar no futuro */}
          {/*<button className="w-full bg-purple-600 hover:bg-purple-700 text-white flex items-center justify-center rounded-md py-2.5 transition-all font-medium text-[13px]">
            <Bookmark className="w-4 h-4 mr-2" />
            Bookmark
          </button>*/}

          {/* Usar no futuro */}
          {/*<p className="text-[#A2A2A2] text-[12px] text-center">Followed by 83,366 people</p>*/}

          <div className="bg-[#343434] p-1.5 w-full rounded-sm flex justify-between items-center">
            <div className="flex items-center gap-0.5">
              {[1, 2, 3, 4].map((i) => (
                <Star
                  key={i}
                  className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400"
                />
              ))}
              <span className="ml-1 text-xs text-white font-bold">9.0</span>
            </div>
            {/* Usar no futuro */}
            {/*<button className="bg-purple-600 text-white text-[10px] px-2 py-0.5 rounded">Rate</button>*/}
          </div>

          <div className="flex flex-row sm:flex-col gap-2">
            <div className="bg-[#343434] px-3 py-2 flex justify-between rounded-sm w-full">
              <span className="text-[12px] text-[#A2A2A2]">Status</span>
              <span className="text-[12px] text-white">Ongoing</span>
            </div>
            <div className="bg-[#343434] px-3 py-2 flex justify-between rounded-sm w-full">
              <span className="text-[12px] text-[#A2A2A2]">Type</span>
              <span className="text-[12px] text-white">Manhwa</span>
            </div>
          </div>
        </div>
      </div>

      {/* Coluna da Direita */}
      <div className="col-span-12 sm:col-span-9 space-y-5">
        <h1 className="text-2xl font-bold text-white uppercase tracking-tight text-center sm:text-left">
          {manhwa.titulo}
        </h1>

        {/* Usar no futuro */}
        {/*<div className="flex items-center justify-center sm:justify-start flex-wrap gap-2">
          <button className="bg-[#2f477b] px-3 py-1 rounded-sm text-[10px] font-bold text-white uppercase">Facebook</button>
          <button className="bg-[#1781c3] px-3 py-1 rounded-sm text-[10px] font-bold text-white uppercase">Twitter</button>
          <button className="bg-green-500 px-3 py-1 rounded-sm text-[10px] font-bold text-white uppercase">WhatsApp</button>
        </div>*/}

        <div className="space-y-2 border-t border-zinc-800 pt-4">
          <h3 className="text-[#D9D9D9] font-bold text-sm uppercase italic">
            Synopsis {manhwa.titulo}
          </h3>
          <p className="text-sm text-[#A2A2A2] leading-relaxed italic">
            {manhwa.descricao}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-zinc-800 pt-4 mt-4">
          <div className="flex flex-col">
            <span className="text-[#D9D9D9] text-xs font-bold uppercase">
              Author
            </span>
            <span className="text-[#A2A2A2] text-sm">{manhwa.autor}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[#D9D9D9] text-xs font-bold uppercase">
              Updated On
            </span>
            <span className="text-[#A2A2A2] text-sm">
              {manhwa.data_alteracao
                ? new Date(manhwa.data_alteracao).toLocaleDateString("en-US", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })
                : "Data não disponível"}
            </span>
          </div>
        </div>

        <div className="space-y-2 pt-4">
          <span className="text-[#D9D9D9] text-xs font-bold uppercase">
            Genres
          </span>
          <div className="flex flex-wrap gap-2">
            {genres.map((g, i) => (
              <span
                key={i}
                className="bg-[#343434] text-white text-[11px] px-3 py-1 rounded-[3px]"
              >
                {g.trim()}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManhwaProfile;
