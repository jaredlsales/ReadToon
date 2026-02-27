import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Profile from "../pages/Profile/Profile";

export default function Authenticated() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Profile />} />
        <Route path="*" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}
