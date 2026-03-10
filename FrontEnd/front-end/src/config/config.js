// Configuração centralizada de URLs da aplicação
const config = {
  // API base URL
  API_BASE_URL: 'https://api-readtoon.devjaredsales.com',

  // URL para arquivos/imagens
  IMAGES_BASE_URL: 'https://api-readtoon.devjaredsales.com/files',

  // URLs específicas
  getImageUrl: (filename) => `${config.IMAGES_BASE_URL}/${encodeURI(filename)}`,
  getApiUrl: (endpoint) => `${config.API_BASE_URL}${endpoint}`,
};

export default config;