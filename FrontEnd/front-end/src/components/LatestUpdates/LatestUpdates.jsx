import React, { useEffect, useState } from "react";
import apiLocal from "@/api/apiLocal";
import { Timer, CircleX, Play } from "lucide-react";
import { Link } from "react-router-dom";

export default function LatestUpdates() {
  const [manhwas, setManhwas] = useState([]);
  const [capitulos, setCapitulos] = useState([]);
  const [carregando, setCarregando] = useState(true);

  // Funções auxiliares para gerar os caminhos das rotas
  const getSlug = (text) => text.toLowerCase().replace(/\s+/g, "-");

  const getManhwaPath = (name) => {
    const slug = getSlug(name);
    if (name === "Nano Machine") return `/Manhwa/NanoMachine/${slug}`;
    if (name === "Infinite Mage") return `/Manhwa/InfiniteMage/${slug}`;
    if (name === "Star-Embracing Swordmaster")
      return `/Manhwa/StarEmbracingSwordmaster/${slug}`;
    if (name === "Revenge of the Iron-Blooded Sword Hound")
      return `/Manhwa/RevengeOfTheIron/${slug}`;
    if (name === "The Regressed Mercenary's Machinations")
      return `/Manhwa/TheRegressedMercenary/${slug}`;
    return `/Manhwa/${slug}`;
  };

  const getReadPath = (name, chapterNum) => {
    const slug = getSlug(name);
    if (name === "Nano Machine")
      return `/Read/NanoMachineChapter/${slug}/${chapterNum}`;
    if (name === "Infinite Mage")
      return `/Read/InfiniteMageChapter/${slug}/${chapterNum}`;
    if (name === "Star-Embracing Swordmaster")
      return `/Read/StarEnbracingSwordmasterChapter/${slug}/${chapterNum}`;
    if (name === "Revenge of the Iron-Blooded Sword Hound")
      return `/Read/RevendeOfTheIronChapter/${slug}/${chapterNum}`;
    if (name === "The Regressed Mercenary's Machinations")
      return `/Read/TheRegressedMercenaryChapter/${slug}/${chapterNum}`;
    return `/Read/${slug}/${chapterNum}`;
  };

  useEffect(() => {
    async function carregarDados() {
      try {
        const [resManhwa, resCapitulos] = await Promise.all([
          apiLocal.get("/VisualizarManhwa"),
          apiLocal.get("/VisualizarCapitulos"),
        ]);
        setManhwas(resManhwa.data);
        setCapitulos(resCapitulos.data);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      } finally {
        setCarregando(false);
      }
    }
    carregarDados();
  }, []);

  if (carregando) return <div className="text-white p-10">Carregando...</div>;

  return (
    <div className="bg-[#222222] text-white font-sans rounded-[3px] border border-[#312f40]">
      <div className="flex justify-between items-center p-4 border-b border-[#312f40]">
        <h3 className="text-[15px] font-semibold flex items-center gap-2">
          Latest Updates
        </h3>
        <button className="text-[10px] bg-purple-600 px-2 py-1 rounded uppercase font-bold hover:bg-purple-700 transition-colors">
          View all
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2">
        {manhwas.map((m) => {
          const capitulosDesteManhwa = capitulos
            .filter((cap) => cap.idManhwa === m.id)
            .sort((a, b) => b.numero - a.numero)
            .slice(0, 3);

          const manhwaRoute = getManhwaPath(m.titulo);

          return (
            <div
              key={m.id}
              className="p-4 border-b border-[#312f40] flex gap-4 group"
            >
              {/* Capa com Link para a página da obra */}
              <Link to={manhwaRoute}>
                <img
                  src={`http://localhost:3333/files/${encodeURI(m.capa_url)}`}
                  className="w-24 h-32 object-cover rounded shadow-md transition-transform group-hover:scale-105"
                  alt={m.titulo}
                />
              </Link>

              <div className="flex-1 min-w-0">
                {/* Título com Link para a página da obra */}
                <Link to={manhwaRoute}>
                  <h4 className="font-medium text-[15px] hover:text-purple-500 cursor-pointer truncate mb-2 transition-colors">
                    {m.titulo}
                  </h4>
                </Link>

                <div className="space-y-2">
                  {capitulosDesteManhwa.map((cap) => (
                    <div
                      key={cap.id}
                      className="flex justify-between items-center text-sm text-[#999]"
                    >
                      {/* Link DIRETO para o capítulo específico */}
                      <Link
                        to={getReadPath(m.titulo, cap.numero)}
                        className="flex items-center hover:text-white truncate transition-colors"
                      >
                        <Play className="w-3 h-3 text-[#9d4942] mr-2 fill-current" />
                        Chapter {cap.numero}
                      </Link>

                      <span className="text-[11px] text-[#555] flex items-center gap-1 ml-2">
                        <Timer className="w-3 h-3 text-purple-500" />
                        {(() => {
                          // Usamos a data do MANHWA (m), pois o capítulo não tem data no JSON
                          const rawDate = m.data_alteracao || m.data_criacao;

                          if (rawDate) {
                            const dateObj = new Date(rawDate);
                            if (!isNaN(dateObj.getTime())) {
                              return dateObj.toLocaleDateString("en-US", {
                                month: "short",
                                day: "2-digit",
                                year: "numeric",
                              });
                            }
                          }
                          return "Recent";
                        })()}
                      </span>
                    </div>
                  ))}

                  {capitulosDesteManhwa.length === 0 && (
                    <p className="text-[11px] text-zinc-600 italic">
                      Nenhum capítulo ainda
                    </p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
