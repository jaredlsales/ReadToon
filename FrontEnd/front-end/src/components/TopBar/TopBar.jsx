import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const TopBar = ({ manhwaTitle }) => {
  return (
    <div className="bg-[#222222] px-5 py-2.5 flex items-center gap-x-2 font-sans antialiased">
      <Link to="/" className="shrink-0">
        <h3 className="hover:text-purple-500 text-white cursor-pointer text-sm font-medium">
          ReadToon
        </h3>
      </Link>
      
      <ChevronRight className="w-3.5 h-3.5 text-[#555] shrink-0" />
      
      <h3 className="hover:text-purple-500 cursor-pointer text-white text-sm shrink-0 w-[calc(100%-120px)] truncate">
        {manhwaTitle || "Carregando..."}
      </h3>
    </div>
  );
};

export default TopBar;