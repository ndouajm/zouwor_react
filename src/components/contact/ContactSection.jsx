import { useState } from 'react'


const ContactSection = () => {
  const [formData, setFormData] = useState({ prenom: '', email: '', whatsapp: '' })
  const [submitted, setSubmitted] = useState(false)
  const API_URL = import.meta.env.VITE_API_URL

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch(`${API_URL}/api/newsletter`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      if (response.ok) {
        setSubmitted(true)
        setFormData({ prenom: '', email: '', whatsapp: '' })
        setTimeout(() => setSubmitted(false), 3000)
      } else {
        alert('Une erreur est survenue')
      }
    } catch (error) {
      console.error('Erreur:', error)
    }
  }

  return (
    <section 
      className="relative py-20 px-[5%] overflow-hidden"
      id="contact"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&w=1920&q=85')",
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Overlay avec flou */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
      
      {/* Overlay supplémentaire pour mieux lire le texte */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#163365]/60 to-[#163365]/40"></div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block bg-orange-500/90 backdrop-blur-sm text-white text-xs font-bold tracking-[3px] uppercase px-4 py-1.5 rounded-full mb-4">
            📞 Nous contacter
          </span>
          <h2 className="font-bold text-white text-3xl md:text-4xl mb-4 drop-shadow-lg">
            Parlons de votre <span className="text-orange-400">projet</span>
          </h2>
          <div className="w-20 h-1 bg-orange-500 mx-auto rounded-full mb-4"></div>
          <p className="text-white/90 text-sm max-w-md mx-auto drop-shadow-md">
            Notre équipe répond en moins de 12h. Contactez-nous sur WhatsApp pour une réponse rapide.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Colonne gauche - Infos contact */}
          <div>
            <div className="space-y-4 mb-8">
              <a 
                href="tel:+2250711041386" 
                className="flex items-center gap-5 bg-white/95 backdrop-blur-sm rounded-2xl p-5 border border-white/20 hover:border-orange-400 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-orange-500/20 flex items-center justify-center text-2xl group-hover:bg-orange-500 group-hover:text-white transition-all duration-300">
                  📞
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-0.5">Téléphone</div>
                  <div className="text-sm font-semibold text-gray-800">+225 07 11 04 13 86</div>
                  <div className="text-sm font-semibold text-gray-800">+225 07 89 07 85 57</div>
                </div>
              </a>

              <a 
                href="mailto:equipezouwor@gmail.com" 
                className="flex items-center gap-5 bg-white/95 backdrop-blur-sm rounded-2xl p-5 border border-white/20 hover:border-orange-400 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-orange-500/20 flex items-center justify-center text-2xl group-hover:bg-orange-500 group-hover:text-white transition-all duration-300">
                  📧
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-0.5">Email</div>
                  <div className="text-sm font-semibold text-gray-800">equipezouwor@gmail.com</div>
                </div>
              </a>

              <div className="flex items-center gap-5 bg-white/95 backdrop-blur-sm rounded-2xl p-5 border border-white/20">
                <div className="w-12 h-12 rounded-xl bg-orange-500/20 flex items-center justify-center text-2xl">
                  📍
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-0.5">Adresse</div>
                  <div className="text-sm font-semibold text-gray-800">Abidjan, Côte d'Ivoire</div>
                </div>
              </div>

              <div className="flex items-center gap-5 bg-white/95 backdrop-blur-sm rounded-2xl p-5 border border-white/20">
                <div className="w-12 h-12 rounded-xl bg-orange-500/20 flex items-center justify-center text-2xl">
                  🕒
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-0.5">Horaires</div>
                  <div className="text-sm font-semibold text-gray-800">Lun – Sam : 08h00 – 18h00</div>
                </div>
              </div>
            </div>

            {/* Réseaux sociaux */}
            <div>
              <p className="text-sm font-semibold text-white mb-4 flex items-center gap-2 drop-shadow-md">
                <span className="w-8 h-0.5 bg-orange-400 rounded-full"></span>
                Suivez-nous
                <span className="w-8 h-0.5 bg-orange-400 rounded-full"></span>
              </p>
              <div className="flex gap-3">
                <a 
                  href="https://chat.whatsapp.com/GfNhdBTDh6A4a1sF5ufGmC" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-[#25D366] transition-all duration-300 group"
                >
                  <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </a>
                <a 
                  href="#" 
                  className="w-11 h-11 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-[#1877F2] transition-all duration-300 group"
                >
                  <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                <a 
                  href="https://t.me/+WRsFr0iIEFMyZDY0" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-[#26A5E4] transition-all duration-300 group"
                >
                  <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.13-.06-.18-.07-.05-.17-.03-.25-.02-.11.02-1.93 1.23-5.44 3.6-.51.35-.98.52-1.4.51-.46-.01-1.35-.26-2.01-.48-.81-.27-1.46-.41-1.4-.87.03-.24.36-.48.99-.74 2.15-.94 3.86-1.56 5.14-1.87 2.45-.58 2.96-.68 3.29-.68.07 0 .23.02.33.12.09.1.11.23.11.34 0 .08.01.18-.02.28z" />
                  </svg>
                </a>
                <a 
                  href="#" 
                  className="w-11 h-11 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-gradient-to-br hover:from-[#F58529] hover:via-[#DD2A7B] hover:to-[#8134AF] transition-all duration-300 group"
                >
                  <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Colonne droite - Newsletter */}
          <div className="relative">
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-white/30 relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-orange-500/10 rounded-full"></div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl">📩</span>
                  <h3 className="text-xl font-bold text-gray-800">Restez informé des meilleures offres</h3>
                </div>
                <p className="text-sm text-gray-600 mb-6">
                  Recevez en avant-première nos offres d'importation groupée, les tendances produits et nos conseils exclusifs.
                </p>

                <div className="flex flex-wrap gap-3 mb-6">
                  <span className="text-xs bg-orange-100 text-orange-700 px-3 py-1 rounded-full">✓ Offres exclusives</span>
                  <span className="text-xs bg-orange-100 text-orange-700 px-3 py-1 rounded-full">✓ Tendances Chine</span>
                  <span className="text-xs bg-orange-100 text-orange-700 px-3 py-1 rounded-full">✓ Désinscription libre</span>
                </div>
                
                {submitted ? (
                  <div className="bg-green-50 text-green-600 p-4 rounded-xl text-center">
                    <div className="text-2xl mb-2">✅</div>
                    <p className="font-semibold">Merci !</p>
                    <p className="text-xs">Vous êtes inscrit à la newsletter.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                      type="text"
                      placeholder="Votre prénom"
                      required
                      value={formData.prenom}
                      onChange={(e) => setFormData({ ...formData, prenom: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all bg-white"
                    />
                    <input
                      type="email"
                      placeholder="Votre adresse email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all bg-white"
                    />
                    <input
                      type="tel"
                      placeholder="WhatsApp (optionnel)"
                      value={formData.whatsapp}
                      onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all bg-white"
                    />
                    <button 
                      type="submit" 
                      className="w-full py-3 rounded-xl font-bold text-white bg-gradient-to-r from-[#163365] to-orange-500 hover:from-orange-500 hover:to-[#163365] transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                    >
                      Recevoir les offres gratuitement →
                    </button>
                  </form>
                )}
                <p className="text-center text-xs text-gray-500 mt-4 flex items-center justify-center gap-1">
                  <span>🔒</span> Données protégées. Sans spam.
                </p>
              </div>
            </div>

            {/* WhatsApp direct CTA */}
            <div className="mt-6 bg-white/95 backdrop-blur-sm rounded-2xl p-4 border border-green-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
                    <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Réponse rapide</p>
                    <p className="text-sm font-semibold text-green-700">Besoin d'aide ?</p>
                  </div>
                </div>
                <a 
                  href="https://wa.me/2250711041386" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-xs font-bold transition-all"
                >
                  WhatsApp direct
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactSection