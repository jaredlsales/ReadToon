import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TopBar from "@/components/TopBar/TopBar";
import NavBarChapter from "@/components/NavBarChapter/NavBarChapter";
import apiLocal from "@/api/apiLocal";
import config from "@/config/config";

export default function TheRegressedMercenaryChapter() {
  const { slug, chapterNumber } = useParams();
  const [manhwa, setManhwa] = useState(null);
  const [capitulos, setCapitulos] = useState([]);
  const [paginas, setPaginas] = useState([]); // Estado para as imagens separadas

  useEffect(() => {
    async function loadData() {
      try {
        const responseManhwa = await apiLocal.get("/VisualizarManhwa");
        // Certifique-se que o título bate exatamente com o banco
        const dadosManhwa = responseManhwa.data.find(
          (m) => m.titulo === "The Regressed Mercenary's Machinations",
        );
        setManhwa(dadosManhwa);

        if (dadosManhwa) {
          const responseCaps = await apiLocal.get("/VisualizarCapitulos");
          const filtrados = responseCaps.data
            .filter((c) => c.idManhwa === dadosManhwa.id)
            .sort((a, b) => b.numero - a.numero);

          setCapitulos(filtrados);

          // BUSCA O CAPÍTULO ATUAL AQUI DENTRO
          const atual = filtrados.find(
            (c) => c.numero === parseInt(chapterNumber),
          );

          if (atual && atual.capitulo_url_1) {
            const listaImagens = atual.capitulo_url_1.split(",");
            setPaginas(listaImagens);
          }
        }
      } catch (err) {
        console.error("Erro ao carregar dados:", err);
      }
    }
    loadData();
  }, [chapterNumber]); // Adicione chapterNumber aqui para recarregar ao mudar de página

  return (
    <div className="min-h-screen bg-[#111] text-white">
      <main className="max-w-[1220px] mx-auto pt-6 px-4 pb-20">
        <div className="space-y-6">
          <TopBar
            manhwaTitle={`${manhwa?.titulo || "The Regressed Mercenary's Machinations"} - Chapter ${chapterNumber}`}
          />

          <NavBarChapter
            capitulos={capitulos}
            capituloAtual={chapterNumber}
            slug={slug || "the-regressed-mercenary's-machinations"}
          />

          {/* ÁREA DE LEITURA DINÂMICA */}
          <div className="flex flex-col items-center w-full bg-black">
            {paginas.length > 0 ? (
              paginas.map((imgName, index) => (
                <img
                  key={index}
                  // O trim() remove espaços nas pontas e o encodeURI trata os espaços internos
                  src={config.getImageUrl(imgName.trim())}
                  alt="página do capítulo"
                  className="w-full max-w-[800px] h-auto"
                  onError={(e) => {
                    console.log("Erro na imagem:", e.target.src);
                    e.target.style.display = "none"; // Esconde se der erro
                  }}
                />
              ))
            ) : (
              <p>Carregando imagens...</p>
            )}
          </div>

          <NavBarChapter
            capitulos={capitulos}
            capituloAtual={chapterNumber}
            slug={slug || "nano-machine"}
          />
        </div>
      </main>
    </div>
  );
}
