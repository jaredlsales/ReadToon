import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom"; // Removido o useNavigate daqui
import apiLocal from "@/api/apiLocal";
import { Settings, LogOut } from "lucide-react";

export default function HeaderAuthenticated() {
  const [busca, setBusca] = useState("");
  const [resultados, setResultados] = useState([]);
  const [todasObras, setTodasObras] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [fotoPerfil, setFotoPerfil] = useState("/images/profile-picture.webp");

  // Usamos useCallback para que a função não mude a cada renderização
  const carregarFotoPerfil = useCallback(async () => {
    try {
      const token = localStorage.getItem("@readtoon:token");
      if (!token) return;

      apiLocal.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      const response = await apiLocal.get("/VisualizarPerfil");
      const data = response.data;

      if (data?.foto_url) {
        const timestamp = new Date().getTime();
        setFotoPerfil(`http://localhost:3333/files/${data.foto_url}?t=${timestamp}`);
      } else {
        setFotoPerfil("/images/profile-picture.webp");
      }
    } catch (err) {
      console.error("Erro ao carregar foto do perfil", err);
      setFotoPerfil("/images/profile-picture.webp");
    }
  }, []);

  function handleLogout() {
    localStorage.removeItem("@readtoon:token");
    localStorage.removeItem("@readtoon:user");
    window.location.href = "/";
  }

  // Efeito para Foto de Perfil
  useEffect(() => {
    carregarFotoPerfil();

    window.addEventListener("profileUpdate", carregarFotoPerfil);
    return () => {
      window.removeEventListener("profileUpdate", carregarFotoPerfil);
    };
  }, [carregarFotoPerfil]);

  // Efeito para Carregar Manhwas
  useEffect(() => {
    let isMounted = true; 
    async function carregarObras() {
      try {
        const response = await apiLocal.get("/VisualizarManhwa");
        if (isMounted && response.data) {
          setTodasObras(response.data);
        }
      } catch (err) {
        console.error("Erro ao carregar obras", err);
      }
    }
    carregarObras();
    return () => { isMounted = false; };
  }, []);

  // Lógica de Busca: Para evitar o erro de cascading render no filtro, 
  // usamos o useMemo ou filtramos diretamente no corpo da função se possível.
  // Mas aqui, vamos apenas ajustar a dependência.
  useEffect(() => {
    const query = busca.trim().toLowerCase();
    
    if (query === "") {
      // Se estiver vazio, limpamos os resultados
      if (resultados.length > 0) setResultados([]);
      return;
    }

    const filtrados = todasObras
      .filter((obra) => obra.titulo?.toLowerCase().includes(query))
      .slice(0, 5);
      
    setResultados(filtrados);
    
    // Omitimos 'resultados' da dependência para evitar o loop infinito
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  return (
    <header className="bg-[#913FE2] w-full shadow-md font-['Fira_Sans',sans-serif] sticky top-0 z-50">
      <div className="max-w-[1220px] mx-auto px-4 flex items-center justify-between h-14 gap-2">
        
        <div className="flex items-center gap-4 shrink-0">
          <Link to="/" className="flex h-12 w-12 items-center justify-center">
            <div className="h-full w-full rounded-full border-2 border-black/40 overflow-hidden bg-black shadow-lg flex items-center justify-center transition-transform hover:scale-105">
              <img className="h-full w-full object-cover" src="/Readtoon.png" alt="ReadToon Logo" />
            </div>
          </Link>
        </div>

        <div className="flex items-center gap-2 sm:gap-4 flex-1 justify-end min-w-0">
          <div className="hidden md:flex items-center relative w-full max-w-[300px]">
            <input
              type="text"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="w-full text-white pl-4 pr-10 py-1.5 rounded-lg border border-black/20 bg-[#16151D] outline-none focus:border-white/40 transition-all text-sm"
              placeholder="Search manhwa..."
            />
            
            {resultados.length > 0 && (
              <div className="absolute top-[110%] left-0 w-full bg-[#1A1A1A] border border-white/10 rounded-lg shadow-2xl overflow-hidden z-[100]">
                {resultados.map((obra) => (
                  <Link
                    key={obra.id}
                    to={getManhwaPath(obra.titulo)}
                    onClick={() => { setBusca(""); setResultados([]); }}
                    className="flex items-center gap-3 p-2 hover:bg-purple-600 transition-colors border-b border-white/5 last:border-0"
                  >
                    <img 
                      src={`http://localhost:3333/files/${encodeURI(obra.capa_url)}`} 
                      className="w-9 h-12 object-cover rounded shadow-sm" 
                      alt={obra.titulo} 
                    />
                    <div className="flex flex-col min-w-0 text-left text-white">
                      <span className="text-xs font-bold truncate">{obra.titulo}</span>
                      <span className="text-[10px] text-gray-400">{obra.genero || "Manhwa"}</span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div className="relative shrink-0">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              onBlur={() => setTimeout(() => setIsMenuOpen(false), 200)}
              className="h-9 w-9 rounded-full border-2 border-white/20 overflow-hidden hover:border-white transition-all focus:outline-none"
            >
              <img src={fotoPerfil} alt="User Profile" className="h-full w-full object-cover" />
            </button>

            {isMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-[#16151D] border border-white/10 rounded-lg shadow-2xl py-2 z-[110]">
                <Link to="/profile" className="flex items-center gap-3 px-4 py-2 text-sm text-gray-300 hover:bg-[#913FE2] hover:text-white transition-colors">
                  <Settings size={16} /> Settings
                </Link>
                <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 transition-colors border-t border-white/5 mt-1">
                  <LogOut size={16} /> Log out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}