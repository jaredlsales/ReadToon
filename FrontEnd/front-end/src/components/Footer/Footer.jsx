import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="w-full font-['Fira_Sans',sans-serif]">
      {/* 1. Barra de Links (Terms) - Compacta e sem efeito de hover */}
      <div className=" bg-[#913FE2] text-center flex justify-center items-center py-1">
        <div className="mx-auto w-fit px-3 py-1 items-center">
          <Link to="/TermsOfServices">
            <span className="text-white text-[13px] sm:text-sm font-medium">
              Terms of Service
            </span>
          </Link>
        </div>
      </div>

      {/* 2. Seção da Logo (O Footer Escuro) */}
      <div className="w-full bg-[#222222] border-t border-white/5">
        <div className="flex justify-center items-center h-24">
          <Link
            to="/"
            className="flex h-12 w-12 shrink-0 items-center justify-center transition-transform hover:scale-110"
          >
            {/* O segredo do círculo perfeito com o zoom de 2.5 */}
            <div className="h-full w-full rounded-full border-2 border-black/40 overflow-hidden bg-black shadow-lg flex items-center justify-center">
              <img
                className="h-full w-full object-cover scale-[2.5]"
                src="src/assets/logo.png"
                alt="ReadToon Logo"
              />
            </div>
          </Link>
          {/* Opcional: Nome ao lado da logo se desejar */}
          <span className="text-white font-black text-xl ml-3 tracking-tighter uppercase">
            ReadToon
          </span>
        </div>

        {/* Rodapé Final com Copyright */}
        <div className="pb-6 text-center">
          <p className="text-white/40 text-[11px] uppercase tracking-widest">
            © 2026 ReadToon - Todos os direitos reservados
          </p>
        </div>
      </div>
    </footer>
  );
}
