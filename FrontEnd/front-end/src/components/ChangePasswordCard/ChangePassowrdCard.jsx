import React, { useState } from 'react';
import { Lock, Eye, EyeOff } from 'lucide-react';
import apiLocal from "@/api/apiLocal";

export default function ChangePasswordCard() {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // Estados dos inputs alinhados com o backend
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpdatePassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      alert("A nova senha e a confirmação não coincidem!");
      return;
    }

    try {
      setLoading(true);
      
      // Chamada para o novo endpoint específico
      const response = await apiLocal.put("/AlterarSenha", {
        senhaAntiga: currentPassword, // Enviado para o seu UsuarioServices
        novaSenha: newPassword
      });

      alert(response.data.dados); // "Senha alterada com sucesso!"
      
      // Limpa o formulário
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      
    } catch (err) {
      // Captura o "throw new Error" que você configurou no backend
      const mensagemErro = err.response?.data?.error || "Erro ao alterar senha.";
      alert(mensagemErro);
      console.error("Erro na troca de senha:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#222222] rounded-lg p-4 font-['Fira_Sans',sans-serif]">
      <h2 className="text-xl font-bold mb-6 text-white pl-1">Change Password</h2>
      
      <form className="space-y-4" onSubmit={handleUpdatePassword}>
        
        {/* Current Password */}
        <div className="relative w-full md:w-1/2">
          <Lock className="absolute size-4 left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type={showCurrent ? "text" : "password"}
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            placeholder="Current Password"
            required
            className="w-full h-12 pl-12 pr-12 bg-[#16151D] text-white placeholder-gray-500 rounded-xl border border-white/5 focus:outline-none focus:ring-1 focus:ring-[#913FE2] transition-all text-sm"
          />
          <button 
            type="button"
            onClick={() => setShowCurrent(!showCurrent)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
          >
            {showCurrent ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        {/* New & Confirm Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Lock className="absolute size-4 left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type={showNew ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="New Password"
              required
              className="w-full h-12 pl-12 pr-12 bg-[#16151D] text-white placeholder-gray-500 rounded-xl border border-white/5 focus:outline-none focus:ring-1 focus:ring-[#913FE2] transition-all text-sm"
            />
            <button type="button" onClick={() => setShowNew(!showNew)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white">
              {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <div className="relative">
            <Lock className="absolute size-4 left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type={showConfirm ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
              required
              className="w-full h-12 pl-12 pr-12 bg-[#16151D] text-white placeholder-gray-500 rounded-xl border border-white/5 focus:outline-none focus:ring-1 focus:ring-[#913FE2] transition-all text-sm"
            />
            <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white">
              {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        {/* Requirements */}
        <div className="mt-4 ml-1">
          <h4 className="text-[11px] text-gray-300 font-bold uppercase tracking-wider mb-2">Password Requirements</h4>
          <ul className="space-y-1">
            <li className={`text-[11px] flex items-center gap-2 ${newPassword.length >= 8 ? 'text-green-400' : 'text-gray-400'}`}>
              <div className={`w-1 h-1 rounded-full ${newPassword.length >= 8 ? 'bg-green-400' : 'bg-gray-500'}`} /> Minimum 8 characters long
            </li>
          </ul>
        </div>

        <div className="pt-4">
          <button 
            type="submit" 
            disabled={loading}
            className="bg-[#913FE2] hover:bg-[#7a32c2] text-white py-3 px-8 text-sm font-bold rounded-lg transition-all w-full sm:w-auto shadow-lg active:scale-95 uppercase disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}