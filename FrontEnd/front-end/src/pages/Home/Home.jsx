import PopularSideBar from "@/components/PopularSideBar/PopularSideBar";
import HeroCarousel from "@/components/HeroCarousel/HeroCarousel";
import LatestUpdates from "@/components/LatestUpdates/LatestUpdates";

const Home = () => {
  return (
    <div className="min-h-screen bg-[#111] text-white">
      <main className="max-w-[1220px] mx-auto pt-6 px-4">
        <div className="grid grid-cols-1 min-[882px]:grid-cols-[1fr_30%] gap-8">
          
          {/* Lado Esquerdo: Conteúdo Principal */}
          <div className="space-y-10">
            
            {/* 1. O Carrossel de Destaques (Hero) no topo da esquerda */}
            <section>
               <HeroCarousel />
            </section>

            {/* 2. Adicionando o LatestUpdates aqui embaixo */}
            <section>
               <LatestUpdates />
            </section>

          </div>

          {/* Lado Direito: Sua Sidebar Popular */}
          <aside>
            <div className="sticky top-6">
              <PopularSideBar />
            </div>
          </aside>
          
        </div>
      </main>
    </div>
  );
};

export default Home;