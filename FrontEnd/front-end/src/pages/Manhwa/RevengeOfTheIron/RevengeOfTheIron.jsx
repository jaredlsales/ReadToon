import { useEffect, useState } from "react";
import PopularSideBar from "@/components/PopularSideBar/PopularSideBar";
import TopBar from "@/components/TopBar/TopBar";
import ManhwaProfile from "../../../components/ManhwaProfile/ManhwaProfile";
import apiLocal from "@/api/apiLocal";
import Scrollbar from "@/components/Scrollbar/Scrollbar";

export default function RevengeOfTheIron() {
  const [manhwa, setManhwa] = useState(null);
  const [capitulos, setCapitulos] = useState([]); // Estado para armazenar os capítulos

  useEffect(() => {
    async function loadManhwa() {
      try {
        // Busca os dados do Manhwa
        const response = await apiLocal.get("/VisualizarManhwa");
        const dados = response.data.find((m) => m.titulo === "Revenge of the Iron-Blooded Sword Hound");
        setManhwa(dados);

        // Se encontrou o manhwa, busca os capítulos vinculados a ele
        if (dados) {
          const resCaps = await apiLocal.get("/VisualizarCapitulos");
          // Filtra os capítulos pelo idManhwa e ordena do maior para o menor
          const filtrados = resCaps.data
            .filter((c) => c.idManhwa === dados.id)
            .sort((a, b) => b.numero - a.numero);

          setCapitulos(filtrados);
        }
      } catch (err) {
        console.error("Erro ao buscar dados do backend:", err);
      }
    }
    loadManhwa();
  }, []);

  return (
    <div className="min-h-screen bg-[#111] text-white">
      <main className="max-w-[1220px] mx-auto pt-6 px-4">
        <div className="grid grid-cols-1 min-[882px]:grid-cols-[1fr_30%] gap-8">
          {/* Lado Esquerdo: Conteúdo Principal */}
          <div className="space-y-10">
            <div className="space-y-4">
              {/* TopBar de navegação */}
              <TopBar manhwaTitle={manhwa?.titulo || "Revenge of the Iron-Blooded Sword Hound"} />

              {/* Perfil com as informações do Autor, Capa e Descrição */}
              <div className="bg-[#222222] rounded-sm shadow-xl">
                <ManhwaProfile manhwa={manhwa} />
              </div>
            </div>

            {/* Lista de Capítulos (Scrollbar) */}
            <div className="space-y-4">
              {/* Componente Scrollbar recebendo os dados reais */}
              <Scrollbar
                capitulos={capitulos}
                slug="revenge-of-the-iron-blooded-sword-hound"
                manhwaTitle={manhwa?.titulo || "Revenge of the Iron-Blooded Sword Hound"}
                currentChapterId={null}
              />
            </div>
          </div>

          {/* Lado Direito: Sidebar Popular */}
          <aside>
            <div className="sticky top-6">
              <PopularSideBar />
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
