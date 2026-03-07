import React, { useState } from "react";
import { Mail, Lock, Eye, EyeOff, X } from "lucide-react"; // Adicionado o ícone Eye aqui
import { Link } from "react-router-dom";

export default function Login() {
  //Modal = Esqueceu a senha
  //ShowPasowrd = Olho para ver a senha no Passoword
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // Novo estado para o olho

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] p-4 font-sans relative">
      <div className="bg-[#1c1c1c] p-8 rounded-2xl shadow-2xl w-full max-w-md border border-white/5">
        {/* Cabeçalho */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-24 h-24 mb-4 relative">
            <div className="h-full w-full rounded-full border-2 border-purple-600/30 overflow-hidden bg-black shadow-xl flex items-center justify-center">
              <img
                className="h-full w-full object-cover scale-[1]"
                src="/Readtoon.png"
                alt="ReadToon Logo"
              />
            </div>
            <div className="absolute inset-0 bg-purple-600/20 blur-xl rounded-full -z-10"></div>
          </div>

          <h2 className="text-2xl font-bold text-white tracking-tight">
            ReadToon
          </h2>
          <p className="text-gray-400 text-sm mt-1">Log in to your account</p>
        </div>

        <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
          <div className="relative group">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-500 group-focus-within:text-purple-500 transition-colors" />
            <input
              type="email"
              placeholder="Enter your Email"
              className="w-full bg-[#121212] text-white border border-gray-800 rounded-xl p-4 pl-10 focus:outline-none focus:ring-2 focus:ring-purple-600/50 focus:border-purple-600 transition-all placeholder:text-gray-600"
            />
          </div>

          <div className="relative group">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-500 group-focus-within:text-purple-500 transition-colors" />
            <input
              type={showPassword ? "text" : "password"} // Alterado para usar o estado
              placeholder="Password"
              className="w-full bg-[#121212] text-white border border-gray-800 rounded-xl p-4 pl-10 focus:outline-none focus:ring-2 focus:ring-purple-600/50 focus:border-purple-600 transition-all placeholder:text-gray-600"
            />
            {/* Botão do Olho Atualizado */}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)} // Inverte o estado ao clicar
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-white transition-colors"
            >
              {showPassword ? (
                <Eye className="size-5" />
              ) : (
                <EyeOff className="size-5" />
              )}
            </button>
          </div>

          <div className="flex items-center justify-between text-xs font-medium">
            <label className="flex items-center gap-2 text-gray-400 cursor-pointer hover:text-white transition-colors">
              <input
                type="checkbox"
                className="size-4 rounded border-gray-800 bg-gray-900 text-purple-600 focus:ring-purple-600"
              />
              Remember me
            </label>
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="text-purple-500 hover:text-purple-400 transition-colors"
            >
              Forgot Password?
            </button>
          </div>

          <button className="w-full py-3.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-bold shadow-lg shadow-purple-600/20 active:scale-[0.98] transition-all">
            Login
          </button>
        </form>

        <div className="flex items-center my-8">
          <div className="flex-grow border-t border-gray-800"></div>
          <div className="flex-grow border-t border-gray-800"></div>
        </div>

        <p className="text-center text-sm text-gray-500">
          Not a member?{" "}
          <Link
            to="/RegisterAccount"
            className="text-white font-bold hover:underline underline-offset-4"
          >
            Create New Account
          </Link>
        </p>
      </div>

      {/* --- MODAL DE ESQUECI A SENHA --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
            onClick={() => setIsModalOpen(false)}
          ></div>

          <div className="relative bg-[#222] w-full max-w-sm p-6 rounded-2xl shadow-2xl border border-white/10 animate-in fade-in zoom-in duration-200">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute right-4 top-4 text-gray-400 hover:text-white transition-colors"
            >
              <X className="size-6" />
            </button>

            <h2 className="text-xl font-bold text-white mb-1">
              Forgot Password
            </h2>
            <p className="text-sm text-gray-400 mb-6">
              We'll send you a link to reset your password.
            </p>

            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-2">
                <label className="text-xs font-medium text-gray-300">
                  Email address
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full h-10 bg-[#121212] text-white rounded-md px-3 border border-gray-800 outline-none focus:ring-2 focus:ring-purple-600"
                />
              </div>
              <button className="w-full h-10 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-md shadow-md transition-colors">
                Send Link
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
