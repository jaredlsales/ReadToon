import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const TopBar = ({ manhwaTitle }) => {
  const partes = manhwaTitle ? manhwaTitle.split(" - ") : ["Carregando..."];
  const nomeObra = partes[0];
  const capituloTexto = partes[1];

  const getSlug = (text) => text.toLowerCase().replace(/\s+/g, '-');
  
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
    <div className="w-full bg-[#222222] px-3 sm:px-5 py-2.5 flex items-center gap-1 sm:gap-2 font-sans rounded-sm border border-white/5 shadow-md overflow-x-auto whitespace-nowrap scrollbar-hide">
      {/* Home */}
      <Link to="/" className="shrink-0">
        <h3 className="hover:text-purple-500 text-[#999] cursor-pointer text-xs sm:text-sm font-medium transition-colors">
          ReadToon
        </h3>
      </Link>
      
      <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 text-[#555] shrink-0" />
      
      {/* Nome da obra */}
      {manhwaTitle ? (
        <>
          <Link to={getManhwaPath(nomeObra)} className="shrink-0 max-w-[120px] sm:max-w-[200px] truncate">
            <h3 className="hover:text-purple-500 text-[#999] cursor-pointer text-xs sm:text-sm font-medium truncate">
              {nomeObra}
            </h3>
          </Link>

          {capituloTexto && (
            <>
              <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 text-[#555] shrink-0" />
              
              {/* Capítulo atual */}
              <h3 className="text-white text-xs sm:text-sm font-semibold shrink-0 truncate max-w-[120px] sm:max-w-[250px]">
                {capituloTexto}
              </h3>
            </>
          )}
        </>
      ) : (
        <h3 className="text-[#555] text-xs sm:text-sm italic">Carregando...</h3>
      )}
    </div>
  );
};

export default TopBar;