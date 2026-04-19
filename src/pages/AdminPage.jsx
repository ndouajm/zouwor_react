import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

const AdminPage = () => {
  const [inscriptions, setInscriptions] = useState([])
  const [newsletter, setNewsletter] = useState([])
  const [stats, setStats] = useState(null)
  const [logs, setLogs] = useState([])
  const [activeTab, setActiveTab] = useState('inscriptions')
  const [loading, setLoading] = useState(true)
  const [password, setPassword] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Authentification admin
  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch(`${API_URL}/api/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      })
      const data = await response.json()
      if (data.success) {
        setIsAuthenticated(true)
        loadData()
      } else {
        alert('Mot de passe incorrect')
      }
    } catch (error) {
      console.error('Erreur:', error)
      alert('Erreur de connexion')
    }
  }

  // Charger toutes les données
  const loadData = async () => {
    setLoading(true)
    try {
      const [inscriptionsRes, newsletterRes, statsRes, logsRes] = await Promise.all([
        fetch(`${API_URL}/api/inscriptions`),
        fetch(`${API_URL}/api/newsletter`),
        fetch(`${API_URL}/api/stats`),
        fetch(`${API_URL}/api/logs`)
      ])
      
      setInscriptions(await inscriptionsRes.json())
      setNewsletter(await newsletterRes.json())
      setStats(await statsRes.json())
      setLogs(await logsRes.json())
    } catch (error) {
      console.error('Erreur chargement:', error)
    } finally {
      setLoading(false)
    }
  }

  // Exporter en CSV
  const exportCSV = async () => {
    window.open(`${API_URL}/api/export/csv`, '_blank')
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-navy to-navy-dark py-12 px-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
          <div className="text-center mb-8">
            <div className="text-5xl mb-4">👑</div>
            <h2 className="text-2xl font-bold text-gray-900">Accès Administrateur</h2>
            <p className="text-gray-500 text-sm mt-2">Veuillez entrer votre mot de passe</p>
          </div>
          <form onSubmit={handleLogin}>
            <input
              type="password"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-navy focus:outline-none focus:ring-2 focus:ring-navy/10 mb-4"
            />
            <button
              type="submit"
              className="w-full py-3 rounded-xl font-bold text-white bg-gradient-to-r from-navy to-orange-500 hover:opacity-90 transition-all"
            >
              Se connecter
            </button>
          </form>
          <p className="text-center text-xs text-gray-400 mt-4">
            Mot de passe par défaut : zouwor2025
          </p>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-navy border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500">Chargement des données...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-navy to-navy-dark text-white sticky top-0 z-50 shadow-lg">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center text-xl">👑</div>
            <div>
              <h1 className="text-xl font-bold">Zouwor Admin</h1>
              <p className="text-xs text-white/70">Gestion des inscriptions et statistiques</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={exportCSV}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2"
            >
              📥 Exporter CSV
            </button>
            <button
              onClick={() => setIsAuthenticated(false)}
              className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm font-medium transition-all"
            >
              Déconnexion
            </button>
          </div>
        </div>
      </header>

      {/* Stats Cards */}
      <div className="px-6 py-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-xs uppercase tracking-wide">Total inscriptions</p>
                <p className="text-2xl font-bold text-gray-900">{stats?.total_inscriptions || 0}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-xl">📝</div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-xs uppercase tracking-wide">Newsletter</p>
                <p className="text-2xl font-bold text-gray-900">{stats?.total_newsletter || 0}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-xl">📧</div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-xs uppercase tracking-wide">Visites totales</p>
                <p className="text-2xl font-bold text-gray-900">{stats?.total_visits || 0}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-xl">👁️</div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-xs uppercase tracking-wide">Téléchargements</p>
                <p className="text-2xl font-bold text-gray-900">{stats?.catalogue_downloads || 0}</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-xl">📥</div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('inscriptions')}
            className={`px-5 py-2.5 text-sm font-medium transition-all rounded-t-lg ${
              activeTab === 'inscriptions'
                ? 'bg-white text-navy border-b-2 border-orange-500'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            📋 Inscriptions ({inscriptions.length})
          </button>
          <button
            onClick={() => setActiveTab('newsletter')}
            className={`px-5 py-2.5 text-sm font-medium transition-all rounded-t-lg ${
              activeTab === 'newsletter'
                ? 'bg-white text-navy border-b-2 border-orange-500'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            📧 Newsletter ({newsletter.length})
          </button>
          <button
            onClick={() => setActiveTab('logs')}
            className={`px-5 py-2.5 text-sm font-medium transition-all rounded-t-lg ${
              activeTab === 'logs'
                ? 'bg-white text-navy border-b-2 border-orange-500'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            📜 Logs ({logs.length})
          </button>
        </div>

        {/* Contenu des onglets */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          {activeTab === 'inscriptions' && (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Date</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">WhatsApp</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Source</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Produits</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Budget</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Commune</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Motivation</th>
                  </tr>
                </thead>
                <tbody>
                  {inscriptions.map((ins) => (
                    <tr key={ins.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="px-4 py-3 text-xs text-gray-500">
                        {new Date(ins.date_inscription).toLocaleDateString('fr')}
                      </td>
                      <td className="px-4 py-3 text-xs font-medium text-gray-900">{ins.whatsapp}</td>
                      <td className="px-4 py-3 text-xs text-gray-600">{ins.source}</td>
                      <td className="px-4 py-3 text-xs text-gray-600">{ins.produits?.substring(0, 30)}...</td>
                      <td className="px-4 py-3 text-xs text-gray-600">{ins.budget}</td>
                      <td className="px-4 py-3 text-xs text-gray-600">{ins.commune || '-'}</td>
                      <td className="px-4 py-3 text-xs text-gray-500 max-w-[200px] truncate">{ins.motivation}</td>
                    </tr>
                  ))}
                  {inscriptions.length === 0 && (
                    <tr>
                      <td colSpan="7" className="px-4 py-8 text-center text-gray-400">
                        Aucune inscription pour le moment
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'newsletter' && (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Date</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Prénom</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Email</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">WhatsApp</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Statut</th>
                  </tr>
                </thead>
                <tbody>
                  {newsletter.map((sub) => (
                    <tr key={sub.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="px-4 py-3 text-xs text-gray-500">
                        {new Date(sub.date_inscription).toLocaleDateString('fr')}
                      </td>
                      <td className="px-4 py-3 text-xs font-medium text-gray-900">{sub.prenom}</td>
                      <td className="px-4 py-3 text-xs text-gray-600">{sub.email}</td>
                      <td className="px-4 py-3 text-xs text-gray-600">{sub.whatsapp || '-'}</td>
                      <td className="px-4 py-3">
                        <span className="inline-block px-2 py-1 text-[10px] font-bold rounded-full bg-green-100 text-green-700">
                          {sub.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'logs' && (
            <div className="divide-y divide-gray-100">
              {logs.map((log) => (
                <div key={log.id} className="px-4 py-3 hover:bg-gray-50">
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-gray-400">
                      {new Date(log.timestamp).toLocaleString('fr')}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      log.level === 'error' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
                    }`}>
                      {log.action}
                    </span>
                    <span className="text-xs text-gray-600">{JSON.stringify(log.details)}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AdminPage