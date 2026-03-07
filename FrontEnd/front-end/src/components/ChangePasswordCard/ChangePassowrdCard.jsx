import React, { useState } from 'react';
import { Lock, Eye, EyeOff } from 'lucide-react';

export default function ChangePasswordCard() {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // Estados para os inputs (preparados para sua API)
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleUpdatePassword = (e) => {
    e.preventDefault();
    // Lógica para chamar sua apiLocal futuramente
    console.log("Alterando senha...");
  };

  return (
    <div className="bg-[#222222] rounded-lg p-4 font-['Fira_Sans',sans-serif]">
      <h2 className="text-xl font-bold mb-6 text-white pl-1">Change Password</h2>
      
      <form className="space-y-4" onSubmit={handleUpdatePassword}>
        
        {/* Current Password - Input largo como o de 'Name' no EditProfile */}
        <div className="relative">
          <Lock className="absolute size-4 left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type={showCurrent ? "text" : "password"}
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            placeholder="Current Password"
            className="w-full md:w-1/2 h-12 pl-12 pr-12 bg-[#16151D] text-white placeholder-gray-500 rounded-xl border border-white/5 focus:outline-none focus:ring-1 focus:ring-[#913FE2] transition-all text-sm"
          />
          <button 
            type="button"
            onClick={() => setShowCurrent(!showCurrent)}
            className="absolute left-[calc(50%-2.5rem)] md:left-[calc(50%-2.5rem)] right-auto top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
            // Ajuste da posição do olho para o input de 50% de largura
            style={{ left: window.innerWidth > 768 ? 'calc(50% - 35px)' : 'calc(100% - 35px)' }}
          >
            {showCurrent ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        {/* Grid para Nova Senha e Confirmação - Estilo Colunas do EditProfile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Lock className="absolute size-4 left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type={showNew ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="New Password"
              className="w-full h-12 pl-12 pr-12 bg-[#16151D] text-white placeholder-gray-500 rounded-xl border border-white/5 focus:outline-none focus:ring-1 focus:ring-[#913FE2] transition-all text-sm"
            />
            <button 
              type="button" 
              onClick={() => setShowNew(!showNew)} 
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
            >
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
              className="w-full h-12 pl-12 pr-12 bg-[#16151D] text-white placeholder-gray-500 rounded-xl border border-white/5 focus:outline-none focus:ring-1 focus:ring-[#913FE2] transition-all text-sm"
            />
            <button 
              type="button" 
              onClick={() => setShowConfirm(!showConfirm)} 
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
            >
              {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        {/* Requisitos de Senha - Texto discreto como o 'Allowed JPG' */}
        <div className="mt-4 ml-1">
          <h4 className="text-[13px] text-gray-300 font-bold uppercase tracking-wider mb-2">Password Requirements</h4>
          <ul className="space-y-1">
            <li className="text-gray-400 text-[11px] flex items-center gap-2">
              <div className="w-1 h-1 bg-gray-500 rounded-full" /> Minimum 8 characters long
            </li>
            <li className="text-gray-400 text-[11px] flex items-center gap-2">
              <div className="w-1 h-1 bg-gray-500 rounded-full" /> At least one lowercase character
            </li>
            <li className="text-gray-400 text-[11px] flex items-center gap-2">
              <div className="w-1 h-1 bg-gray-500 rounded-full" /> Number, symbol, or whitespace
            </li>
          </ul>
        </div>

        {/* Botão idêntico ao Save Changes do EditProfile */}
        <div className="pt-4">
          <button 
            type="submit" 
            className="bg-[#913FE2] hover:bg-[#7a32c2] text-white py-3 px-8 text-sm font-bold rounded-lg transition-all w-full sm:w-auto shadow-lg active:scale-95 uppercase"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}