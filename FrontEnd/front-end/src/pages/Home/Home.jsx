import PopularSideBar from "@/components/PopularSideBar/PopularSideBar";

const Home = () => {
  return (
    <div className="min-h-screen bg-[#111] text-white">
      <main className="max-w-[1220px] mx-auto pt-6 px-4">
        <div className="grid grid-cols-1 min-[882px]:grid-cols-[1fr_30%] gap-8">
          
          {/* Lado Esquerdo: Conteúdo Principal */}
          <div className="space-y-10">
            {/* Aqui você colocará os componentes que aparecem na imagem */}
            <section>
              <h2 className="text-xl font-bold mb-4">Home</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {/* Cards de Manhwa aqui */}
              </div>
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