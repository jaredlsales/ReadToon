import React, { useEffect, useState } from 'react';
import apiLocal from "../../api/apiLocal"

const HeroCarousel = () => {
  const [manhwas, setManhwas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    async function fetchPopular() {
      try {
        const response = await apiLocal.get("/VisualizarManhwa");
        setManhwas(response.data);
      } catch (error) {
        console.error("Erro ao carregar Manhwas:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchPopular();
  }, []);

  useEffect(() => {
    if (manhwas.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % manhwas.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [manhwas]);

  if (loading) return <div className="h-[280px] bg-[#222] animate-pulse rounded-[3px] border border-[#312f40]" />;
  if (manhwas.length === 0) return null;

  const current = manhwas[currentIndex];
  // Montando a URL correta da imagem
  const fullImageUrl = `http://localhost:3333/files/${current.capa_url}`;

  return (
    <div className="relative overflow-hidden rounded-[3px] border border-[#312f40] bg-[#222] text-white shadow-xl h-[300px]">
      
      {/* Background Blur */}
      <div className="absolute inset-0 -z-10">
        <img 
          src={fullImageUrl} 
          alt="" 
          className="h-full w-full object-cover blur-3xl brightness-[0.15] scale-125 transition-all duration-700"
        />
      </div>

      <div className="grid grid-cols-12 items-center p-6 h-full">
        <div className="col-span-12 sm:col-span-9 pr-8">
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#913fe2]">
            {current.genero}
          </span>
          <h2 className="mt-1 text-2xl font-bold line-clamp-2 hover:text-[#913fe2] cursor-pointer transition-colors">
            {current.titulo}
          </h2>

          <div className="mt-4">
            <span className="block uppercase text-[10px] font-bold tracking-widest text-[#888]">Sinopse</span>
            <p className="mt-1 text-[13px] text-gray-300 line-clamp-3 text-justify leading-relaxed">
              {current.descricao}
            </p>
          </div>

          <div className="mt-6 flex items-center gap-4">
            {/* Author tirado pq nao enxcaixa no carousel */}
            {/*<span className="text-[12px] text-[#888]">Author: <b className="text-white">{current.autor}</b></span>*/}
            <button className="bg-[#913fe2] px-4 py-1.5 rounded-[3px] text-[12px] font-bold hover:bg-[#7a32c2] transition-all">
              Read Now
            </button>
          </div>
        </div>

        {/* Poster Lateral */}
        <div className="hidden sm:col-span-3 sm:flex justify-end">
          <div className="w-[140px] aspect-[3/4] overflow-hidden rounded-[3px] border border-[#383838] shadow-2xl">
            <img src={fullImageUrl} alt={current.titulo} className="h-full w-full object-cover" />
          </div>
        </div>
      </div>

      {/* Dots (Estilo PopularSideBar) */}
      <div className="absolute bottom-3 left-6 flex gap-1.5">
        {manhwas.slice(0, 5).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-1 rounded-full transition-all ${
              index === currentIndex ? "w-6 bg-[#913fe2]" : "w-2 bg-[#444]"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;