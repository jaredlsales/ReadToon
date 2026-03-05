import React, { useEffect, useState } from "react";
import apiLocal from "@/api/apiLocal";
import { Timer, CircleX, Play } from "lucide-react";

export default function LatestUpdates() {
  const [manhwas, setManhwas] = useState([]);
  const [capitulos, setCapitulos] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function carregarDados() {
      try {
        // Fazemos as duas chamadas em paralelo para ganhar performance
        const [resManhwa, resCapitulos] = await Promise.all([
          apiLocal.get("/VisualizarManhwa"),
          apiLocal.get("/VisualizarCapitulos")
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
    <div className="bg-[#222222] text-white font-sans">
      {/* Header idêntico ao que você enviou */}
      <div className="flex justify-between items-center p-4 border-b border-[#312f40]">
        <h3 className="text-[15px] font-semibold flex items-center gap-2">
          Latest Updates 
        </h3>
        <button className="text-[10px] bg-purple-600 px-2 py-1 rounded uppercase font-bold">View all</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2">
        {manhwas.map((m) => {
          // FILTRO MANUAL NO FRONT-END:
          // Pegamos apenas os capítulos onde o idManhwa é igual ao id deste Manhwa
          const capitulosDesteManhwa = capitulos
            .filter((cap) => cap.idManhwa === m.id)
            .sort((a, b) => b.numero - a.numero) // Ordena do maior para o menor
            .slice(0, 3); // Pega apenas os 3 últimos

          return (
            <div key={m.id} className="p-4 border-b border-[#312f40] flex gap-4">
              <img 
                src={`http://localhost:3333/files/${m.capa_url}`} 
                className="w-24 h-32 object-cover rounded shadow-md"
                alt={m.titulo}
              />

              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-[15px] hover:text-purple-500 cursor-pointer truncate mb-2">
                  {m.titulo}
                </h4>
                
                <div className="space-y-2">
                  {capitulosDesteManhwa.map((cap) => (
                    <div key={cap.id} className="flex justify-between items-center text-sm text-[#999]">
                      <a href={`/chapter/${cap.id}`} className="flex items-center hover:text-white truncate">
                        <Play className="w-3 h-3 text-[#9d4942] mr-2 fill-current" />
                        Chapter {cap.numero}
                      </a>
                      <span className="text-[11px] text-[#555] flex items-center gap-1 ml-2">
                        <Timer className="w-3 h-3 text-purple-500" />
                        {/* Formata a data do Prisma */}
                        {new Date(cap.data_criacao).toLocaleDateString('pt-BR')}
                      </span>
                    </div>
                  ))}

                  {capitulosDesteManhwa.length === 0 && (
                    <p className="text-[11px] text-zinc-600 italic">Nenhum capítulo ainda</p>
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