import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import apiLocal from "@/api/apiLocal";
import { Settings, LogOut, Menu } from "lucide-react"; // Importando ícones para o menu

export default function HeaderAuthenticated() {
  const [busca, setBusca] = useState("");
  const [resultados, setResultados] = useState([]);
  const [todasObras, setTodasObras] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Estado para o dropdown do perfil
  const navigate = useNavigate();

  // Carrega as obras da API (Igual ao seu Header original)
  useEffect(() => {
    async function carregarObras() {
      try {
        const response = await apiLocal.get("/VisualizarManhwa");
        setTodasObras(response.data);
      } catch (err) {
        console.error("Erro ao carregar obras para busca", err);
      }
    }
    carregarObras();
  }, []);

  // Lógica de filtro da busca
  useEffect(() => {
    if (busca.trim() === "") {
      setResultados([]);
      return;
    }
    const filtrados = todasObras.filter((obra) =>
      obra.titulo.toLowerCase().includes(busca.toLowerCase()),
    );
    setResultados(filtrados.slice(0, 5));
  }, [busca, todasObras]);

  const getManhwaPath = (titulo) => {
    const slug = titulo.toLowerCase().replace(/\s+/g, "-");
    const rotas = {
      "Nano Machine": `/Manhwa/NanoMachine/${slug}`,
      "Infinite Mage": `/Manhwa/InfiniteMage/${slug}`,
      "Star-Embracing Swordmaster": `/Manhwa/StarEmbracingSwordmaster/${slug}`,
      "Revenge of the Iron-Blooded Sword Hound": `/Manhwa/RevengeOfTheIron/${slug}`,
      "The Regressed Mercenary's Machinations": `/Manhwa/TheRegressedMercenary/${slug}`,
    };
    return rotas[titulo] || `/Manhwa/${slug}`;
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && resultados.length > 0) {
      const destino = getManhwaPath(resultados[0].titulo);
      navigate(destino);
      setBusca("");
      setResultados([]);
    }
  };

  return (
    <header className="bg-[#913FE2] w-full shadow-md font-['Fira_Sans',sans-serif] sticky top-0 z-50">
      <div className="max-w-[1220px] mx-auto px-4 flex items-center justify-between h-14 gap-2">
        {/* Lado Esquerdo: Logo e Nav */}
        <div className="flex items-center gap-4 shrink-0">
          <Link
            to="/"
            className="flex h-12 w-12 shrink-0 items-center justify-center"
          >
            <div className="h-full w-full rounded-full border-2 border-black/40 overflow-hidden bg-black shadow-lg flex items-center justify-center transition-transform hover:scale-105">
              <img
                className="h-full w-full object-cover scale-[1]"
                src="/Readtoon.png"
                alt="ReadToon Logo"
              />
            </div>
          </Link>
        </div>

        {/* Lado Direito: Busca e Perfil */}
        <div className="flex items-center gap-2 sm:gap-4 flex-1 justify-end min-w-0">
          {/* Barra de Busca (Desktop) */}
          <div className="hidden md:flex items-center relative w-full max-w-[300px]">
            <input
              type="text"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              onKeyDown={handleKeyDown}
              onBlur={() => setTimeout(() => setResultados([]), 200)}
              className="w-full text-white pl-4 pr-10 py-1.5 rounded-lg border border-black/20 bg-[#16151D] outline-none focus:border-white/40 transition-all text-sm"
              placeholder="Search manhwa..."
            />
            <svg
              className="h-4 w-4 absolute right-3 text-white/40"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </svg>

            {/* Dropdown de Resultados da Busca */}
            {resultados.length > 0 && (
              <div className="absolute top-[110%] left-0 w-full bg-[#1A1A1A] border border-white/10 rounded-lg shadow-2xl overflow-hidden z-[100]">
                {resultados.map((obra) => (
                  <Link
                    key={obra.id}
                    to={getManhwaPath(obra.titulo)}
                    onClick={() => {
                      setBusca("");
                      setResultados([]);
                    }}
                    className="flex items-center gap-3 p-2 hover:bg-purple-600 transition-colors border-b border-white/5 last:border-0 group"
                  >
                    <img
                      src={`http://localhost:3333/files/${encodeURI(obra.capa_url)}`}
                      className="w-9 h-12 object-cover rounded shadow-sm"
                      alt={obra.titulo}
                    />
                    <div className="flex flex-col min-w-0 text-left">
                      <span className="text-xs font-bold text-white truncate">
                        {obra.titulo}
                      </span>
                      <span className="text-[10px] text-gray-400">
                        {obra.genero || "Manhwa"}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Avatar com Menu Dropdown de Perfil */}
          <div className="relative shrink-0">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              onBlur={() => setTimeout(() => setIsMenuOpen(false), 200)}
              className="h-9 w-9 rounded-full border-2 border-white/20 overflow-hidden hover:border-white transition-all focus:outline-none active:scale-95"
            >
              <img
                src="/images/profile-picture.webp"
                alt="User Profile"
                className="h-full w-full object-cover"
              />
            </button>

            {/* Menu Suspenso (Settings / Log out) */}
            {isMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-[#16151D] border border-white/10 rounded-lg shadow-2xl py-2 z-[110] animate-in fade-in zoom-in duration-150">
                <Link
                  to="/profile"
                  className="flex items-center gap-3 px-4 py-2 text-sm text-gray-300 hover:bg-[#913FE2] hover:text-white transition-colors"
                >
                  <Settings size={16} />
                  Settings
                </Link>
                <button
                  className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 transition-colors border-t border-white/5 mt-1"
                  onClick={() => console.log("Lógica de logout aqui")}
                >
                  <LogOut size={16} />
                  Log out
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Icon */}
          <button className="md:hidden p-1 text-white hover:bg-white/10 rounded">
            <Menu size={24} />
          </button>
        </div>
      </div>
    </header>
  );
}
