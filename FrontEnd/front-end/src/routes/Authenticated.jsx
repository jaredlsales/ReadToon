import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// O HEADER NOVO AQUI
import HeaderAuthenticated from "../components/HeaderAuthenticated/HeaderAuthenticated"; 
import Footer from "../components/Footer/Footer";

// TODAS AS SUAS PÁGINAS
import Home from "../pages/Home/Home";
import Profile from "../pages/Profile/Profile";
import TermsOfServices from "../pages/TermsOfServices/TermsOfServices";
import NanoMachine from "../pages/Manhwa/NanoMachine/NanoMachine";
import NanoMachineChapter from "../pages/Chapter/NanoMachine/NanoMachine";
import InfiniteMage from "@/pages/Manhwa/InfiniteMage/InfiniteMage";
import InfiniteMageChapter from "@/pages/Chapter/InfiniteMage/InfiniteMage";
import RevengeOfTheIron from "@/pages/Manhwa/RevengeOfTheIron/RevengeOfTheIron";
import RevendeOfTheIronChapter from "@/pages/Chapter/RevengeOfTheIron/RevendeOfTheIron";
import StarEmbracingSwordmaster from "@/pages/Manhwa/StarEmbracingSwordmaster/StarEmbracingSwordmaster";
import StarEnbracingSwordmasterChapter from "@/pages/Chapter/StarEmbracingSwordmaster/StarEmbracingSwordmaster";
import TheRegressedMercenary from "@/pages/Manhwa/TheRegressedMercenary/TheRegressedMercenary";
import TheRegressedMercenaryChapter from "@/pages/Chapter/TheRegressedMercenary/TheRegressedMercenary";

export default function Authenticated() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen bg-[#16151D]">
        {/* AGORA USANDO O HEADER DE USUÁRIO LOGADO */}
        <HeaderAuthenticated /> 

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Profile" element={<Profile />} />

            {/* ROTA TermsOfServices (Mesmos caminhos do NotAuthenticated) */}
            <Route path="/TermsOfServices" element={<TermsOfServices />} />
            
            {/* ROTAS DOS MANHWAS (Mesmos caminhos do NotAuthenticated) */}
            <Route path="/Manhwa/NanoMachine/:slug" element={<NanoMachine />} />
            <Route path="/Read/NanoMachineChapter/:slug/:chapterNumber" element={<NanoMachineChapter />} />
            
            <Route path="/Manhwa/InfiniteMage/:slug" element={<InfiniteMage/>} />
            <Route path="/Read/InfiniteMageChapter/:slug/:chapterNumber" element={<InfiniteMageChapter/>} />
            
            <Route path="/Manhwa/RevengeOfTheIron/:slug" element={<RevengeOfTheIron/>} />
            <Route path="/Read/RevendeOfTheIronChapter/:slug/:chapterNumber" element={<RevendeOfTheIronChapter/>} />
            
            <Route path="/Manhwa/StarEmbracingSwordmaster/:slug" element={<StarEmbracingSwordmaster/>} />
            <Route path="/Read/StarEnbracingSwordmasterChapter/:slug/:chapterNumber" element={<StarEnbracingSwordmasterChapter/>} />
            
            <Route path="/Manhwa/TheRegressedMercenary/:slug" element={<TheRegressedMercenary/>} />
            <Route path="/Read/TheRegressedMercenaryChapter/:slug/:chapterNumber" element={<TheRegressedMercenaryChapter/>} />

            {/* Redirecionamento padrão para logados */}
            <Route path="*" element={<Home />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}