import React from 'react';
import { Star } from 'lucide-react';

const PopularCard = ({ rank, title, genres, rating, image }) => {
  return (
    <div className="flex px-[15px] py-3 h-[104px] relative border-b border-[#383838] last:border-0 group overflow-hidden">
      {/* Badge do Rank */}
      <div className="flex items-center justify-center">
        <span className="h-[25px] w-[25px] flex items-center justify-center text-[14px] text-[#888] absolute left-[15px] rounded-[3px] border border-[#888]">
          {rank}
        </span>
      </div>

      {/* Imagem do Poster */}
      <div className="ml-[37px] mr-2 flex-shrink-0 w-[55px] h-[72px] rounded-[3px] overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>

      {/* Informações */}
      <div className="flex flex-col flex-1 min-w-0">
        <h4 className="text-[13px] font-medium text-white truncate group-hover:text-[#913fe2] transition-colors cursor-pointer">
          {title}
        </h4>
        
        <div className="text-[11px] text-[#888] mt-1 line-clamp-1">
          <span className="font-bold mr-1">Genres:</span>
          {genres.join(', ')}
        </div>

        {/* Rating com Estrelas */}
        <div className="flex items-center gap-1 mt-auto">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                size={12} 
                fill={i < 4 ? "currentColor" : "none"} 
                className="lucide-star" 
              />
            ))}
          </div>
          <span className="text-[12px] italic text-[#999]">{rating}</span>
        </div>
      </div>
    </div>
  );
};

export default PopularCard;