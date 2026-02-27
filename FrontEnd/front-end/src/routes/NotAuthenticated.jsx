import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import RegisterAccount from "../pages/RegisterAccount/Register";
import TermsOfServices from "../pages/TermsOfServices/TermsOfServices";
import NanoMachine from "../pages/Manhwa/NanoMachine/NanoMachine";
import NanoMachineChapter from "../pages/Chapter/NanoMachine/NanoMachine";

export default function NotAuthenticated() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/RegisterAccount" element={<RegisterAccount />} />
        <Route path="/TermsOfServices" element={<TermsOfServices />} />
        <Route path="/NanoMachine" element={<NanoMachine />} />
        <Route path="/NanoMachineChapter" element={<NanoMachineChapter />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}
