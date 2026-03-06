import React, { useEffect, useState } from 'react';
import apiLocal from '../../api/apiLocal'; // Certifique-se que o caminho está correto
import PopularCard from '../PopularCard/PopularCard';
//ESTRUTURA PARA O FUTURO (ABAS DINÂMICAS) import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const PopularSideBar = () => {
  const [manhwas, setManhwas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPopular() {
      try {
        const response = await apiLocal.get("/VisualizarManhwa");
        setManhwas(response.data);
      } catch (error) {
        console.error("Erro ao carregar Manhwas da API local:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchPopular();
  }, []);

  return (
    <div className="bg-[#222] rounded-[3px] border border-[#312f40] overflow-hidden">
      {/* Cabeçalho Atual */}
      <div className="bg-[#222] border-b border-[#312f40] px-[15px] py-[8px]">
        <h3 className="text-[15px] text-white font-semibold">Popular</h3>
      </div>
      
      {/* Lista de Obras (Versão Atual) */}
      <div className="flex flex-col">
        {loading ? (
          <div className="p-4 text-center text-gray-400 text-sm italic">Carregando obras...</div>
        ) : (
          manhwas.map((manhwa, index) => (
            <PopularCard 
              key={manhwa.id}
              rank={index + 1}
              title={manhwa.titulo}
              image={`http://localhost:3333/files/${manhwa.capa_url}`}
              genres={manhwa.genero ? manhwa.genero.split(',') : []} 
              rating="9.0" 
            />
          ))
        )}
      </div>

      {/* ESTRUTURA PARA O FUTURO (ABAS DINÂMICAS)
          Para usar, mova a lógica da lista para dentro do TabsContent
          
          <Tabs defaultValue="weekly" className="w-full">
            <div className="px-2.5 pt-3">
              <TabsList className="grid grid-cols-3 gap-1 bg-[#333] p-1 rounded-sm h-9">
                <TabsTrigger value="weekly" className="text-[12px] text-white data-[state=active]:bg-[#913fe2]">
                  Weekly
                </TabsTrigger>
                <TabsTrigger value="monthly" className="text-[12px] text-white data-[state=active]:bg-[#913fe2]">
                  Monthly
                </TabsTrigger>
                <TabsTrigger value="all" className="text-[12px] text-white data-[state=active]:bg-[#913fe2]">
                  All
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="weekly" className="mt-2 outline-none">
              {manhwas.map((manhwa, index) => (
                <PopularCard 
                  key={manhwa.id}
                  rank={index + 1}
                  title={manhwa.titulo}
                  image={`http://localhost:3333/files/${manhwa.capa_url}`}
                  genres={manhwa.genero ? manhwa.genero.split(',') : []} 
                  rating="9.0"
                />
              ))}
            </TabsContent>
          </Tabs>
      */}
    </div>
  );
};

export default PopularSideBar;