import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import RegisterAccount from "../pages/RegisterAccount/Register";
import TermsOfServices from "../pages/TermsOfServices/TermsOfServices";
import NanoMachine from "../pages/Manhwa/NanoMachine/NanoMachine";
import NanoMachineChapter from "../pages/Chapter/NanoMachine/NanoMachine";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import InfiniteMage from "@/pages/Manhwa/InfiniteMage/InfiniteMage";
import InfiniteMageChapter from "@/pages/Chapter/InfiniteMage/InfiniteMage";
import RevengeOfTheIron from "@/pages/Manhwa/RevengeOfTheIron/RevengeOfTheIron";
import RevendeOfTheIronChapter from "@/pages/Chapter/RevengeOfTheIron/RevendeOfTheIron";
import StarEmbracingSwordmaster from "@/pages/Manhwa/StarEmbracingSwordmaster/StarEmbracingSwordmaster";
import StarEnbracingSwordmasterChapter from "@/pages/Chapter/StarEmbracingSwordmaster/StarEmbracingSwordmaster";
import TheRegressedMercenary from "@/pages/Manhwa/TheRegressedMercenary/TheRegressedMercenary";
import TheRegressedMercenaryChapter from "@/pages/Chapter/TheRegressedMercenary/TheRegressedMercenary";

export default function NotAuthenticated() {
  return (
    <BrowserRouter>
      {/* min-h-screen faz o app ocupar a tela toda; flex-col organiza topo e fundo */}
      <div className="flex flex-col min-h-screen bg-[#16151D]">
        <Header />

        {/* flex-grow faz essa parte ocupar todo o espaço vazio, empurrando o footer */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/RegisterAccount" element={<RegisterAccount />} />
            <Route path="/TermsOfServices" element={<TermsOfServices />} />
            <Route path="/Manhwa/NanoMachine/:slug" element={<NanoMachine />} />
            <Route path="/Read/NanoMachineChapter/:slug/:chapterNumber"element={<NanoMachineChapter />} />
            <Route path="/Manhwa/InfiniteMage/:slug" element={<InfiniteMage/>} />
            <Route path="/Read/InfiniteMageChapter/:slug/:chapterNumber" element={<InfiniteMageChapter/>} />
            <Route path="/Manhwa/RevengeOfTheIron/:slug" element={<RevengeOfTheIron/>} />
            <Route path="/Read/RevendeOfTheIronChapter/:slug/:chapterNumber" element={<RevendeOfTheIronChapter/>} />
            <Route path="/Manhwa/StarEmbracingSwordmaster/:slug" element={<StarEmbracingSwordmaster/>} />
            <Route path="/Read/StarEnbracingSwordmasterChapter/:slug/:chapterNumber" element={<StarEnbracingSwordmasterChapter/>} />
            <Route path="/Manhwa/TheRegressedMercenary/:slug" element={<TheRegressedMercenary/>} />
            <Route path="/Read/TheRegressedMercenaryChapter/:slug/:chapterNumber" element={<TheRegressedMercenaryChapter/>} />
            <Route path="*" element={<Home />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}
