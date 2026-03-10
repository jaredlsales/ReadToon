import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import apiLocal from "../../api/apiLocal";
import config from "../../config/config";

const HeroCarousel = () => {
  const [manhwas, setManhwas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  const getSlug = (titulo) => titulo.toLowerCase().replace(/\s+/g, "-");

  const getManhwaPath = (titulo) => {
    const slug = getSlug(titulo);
    if (titulo === "Nano Machine") return `/Manhwa/NanoMachine/${slug}`;
    if (titulo === "Infinite Mage") return `/Manhwa/InfiniteMage/${slug}`;
    if (titulo === "Star-Embracing Swordmaster")
      return `/Manhwa/StarEmbracingSwordmaster/${slug}`;
    if (titulo === "Revenge of the Iron-Blooded Sword Hound")
      return `/Manhwa/RevengeOfTheIron/${slug}`;
    if (titulo === "The Regressed Mercenary's Machinations")
      return `/Manhwa/TheRegressedMercenary/${slug}`;
    return `/Manhwa/${slug}`;
  };

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

  if (loading)
    return (
      <div className="h-[250px] sm:h-[300px] bg-[#222] animate-pulse rounded-[3px] border border-[#312f40]" />
    );
  if (manhwas.length === 0) return null;

  const current = manhwas[currentIndex];
  const fullImageUrl = config.getImageUrl(current.capa_url);

  return (
    <div className="relative overflow-hidden rounded-[3px] border border-[#312f40] bg-[#222] text-white shadow-xl min-h-[250px] sm:h-[300px]">
      {/* Background Blur */}
      <div className="absolute inset-0 -z-10">
        <img
          src={fullImageUrl}
          alt=""
          className="h-full w-full object-cover blur-3xl brightness-[0.15] scale-125 transition-all duration-700"
        />
      </div>

      <div className="grid grid-cols-12 items-center h-full p-4 sm:p-6">
        <div className="col-span-12 sm:col-span-9">
          <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-[#913fe2]">
            {current.genero}
          </span>

          <Link to={getManhwaPath(current.titulo)}>
            <h2 className="mt-1 text-xl sm:text-2xl font-bold line-clamp-2 hover:text-[#913fe2] cursor-pointer transition-colors">
              {current.titulo}
            </h2>
          </Link>

          <div className="mt-2 sm:mt-4">
            <span className="block uppercase text-[9px] sm:text-[10px] font-bold tracking-widest text-[#888]">
              Sinopse
            </span>
            <p className="mt-1 text-xs sm:text-[13px] text-gray-300 line-clamp-2 sm:line-clamp-3 text-justify leading-relaxed">
              {current.descricao}
            </p>
          </div>

          <div className="mt-3 sm:mt-6 flex items-center gap-4">
            <Link to={getManhwaPath(current.titulo)}>
              <button className="bg-[#913fe2] px-5 py-1.5 sm:px-6 sm:py-2 rounded-[3px] text-[11px] sm:text-[12px] font-bold hover:bg-[#7a32c2] transition-all shadow-lg hover:shadow-[#913fe2]/20">
                Read Now
              </button>
            </Link>
          </div>
        </div>

        {/* Poster Lateral - oculto em mobile */}
        <div className="hidden sm:col-span-3 sm:flex justify-end">
          <Link
            to={getManhwaPath(current.titulo)}
            className="w-[140px] aspect-[3/4] overflow-hidden rounded-[3px] border border-[#383838] shadow-2xl hover:border-[#913fe2] transition-colors"
          >
            <img
              src={fullImageUrl}
              alt={current.titulo}
              className="h-full w-full object-cover"
            />
          </Link>
        </div>
      </div>

      {/* Dots */}
      <div className="absolute bottom-2 left-4 sm:bottom-3 sm:left-6 flex gap-1.5">
        {manhwas.slice(0, 5).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-1 rounded-full transition-all ${
              index === currentIndex
                ? "w-5 sm:w-6 bg-[#913fe2]"
                : "w-1.5 sm:w-2 bg-[#444]"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;
