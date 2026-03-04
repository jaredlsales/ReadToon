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
            <Route path="/NanoMachine" element={<NanoMachine />} />
            <Route
              path="/NanoMachineChapter"
              element={<NanoMachineChapter />}
            />
            <Route path="*" element={<Home />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}
