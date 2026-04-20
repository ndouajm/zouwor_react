// Plus besoin de variable d'environnement !
// L'API est sur le même domaine que le site
const API_URL = ''

export const api = {
  inscriptions: `${API_URL}/api/inscriptions`,
  newsletter: `${API_URL}/api/newsletter`,
  stats: `${API_URL}/api/stats`,
  logs: `${API_URL}/api/logs`,
  health: `${API_URL}/api/health`,
  export: `${API_URL}/api/export/csv`,
  downloads: `${API_URL}/api/downloads/catalogue`,
  visit: `${API_URL}/api/stats/visit`,
  adminLogin: `${API_URL}/api/admin/login`
}

export default API_URL