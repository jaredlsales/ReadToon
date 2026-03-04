import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-[#913FE2] w-full shadow-md font-['Fira_Sans',sans-serif] sticky top-0 z-50">
      {/* Container principal com padding responsivo */}
      <div className="max-w-[1220px] mx-auto px-4 flex items-center justify-between h-14 gap-2">
        {/* Lado Esquerdo: Logo e Menu */}
        <div className="flex items-center gap-4 shrink-0">
          {/* Link da Logo */}
          <Link
            to="/" // MUDANÇA AQUI: troque 'href' por 'to'
            className="flex h-12 w-12 shrink-0 items-center justify-center" // Aumentei para h-12 para a logo não ficar esmagada
          >
            {/* O segredo do círculo perfeito continua aqui */}
            <div className="h-full w-full rounded-full border-2 border-black/40 overflow-hidden bg-black shadow-lg flex items-center justify-center">
              <img
                className="h-full w-full object-cover scale-[2.5]"
                src="src/assets/logo.png"
                alt="ReadToon Logo"
              />
            </div>
          </Link>

          {/*<nav className="hidden lg:block">
            <ul className="flex flex-row items-center">
              <li>
                <a
                  href="/"
                  className="px-3 text-white text-[15px] font-bold tracking-wider hover:bg-black/10 py-5 transition-colors"
                >
                  Home
                </a>
              </li>
            </ul>
          </nav>*/}
        </div>

        {/* Lado Direito: Busca e Login */}
        <div className="flex items-center gap-2 sm:gap-4 flex-1 justify-end min-w-0">
          {/* Busca: Escondida em telas menores que 'md' (768px) para evitar a quebra que você viu */}
          <div className="hidden md:flex items-center relative w-full max-w-[300px]">
            <input
              type="text"
              className="w-full text-white pl-4 pr-10 py-1.5 rounded-lg border border-black/20 bg-[#16151D] outline-none focus:border-white/40 transition-all text-sm"
              placeholder="Search"
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
          </div>

          {/* Ícone de Busca para Mobile (Só aparece quando a barra grande some) */}
          <button className="md:hidden p-2 text-white hover:bg-black/10 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </svg>
          </button>

          {/* Botão Login: Ajusta o tamanho conforme a tela */}
          <div className="shrink-0">
            <Link to="/Login">
              <button className="flex items-center gap-2 bg-[#6F2598] hover:bg-[#5a1f78] text-white px-3 sm:px-4 py-2 rounded-md transition-all h-9 shadow-sm">
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
