import { useState, useEffect } from 'react'


const InscriptionModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    source: '',
    motivation: '',
    import: '',
    types: [],
    type_autre: '',
    produits: '',
    budget: '',
    sexe: '',
    commune: '',
    whatsapp: ''
  })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [acceptPolicy, setAcceptPolicy] = useState(false)
  const [errors, setErrors] = useState({})

  // Fermer avec Echap
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleEsc)
    return () => document.removeEventListener('keydown', handleEsc)
  }, [onClose])

  // Empêcher le scroll du body quand modal ouvert
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // Gestion des changements
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    if (type === 'checkbox' && name === 'types') {
      if (checked) {
        setFormData(prev => ({ ...prev, types: [...prev.types, value] }))
      } else {
        setFormData(prev => ({ ...prev, types: prev.types.filter(t => t !== value) }))
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
      // Effacer l'erreur du champ
      if (errors[name]) {
        setErrors(prev => ({ ...prev, [name]: '' }))
      }
    }
  }

  // Sélection des options radio
  const handleRadioSelect = (element, name, value) => {
    const parent = element.parentElement
    const allOpts = parent.querySelectorAll('.opt-item')
    allOpts.forEach(opt => {
      opt.style.borderColor = '#dce8f5'
      opt.style.background = '#f9fafb'
    })
    element.style.borderColor = '#163365'
    element.style.background = '#e8f0fb'
    
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  // Validation du formulaire
  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.source) newErrors.source = 'Veuillez indiquer comment vous avez connu Zouwor'
    if (!formData.motivation.trim()) newErrors.motivation = 'Veuillez décrire votre motivation'
    if (!formData.import) newErrors.import = 'Veuillez indiquer si vous avez déjà importé'
    if (!formData.produits.trim()) newErrors.produits = 'Veuillez indiquer ce que vous vendez ou souhaitez vendre'
    if (!formData.budget) newErrors.budget = 'Veuillez sélectionner votre budget'
    if (!formData.sexe) newErrors.sexe = 'Veuillez sélectionner votre genre'
    if (!formData.whatsapp.replace(/\D/g, '').length >= 8) {
      newErrors.whatsapp = 'Veuillez entrer un numéro WhatsApp valide'
    }
    if (!acceptPolicy) newErrors.policy = 'Vous devez accepter la politique de confidentialité'
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      // Scroll vers la première erreur
      const firstError = document.querySelector('.error-message')
      if (firstError) firstError.scrollIntoView({ behavior: 'smooth', block: 'center' })
      return
    }

    setSubmitting(true)
    
    try {
      const response = await fetch(`/api/inscriptions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          date_inscription: new Date().toISOString(),
          accept_policy: true
        })
      })
      
      const result = await response.json()
      
      if (response.ok && result.success) {
        setSubmitted(true)
        setTimeout(() => {
          setSubmitted(false)
          onClose()
          // Réinitialiser le formulaire
          setFormData({
            source: '',
            motivation: '',
            import: '',
            types: [],
            type_autre: '',
            produits: '',
            budget: '',
            sexe: '',
            commune: '',
            whatsapp: ''
          })
          setAcceptPolicy(false)
          setErrors({})
        }, 3000)
      } else {
        alert('❌ Une erreur est survenue. Réessaie plus tard.')
      }
    } catch (error) {
      console.error('Erreur:', error)
      alert('❌ Erreur de connexion. Vérifie que le serveur est lancé.')
    } finally {
      setSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <div 
      className="fixed inset-0 bg-[rgba(0,18,38,.85)] flex items-center justify-center z-[9999] p-5 transition-all duration-300"
      style={{ backdropFilter: 'blur(8px)' }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className="bg-white rounded-2xl w-full max-w-[580px] max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* En-tête */}
        <div className="relative px-6 py-6 rounded-t-2xl sticky top-0 z-10" style={{ background: 'linear-gradient(135deg, #163365, #0f2450)' }}>
          <div className="absolute bottom-0 left-0 right-0 h-0.5" style={{ background: 'linear-gradient(90deg, #F97316, #ea6a0a)' }}></div>
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-white/80 hover:text-white hover:bg-red-500/50 hover:rotate-90 transition-all text-lg bg-white/10"
          >
            ×
          </button>
          <h2 className="text-xl font-bold text-white mb-1">🛍️ Rejoindre Zouwor</h2>
          <p className="text-xs text-white/80 leading-5">
            Remplis ce formulaire pour accéder à notre réseau d'importation et bénéficier de notre accompagnement personnalisé.
          </p>
          {/* <div className="mt-3 pt-2 border-t border-white/20">
            <p className="text-[10px] text-white/60 flex items-center gap-1">
              <span>🔗</span> 
              Lien d'inscription : 
              <code className="bg-white/20 px-2 py-0.5 rounded text-[9px]">
                {window.location.origin}/?form=open
              </code>
              <button 
                onClick={() => {
                  navigator.clipboard.writeText(`${window.location.origin}/?form=open`)
                  alert('Lien copié ! Partagez-le avec vos contacts.')
                }}
                className="ml-2 text-white/80 hover:text-white text-[9px] underline"
              >
                Copier
              </button>
            </p>
          </div> */}
        </div>

        {/* Corps du formulaire */}
        <div className="px-6 py-6">
          {submitted ? (
            <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
              <div className="text-4xl mb-3">🎉</div>
              <h3 className="font-bold text-green-700 mb-2">Inscription réussie !</h3>
              <p className="text-sm text-green-600">Nous vous contacterons bientôt sur WhatsApp.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Source */}
              <div>
                <label className="block text-xs font-semibold text-gray-900 mb-2">
                  Comment as-tu entendu parler de Zouwor ? <span className="text-red-500">*</span>
                </label>
                <div className="flex flex-col gap-2">
                  {[
                    { value: 'connaissance', label: 'Par une connaissance' },
                    { value: 'admin', label: 'Par un administrateur Zouwor' },
                    { value: 'reseaux', label: 'Sur les réseaux sociaux' }
                  ].map(opt => (
                    <div 
                      key={opt.value}
                      className={`opt-item flex items-center gap-2.5 p-3 rounded-xl cursor-pointer transition-all ${
                        formData.source === opt.value ? 'bg-blue-50 border-navy' : 'bg-gray-50 border-gray-200'
                      }`}
                      style={{ border: '1.5px solid', borderColor: formData.source === opt.value ? '#163365' : '#dce8f5' }}
                      onClick={(e) => handleRadioSelect(e.currentTarget, 'source', opt.value)}
                    >
                      <input 
                        type="radio" 
                        name="source" 
                        value={opt.value} 
                        checked={formData.source === opt.value}
                        onChange={handleChange}
                        className="accent-navy w-4 h-4"
                      />
                      <label className="cursor-pointer text-xs text-gray-600 flex-1">{opt.label}</label>
                    </div>
                  ))}
                </div>
                {errors.source && <p className="text-red-500 text-[10px] mt-1 error-message">{errors.source}</p>}
              </div>

              {/* Motivation */}
              <div>
                <label className="block text-xs font-semibold text-gray-900 mb-2" htmlFor="motivation">
                  Qu'est-ce qui t'a motivé à essayer Zouwor ? <span className="text-red-500">*</span>
                </label>
                <textarea
                  className={`w-full px-3 py-2.5 rounded-xl text-xs bg-gray-50 text-gray-900 outline-none transition-all focus:border-navy focus:bg-white focus:ring-2 focus:ring-navy/10 resize-y min-h-[72px] ${errors.motivation ? 'border-red-500' : 'border-gray-200'}`}
                  style={{ border: '1.5px solid', borderColor: errors.motivation ? '#ef4444' : '#dce8f5' }}
                  id="motivation"
                  name="motivation"
                  placeholder="Décris tes motivations..."
                  value={formData.motivation}
                  onChange={handleChange}
                ></textarea>
                {errors.motivation && <p className="text-red-500 text-[10px] mt-1">{errors.motivation}</p>}
              </div>

              {/* Déjà importé */}
              <div>
                <label className="block text-xs font-semibold text-gray-900 mb-2">
                  As-tu déjà importé des marchandises ? <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-2">
                  {[
                    { value: 'oui', label: 'Oui' },
                    { value: 'non', label: 'Non' }
                  ].map(opt => (
                    <div 
                      key={opt.value}
                      className={`opt-item flex items-center gap-2.5 p-3 rounded-xl cursor-pointer transition-all flex-1 ${
                        formData.import === opt.value ? 'bg-blue-50 border-navy' : 'bg-gray-50 border-gray-200'
                      }`}
                      style={{ border: '1.5px solid', borderColor: formData.import === opt.value ? '#163365' : '#dce8f5' }}
                      onClick={(e) => handleRadioSelect(e.currentTarget, 'import', opt.value)}
                    >
                      <input 
                        type="radio" 
                        name="import" 
                        value={opt.value} 
                        checked={formData.import === opt.value}
                        onChange={handleChange}
                        className="accent-navy w-4 h-4"
                      />
                      <label className="cursor-pointer text-xs text-gray-600">{opt.label}</label>
                    </div>
                  ))}
                </div>
                {errors.import && <p className="text-red-500 text-[10px] mt-1">{errors.import}</p>}
              </div>

              {/* Type de produit */}
              <div>
                <label className="block text-xs font-semibold text-gray-900 mb-2">
                  Type de produit qui t'intéresse <span className="text-red-500">*</span>
                </label>
                <div className="flex flex-col gap-2">
                  {[
                    { value: 'electronique', label: 'Électronique & accessoires' },
                    { value: 'lourd', label: 'Produit lourd (+1 kg)' },
                    { value: 'leger', label: 'Produit léger (-1 kg)' }
                  ].map(opt => (
                    <div 
                      key={opt.value}
                      className={`opt-item flex items-center gap-2.5 p-3 rounded-xl cursor-pointer transition-all ${
                        formData.types.includes(opt.value) ? 'bg-blue-50 border-navy' : 'bg-gray-50 border-gray-200'
                      }`}
                      style={{ border: '1.5px solid', borderColor: formData.types.includes(opt.value) ? '#163365' : '#dce8f5' }}
                    >
                      <input 
                        type="checkbox" 
                        name="types" 
                        value={opt.value} 
                        checked={formData.types.includes(opt.value)}
                        onChange={handleChange}
                        className="accent-navy w-4 h-4"
                      />
                      <label className="cursor-pointer text-xs text-gray-600 flex-1">{opt.label}</label>
                    </div>
                  ))}
                </div>
                <input 
                  className="w-full mt-2 px-3 py-2.5 rounded-xl text-xs bg-gray-50 text-gray-900 outline-none transition-all focus:border-navy focus:bg-white focus:ring-2 focus:ring-navy/10"
                  style={{ border: '1.5px solid #dce8f5' }}
                  type="text"
                  name="type_autre"
                  placeholder="Autre type de produit..."
                  value={formData.type_autre}
                  onChange={handleChange}
                />
              </div>

              {/* Produits vendus */}
              <div>
                <label className="block text-xs font-semibold text-gray-900 mb-2" htmlFor="produits">
                  Que vends-tu ou souhaites-tu vendre ? <span className="text-red-500">*</span>
                </label>
                <textarea
                  className={`w-full px-3 py-2.5 rounded-xl text-xs bg-gray-50 text-gray-900 outline-none transition-all focus:border-navy focus:bg-white focus:ring-2 focus:ring-navy/10 resize-y min-h-[72px] ${errors.produits ? 'border-red-500' : 'border-gray-200'}`}
                  style={{ border: '1.5px solid', borderColor: errors.produits ? '#ef4444' : '#dce8f5' }}
                  id="produits"
                  name="produits"
                  placeholder="Ex : téléphones, vêtements, accessoires cuisine..."
                  value={formData.produits}
                  onChange={handleChange}
                ></textarea>
                {errors.produits && <p className="text-red-500 text-[10px] mt-1">{errors.produits}</p>}
              </div>

              {/* Budget */}
              <div>
                <label className="block text-xs font-semibold text-gray-900 mb-2">
                  Ton budget d'importation <span className="text-red-500">*</span>
                </label>
                <div className="flex flex-col gap-2">
                  {[
                    { value: '50-200k', label: '50 000 – 200 000 FCFA' },
                    { value: '200-500k', label: '200 000 – 500 000 FCFA' },
                    { value: '500k-2m', label: '500 000 – 2 000 000 FCFA' },
                    { value: '2m+', label: 'Plus de 2 000 000 FCFA' }
                  ].map(opt => (
                    <div 
                      key={opt.value}
                      className={`opt-item flex items-center gap-2.5 p-3 rounded-xl cursor-pointer transition-all ${
                        formData.budget === opt.value ? 'bg-blue-50 border-navy' : 'bg-gray-50 border-gray-200'
                      }`}
                      style={{ border: '1.5px solid', borderColor: formData.budget === opt.value ? '#163365' : '#dce8f5' }}
                      onClick={(e) => handleRadioSelect(e.currentTarget, 'budget', opt.value)}
                    >
                      <input 
                        type="radio" 
                        name="budget" 
                        value={opt.value} 
                        checked={formData.budget === opt.value}
                        onChange={handleChange}
                        className="accent-navy w-4 h-4"
                      />
                      <label className="cursor-pointer text-xs text-gray-600 flex-1">{opt.label}</label>
                    </div>
                  ))}
                </div>
                {errors.budget && <p className="text-red-500 text-[10px] mt-1">{errors.budget}</p>}
              </div>

              {/* Genre */}
              <div>
                <label className="block text-xs font-semibold text-gray-900 mb-2">
                  Genre <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-2">
                  {[
                    { value: 'femme', label: 'Femme' },
                    { value: 'homme', label: 'Homme' }
                  ].map(opt => (
                    <div 
                      key={opt.value}
                      className={`opt-item flex items-center gap-2.5 p-3 rounded-xl cursor-pointer transition-all flex-1 ${
                        formData.sexe === opt.value ? 'bg-blue-50 border-navy' : 'bg-gray-50 border-gray-200'
                      }`}
                      style={{ border: '1.5px solid', borderColor: formData.sexe === opt.value ? '#163365' : '#dce8f5' }}
                      onClick={(e) => handleRadioSelect(e.currentTarget, 'sexe', opt.value)}
                    >
                      <input 
                        type="radio" 
                        name="sexe" 
                        value={opt.value} 
                        checked={formData.sexe === opt.value}
                        onChange={handleChange}
                        className="accent-navy w-4 h-4"
                      />
                      <label className="cursor-pointer text-xs text-gray-600">{opt.label}</label>
                    </div>
                  ))}
                </div>
                {errors.sexe && <p className="text-red-500 text-[10px] mt-1">{errors.sexe}</p>}
              </div>

              {/* Commune */}
              <div>
                <label className="block text-xs font-semibold text-gray-900 mb-2" htmlFor="commune">
                  Commune de résidence
                </label>
                <input 
                  className="w-full px-3 py-2.5 rounded-xl text-xs bg-gray-50 text-gray-900 outline-none transition-all focus:border-navy focus:bg-white focus:ring-2 focus:ring-navy/10"
                  style={{ border: '1.5px solid #dce8f5' }}
                  type="text"
                  id="commune"
                  name="commune"
                  placeholder="Ex: Yopougon, Cocody, Abobo..."
                  value={formData.commune}
                  onChange={handleChange}
                />
              </div>

              {/* WhatsApp */}
              <div>
                <label className="block text-xs font-semibold text-gray-900 mb-2" htmlFor="whatsapp">
                  Numéro WhatsApp <span className="text-red-500">*</span>
                </label>
                <input 
                  className={`w-full px-3 py-2.5 rounded-xl text-xs bg-gray-50 text-gray-900 outline-none transition-all focus:border-navy focus:bg-white focus:ring-2 focus:ring-navy/10 ${errors.whatsapp ? 'border-red-500' : 'border-gray-200'}`}
                  style={{ border: '1.5px solid', borderColor: errors.whatsapp ? '#ef4444' : '#dce8f5' }}
                  type="tel"
                  id="whatsapp"
                  name="whatsapp"
                  placeholder="+225 XX XX XX XX XX"
                  value={formData.whatsapp}
                  onChange={handleChange}
                />
                {errors.whatsapp && <p className="text-red-500 text-[10px] mt-1">{errors.whatsapp}</p>}
              </div>

              {/* Politique de confidentialité complète */}
              <div className="bg-blue-50 rounded-xl p-4" style={{ border: '1px solid #c5d6f5' }}>
                <h4 className="text-xs font-bold text-navy mb-2 flex items-center gap-1">🔒 Politique de confidentialité</h4>
                <p className="text-[11px] text-gray-600 leading-5 mb-2">
                  Chez <strong>Zouwor</strong>, nous respectons ta vie privée. Les informations que tu nous fournis, notamment ton numéro de téléphone, seront utilisées uniquement pour :
                </p>
                <ul className="text-[11px] text-gray-600 leading-5 list-disc pl-4 mb-3 space-y-1">
                  <li>T'enregistrer sur la liste des adhérents de Zouwor</li>
                  <li>Te contacter via WhatsApp pour des informations relatives à ton activité commerciale</li>
                  <li>T'envoyer des notifications concernant les opportunités d'importation</li>
                  <li>Améliorer nos services en fonction de ton profil</li>
                </ul>
                <p className="text-[11px] font-semibold text-navy mb-1">Nous nous engageons à :</p>
                <ul className="text-[11px] text-gray-600 leading-5 list-disc pl-4 mb-2 space-y-1">
                  <li>Ne jamais divulguer tes informations personnelles à des tiers sans ton consentement</li>
                  <li>Ne pas communiquer tes données aux autres adhérents</li>
                  <li>Protéger tes informations avec les meilleures pratiques de sécurité</li>
                  <li>Te permettre de te désinscrire à tout moment si tu le souhaites</li>
                </ul>
              </div>

              {/* Checkbox acceptation */}
              <div className={`flex items-start gap-2.5 p-3 rounded-xl cursor-pointer transition-all ${errors.policy ? 'bg-red-50 border-red-300' : 'bg-gray-50 hover:bg-blue-50'}`} style={{ border: '1.5px solid', borderColor: errors.policy ? '#ef4444' : '#dce8f5' }}>
                <input 
                  type="checkbox" 
                  id="acceptPolicy" 
                  checked={acceptPolicy}
                  onChange={(e) => {
                    setAcceptPolicy(e.target.checked)
                    if (errors.policy) setErrors(prev => ({ ...prev, policy: '' }))
                  }}
                  className="accent-navy w-4 h-4 flex-shrink-0 mt-0.5"
                />
                <label htmlFor="acceptPolicy" className="text-[11px] text-gray-600 leading-5 cursor-pointer">
                  J'accepte que mes informations, notamment mon numéro de téléphone, soient utilisées par Zouwor pour m'envoyer des messages relatifs à mon activité commerciale et pour améliorer mon expérience. <span className="text-red-500">*</span>
                </label>
              </div>
              {errors.policy && <p className="text-red-500 text-[10px] mt-1">{errors.policy}</p>}

              {/* Bouton submit */}
              <button 
                type="submit" 
                disabled={submitting}
                className="w-full py-3 rounded-xl font-bold text-sm text-white transition-all disabled:bg-gray-300 disabled:cursor-not-allowed hover:opacity-90 hover:-translate-y-0.5"
                style={{ background: submitting ? '#cbd5e1' : 'linear-gradient(90deg, #163365, #F97316)' }}
              >
                {submitting ? '⏳ Envoi en cours...' : 'Envoyer mes réponses ✓'}
              </button>

              {/* Note de bas de formulaire */}
              <p className="text-center text-[10px] text-gray-400">
                🔒 Toutes vos données sont confidentielles et protégées
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

export default InscriptionModal