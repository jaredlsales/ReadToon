import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import apiLocal from "@/api/apiLocal";
import config from "@/config/config";
import Readtoon from "../../../public/Readtoon.png";

export default function Header() {
  const [busca, setBusca] = useState("");
  const [resultados, setResultados] = useState([]);
  const [todasObras, setTodasObras] = useState([]);
  const navigate = useNavigate();

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

        <div className="flex items-center gap-2 sm:gap-4 flex-1 justify-end min-w-0">
          <div className="hidden md:flex items-center relative w-full max-w-[300px]">
            <input
              type="text"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              onKeyDown={handleKeyDown}
              // Fecha a busca se o usuário clicar fora (com delay para permitir o clique no link)
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

            {/* DROPDOWN - Adicionado z-[100] e pointer-events-auto */}
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
                      src={config.getImageUrl(obra.capa_url)}
                      className="w-9 h-12 object-cover rounded shadow-sm"
                      alt={obra.titulo}
                    />
                    <div className="flex flex-col min-w-0">
                      <span className="text-xs font-bold text-white truncate group-hover:text-white">
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

          <div className="shrink-0">
            <Link to="/Login">
              <button className="flex items-center gap-2 bg-[#6F2598] hover:bg-[#5a1f78] text-white px-3 sm:px-4 py-2 rounded-md transition-all h-9 shadow-sm active:scale-95">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
                <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider hidden xs:inline">
                  Login
                </span>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
