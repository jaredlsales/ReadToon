import {useEffect, useState} from "react"
import PopularSideBar from "@/components/PopularSideBar/PopularSideBar";
import TopBar from "@/components/TopBar/TopBar";
import ManhwaProfile from "../../../components/ManhwaProfile/ManhwaProfile";
import apiLocal from "@/api/apiLocal";


export default function NanoMachine() {

  const [manhwa, setManhwa] = useState(null);

  useEffect(() => {
    async function loadManhwa() {
      try {
        const response = await apiLocal.get('/VisualizarManhwa');
        // Filtra pelo título para o exemplo do Nano Machine
        const dados = response.data.find(m => m.titulo === "Nano Machine");
        setManhwa(dados);
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
          
          {/* Lado Esquerdo: Conteúdo Principal (Seu seletor de 70%) */}
          <div className="space-y-10">
            
            <div className="space-y-4">
              {/* child(1): TopBar de navegação */}
              <TopBar manhwaTitle={manhwa?.titulo || "Nano Machine"} />

              {/* child(2): Perfil com as informações do Autor, Capa e Descrição */}
              <div className="bg-[#222222] rounded-sm shadow-xl">
                 <ManhwaProfile manhwa={manhwa} />
              </div>
            </div>

            {/* Aqui você pode colocar a lista de capítulos futuramente */}

          </div>

          {/* Lado Direito: Sua Sidebar Popular */}
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
