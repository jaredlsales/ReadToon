import React, { useState } from "react";
import { User, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import apiLocal from "@/api/apiLocal";

export default function RegisterAccount() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  // Estados para os campos do formulário
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleRegister(e) {
    e.preventDefault();

    // Validação básica
    if (senha !== confirmarSenha) {
      alert("The passwords don't match!");
      return;
    }

    try {
      setLoading(true);
      const response = await apiLocal.post("/CadastrarUsuario", {
        nome,
        email,
        senha,
      });

      alert(response.data.dados); // "Cadastro Efetuado com Sucesso"
      navigate("/Login");
    } catch (err) {
      console.error("Complete error:", err);
      console.error("Server response:", err.response);
      const mensagemErro =
        err.response?.data?.error || "Error while registering.";
      alert(mensagemErro);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] p-4 font-sans">
      <div className="bg-[#1c1c1c] p-8 rounded-2xl shadow-2xl w-full max-w-md border border-white/5">
        {/* Cabeçalho */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-20 h-20 mb-4 relative">
            <div className="h-full w-full rounded-full border-2 border-purple-600/30 overflow-hidden bg-black shadow-xl flex items-center justify-center">
              <img
                className="h-full w-full object-cover"
                src="/Readtoon.png"
                alt="ReadToon Logo"
              />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-white">ReadToon</h2>
          <p className="text-gray-400 text-sm mt-1">Register your account</p>
        </div>

        <form className="space-y-4" onSubmit={handleRegister}>
          {/* Usuário (nome) */}
          <div className="relative group">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-500 group-focus-within:text-purple-500" />
            <input
              type="text"
              required
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Username"
              className="w-full bg-[#121212] text-white border border-gray-800 rounded-xl p-4 pl-10 focus:outline-none focus:ring-2 focus:ring-purple-600/50 focus:border-purple-600 transition-all placeholder:text-gray-600"
            />
          </div>

          {/* Email */}
          <div className="relative group">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-500 group-focus-within:text-purple-500" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your Email"
              className="w-full bg-[#121212] text-white border border-gray-800 rounded-xl p-4 pl-10 focus:outline-none focus:ring-2 focus:ring-purple-600/50 focus:border-purple-600 transition-all placeholder:text-gray-600"
            />
          </div>

          {/* Senha */}
          <div className="relative group">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-500 group-focus-within:text-purple-500" />
            <input
              type={showPassword ? "text" : "password"}
              required
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="Password"
              className="w-full bg-[#121212] text-white border border-gray-800 rounded-xl p-4 pl-10 focus:outline-none focus:ring-2 focus:ring-purple-600/50 focus:border-purple-600 transition-all placeholder:text-gray-600"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-white"
            >
              {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
            </button>
          </div>

          {/* Confirmar Senha */}
          <div className="relative group">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-500 group-focus-within:text-purple-500" />
            <input
              type={showConfirmPassword ? "text" : "password"}
              required
              value={confirmarSenha}
              onChange={(e) => setConfirmarSenha(e.target.value)}
              placeholder="Password Confirm"
              className="w-full bg-[#121212] text-white border border-gray-800 rounded-xl p-4 pl-10 focus:outline-none focus:ring-2 focus:ring-purple-600/50 focus:border-purple-600 transition-all placeholder:text-gray-600"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-white"
            >
              {showConfirmPassword ? <Eye size={18} /> : <EyeOff size={18} />}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-bold shadow-lg shadow-purple-600/20 active:scale-[0.98] transition-all disabled:opacity-50"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <div className="text-center text-sm text-gray-500 mt-6">
          Already have an Account?{" "}
          <Link to="/Login" className="text-white font-bold hover:underline underline-offset-4">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}