import React, { useState, useEffect } from "react";
import { User, Mail } from "lucide-react";
import apiLocal from "@/api/apiLocal";
import config from "@/config/config";

export default function EditProfileCard() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [fotoPerfilUrl, setFotoPerfilUrl] = useState(
    "/images/profile-picture.webp",
  );

  const [idPerfil, setIdPerfil] = useState("");
  const [idUsuario, setIdUsuario] = useState("");

  const FOTO_PADRAO = "/images/profile-picture.webp";

  useEffect(() => {
    async function loadUserData() {
      try {
        const token = localStorage.getItem("@readtoon:token");
        if (token) {
          apiLocal.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        }

        const response = await apiLocal.get("/VisualizarPerfil");
        const data = response.data;

        if (data) {
          setIdPerfil(data.id || "");
          setIdUsuario(data.idUsuario || "");
          setDescription(data.preferencias || "");

          if (data.foto_url) {
            setFotoPerfilUrl(config.getImageUrl(data.foto_url));
          } else {
            setFotoPerfilUrl(FOTO_PADRAO);
          }

          if (data.usuario) {
            setName(data.usuario.nome || "");
            setEmail(data.usuario.email || "");
          }
        }
      } catch (err) {
        console.error("Erro ao carregar dados do perfil", err);
      }
    }
    loadUserData();
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert("Imagem muito grande! Máximo 2MB.");
        return;
      }
      setFotoPerfilUrl(URL.createObjectURL(file));
    }
  };

  const handleSalvarAlteracoes = async (e) => {
    e.preventDefault();

    if (!idPerfil) {
      alert("Erro: ID do perfil não encontrado. Tente atualizar a página.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("id", idPerfil);
      formData.append("idUsuario", idUsuario);
      formData.append("preferencias", description);

      const fileInput = document.getElementById("photo-upload");
      if (fileInput && fileInput.files[0]) {
        formData.append("file", fileInput.files[0]);
      }

      // CORREÇÃO: Capturando a resposta corretamente
      const response = await apiLocal.put("/AlterarPerfil", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data) {
        alert("Perfil atualizado com sucesso!");

        // Avisa o Header para atualizar a foto
        window.dispatchEvent(new Event("profileUpdate"));

        if (response.data.foto_url) {
          const timestamp = new Date().getTime();
          setFotoPerfilUrl(
            `${config.IMAGES_BASE_URL}/${response.data.foto_url}?t=${timestamp}`,
          );
        }
      }
    } catch (err) {
      console.error(
        "Erro ao salvar perfil:",
        err.response?.data || err.message,
      );
      alert("Erro ao salvar alterações.");
    }
  };

  return (
    <div className="bg-[#222222] rounded-lg p-4 mb-8 font-['Fira_Sans',sans-serif]">
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-x-3">
        <div className="relative col-span-2 mx-auto md:mx-0 pl-0 p-2">
          <img
            className="w-28 h-28 sm:w-32 sm:h-32 object-cover rounded-lg border border-white/10"
            src={fotoPerfilUrl}
            alt="Profile Photo"
          />
        </div>

        <div className="col-span-1 md:col-span-5 lg:col-span-4 xl:col-span-4 mt-3 sm:mt-8">
          <div className="grid grid-cols-2 gap-3">
            <input
              accept="image/jpeg,image/png"
              type="file"
              id="photo-upload"
              className="hidden"
              onChange={handleFileChange}
            />
            <button
              type="button"
              onClick={() => document.getElementById("photo-upload").click()}
              className="bg-[#913FE2] hover:bg-[#7a32c2] text-white py-2 px-4 text-xs font-bold rounded-lg transition-colors"
            >
              CHANGE PHOTO
            </button>
            <button
              type="button"
              onClick={() => {
                setFotoPerfilUrl(FOTO_PADRAO);
                document.getElementById("photo-upload").value = "";
              }}
              className={`bg-[#FF4D4A] text-xs font-bold text-white py-2 px-4 rounded-lg transition-colors ${fotoPerfilUrl === FOTO_PADRAO ? "cursor-not-allowed opacity-60" : "hover:bg-red-600"}`}
              disabled={fotoPerfilUrl === FOTO_PADRAO}
            >
              RESET PHOTO
            </button>
          </div>
        </div>
      </div>

      <form className="mt-6 space-y-4" onSubmit={handleSalvarAlteracoes}>
        <div className="relative">
          <User className="absolute size-4 left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            className="w-full md:w-1/2 h-12 pl-12 pr-4 bg-[#16151D] text-white placeholder-gray-500 rounded-xl border border-white/5 focus:outline-none focus:ring-1 focus:ring-[#913FE2] transition-all text-sm"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
          />
        </div>

        <div className="flex flex-col md:flex-row gap-4 md:items-center">
          <div className="relative flex-1 md:max-w-[50%]">
            <Mail className="absolute size-4 left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              className="w-full h-12 pl-12 pr-4 bg-[#16151D] text-gray-500 rounded-xl border border-white/5 cursor-not-allowed text-sm"
              type="email"
              disabled
              value={email}
            />
          </div>
        </div>

        <div>
          <textarea
            rows="4"
            className="w-full p-4 bg-[#16151D] text-white placeholder-gray-500 border border-white/5 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#913FE2] transition-all text-sm resize-none"
            placeholder="Enter your bio or preferences..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="pt-2">
          <button
            type="submit"
            className="bg-[#913FE2] hover:bg-[#7a32c2] text-white py-3 px-8 text-sm font-bold rounded-lg transition-all w-full sm:w-auto shadow-lg active:scale-95"
          >
            SAVE CHANGES
          </button>
        </div>
      </form>
    </div>
  );
}
