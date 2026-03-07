import React, { useState } from "react";
import { User, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";

export default function RegisterAccount() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] p-4 font-sans">
      <div className="bg-[#1c1c1c] p-8 rounded-2xl shadow-2xl w-full max-w-md border border-white/5">
        {/* Cabeçalho Reutilizado do Login para manter o padrão */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-20 h-20 mb-4 relative">
            <div className="h-full w-full rounded-full border-2 border-purple-600/30 overflow-hidden bg-black shadow-xl flex items-center justify-center">
              <img
                className="h-full w-full object-cover scale-[1]"
                src="/Readtoon.png"
                alt="ReadToon Logo"
              />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            ReadToon
          </h2>
          <p className="text-gray-400 text-sm mt-1">Register your account</p>
        </div>

        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          {/* Campo de Usuário */}
          <div className="relative group">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-500 group-focus-within:text-purple-500 transition-colors" />
            <input
              type="text"
              name="username"
              placeholder="Username"
              className="w-full bg-[#121212] text-white border border-gray-800 rounded-xl p-4 pl-10 focus:outline-none focus:ring-2 focus:ring-purple-600/50 focus:border-purple-600 transition-all placeholder:text-gray-600"
            />
          </div>

          {/* Campo de Email */}
          <div className="relative group">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-500 group-focus-within:text-purple-500 transition-colors" />
            <input
              type="email"
              name="email"
              placeholder="Enter your Email"
              className="w-full bg-[#121212] text-white border border-gray-800 rounded-xl p-4 pl-10 focus:outline-none focus:ring-2 focus:ring-purple-600/50 focus:border-purple-600 transition-all placeholder:text-gray-600"
            />
          </div>

          {/* Campo de Senha */}
          <div className="relative group">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-500 group-focus-within:text-purple-500 transition-colors" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              className="w-full bg-[#121212] text-white border border-gray-800 rounded-xl p-4 pl-10 focus:outline-none focus:ring-2 focus:ring-purple-600/50 focus:border-purple-600 transition-all placeholder:text-gray-600"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-white"
            >
              {showPassword ? (
                <Eye className="size-5" />
              ) : (
                <EyeOff className="size-5" />
              )}
            </button>
          </div>

          {/* Confirmação de Senha */}
          <div className="relative group">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-500 group-focus-within:text-purple-500 transition-colors" />
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="password_confirmation"
              placeholder="Password Confirm"
              className="w-full bg-[#121212] text-white border border-gray-800 rounded-xl p-4 pl-10 focus:outline-none focus:ring-2 focus:ring-purple-600/50 focus:border-purple-600 transition-all placeholder:text-gray-600"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-white"
            >
              {showConfirmPassword ? (
                <Eye className="size-5" />
              ) : (
                <EyeOff className="size-5" />
              )}
            </button>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-bold shadow-lg shadow-purple-600/20 active:scale-[0.98] transition-all"
          >
            Register
          </button>
        </form>

        <div className="text-center text-sm text-gray-500 mt-6">
          Already have an Account?{" "}
          <Link
            to="/Login"
            className="text-white font-bold hover:underline underline-offset-4"
          >
            Login
          </Link>
        </div>

        {/* Divisor
        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-gray-800"></div>
          <span className="mx-4 text-gray-600 text-xs font-bold uppercase">Or continue with</span>
          <div className="flex-grow border-t border-gray-800"></div>
        </div> */}

        {/* Google Login 
        <button className="w-full flex items-center justify-center gap-3 bg-transparent border border-gray-800 p-3.5 rounded-xl hover:bg-white/5 transition-all">
          <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="size-5" />
          <span className="text-white font-semibold text-sm">Continue with Google</span>
        </button>*/}
      </div>
    </div>
  );
}
