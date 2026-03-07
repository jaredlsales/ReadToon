import React, { useState } from 'react'; // Adicionado o { useState } aqui
import EditProfileCard from '@/components/EditProfileCard/EditProfileCard';
import ChangePasswordCard from '@/components/ChangePasswordCard/ChangePasswordCard';

export default function Profile() {
  // Estado para controlar qual aba está ativa
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <div className="min-h-screen bg-[#16151D] text-white font-[var(--fira-sans)] antialiased">
      <div className="max-w-[1220px] mx-auto pt-10 px-6">
        
        <div className="mb-10">
          <h1 className="text-3xl font-bold tracking-tight text-white">Account Settings</h1>
          <p className="text-gray-400 text-base mt-1">Manage your profile information, security, and preferences.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          <div className="lg:col-span-3">
             <nav className="space-y-2 sticky top-8 p-1 bg-[#222222]/30 rounded-xl border border-white/5">
                <button 
                  onClick={() => setActiveTab('profile')}
                  className={`w-full text-left px-4 py-3 rounded-lg text-sm font-semibold transition-all duration-200 ${
                    activeTab === 'profile' 
                    ? 'bg-[#913FE2] text-white shadow-lg' 
                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  Profile Details
                </button>
                
                <button 
                  onClick={() => setActiveTab('security')}
                  className={`w-full text-left px-4 py-3 rounded-lg text-sm font-semibold transition-all duration-200 ${
                    activeTab === 'security' 
                    ? 'bg-[#913FE2] text-white shadow-lg' 
                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  Security
                </button>

             </nav>
          </div>

          <div className="lg:col-span-9 transition-all duration-300">
            {activeTab === 'profile' && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <EditProfileCard />
              </div>
            )}

            {activeTab === 'security' && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <ChangePasswordCard />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}