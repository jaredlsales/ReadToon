import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const TopBar = ({ manhwaTitle }) => {
  // 1. Separamos o título da obra do capítulo (ex: "Infinite Mage - Chapter 1")
  // O split(" - ") divide a string onde houver o traço
  const partes = manhwaTitle ? manhwaTitle.split(" - ") : ["Carregando..."];
  const nomeObra = partes[0];
  const capituloTexto = partes[1];

  // 2. Geramos o slug para o link de retorno
  const getSlug = (text) => text.toLowerCase().replace(/\s+/g, '-');
  
  // 3. Mapeamento de rotas para voltar à página do Manhwa específica
  const getManhwaPath = (name) => {
    const slug = getSlug(name);
    if (name === "Nano Machine") return `/Manhwa/NanoMachine/${slug}`;
    if (name === "Infinite Mage") return `/Manhwa/InfiniteMage/${slug}`;
    if (name === "Star-Embracing Swordmaster") return `/Manhwa/StarEmbracingSwordmaster/${slug}`;
    if (name === "Revenge of the Iron-Blooded Sword Hound") return `/Manhwa/RevengeOfTheIron/${slug}`;
    if (name === "The Regressed Mercenary's Machinations") return `/Manhwa/TheRegressedMercenary/${slug}`;
    return `/Manhwa/${slug}`;
  };

  return (
    <div className="bg-[#222222] px-5 py-2.5 flex items-center gap-x-2 font-sans antialiased rounded-sm border border-white/5 shadow-md">
      {/* Nível 1: Home */}
      <Link to="/" className="shrink-0">
        <h3 className="hover:text-purple-500 text-[#999] cursor-pointer text-sm font-medium transition-colors">
          ReadToon
        </h3>
      </Link>
      
      <ChevronRight className="w-3.5 h-3.5 text-[#555] shrink-0" />
      
      {/* Nível 2: Página da Obra (Voltar) */}
      {manhwaTitle ? (
        <>
          <Link to={getManhwaPath(nomeObra)} className="shrink-0 max-w-[200px] truncate">
            <h3 className="hover:text-purple-500 text-[#999] cursor-pointer text-sm font-medium transition-colors">
              {nomeObra}
            </h3>
          </Link>

          {capituloTexto && (
            <>
              <ChevronRight className="w-3.5 h-3.5 text-[#555] shrink-0" />
              
              {/* Nível 3: Capítulo Atual (Apenas texto, sem link pois já estamos nele) */}
              <h3 className="text-white text-sm font-semibold shrink-0 truncate max-w-[250px]">
                {capituloTexto}
              </h3>
            </>
          )}
        </>
      ) : (
        <h3 className="text-[#555] text-sm italic">Carregando...</h3>
      )}
    </div>
  );
};

export default TopBar;