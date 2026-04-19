import { useState, useEffect, useRef } from 'react'

const HowItWorks = () => {
  const [activeStep, setActiveStep] = useState(0)
  const stepsRef = useRef([])

  const steps = [
    { 
      num: '01', 
      title: 'Rejoignez la communauté', 
      desc: 'Inscrivez-vous gratuitement. Accès immédiat aux offres d\'importation groupée.',
      icon: '👥',
      color: 'bg-[#163365]'
    },
    { 
      num: '02', 
      title: 'Choisissez vos produits', 
      desc: 'Parcourez notre catalogue ou dites-nous ce que vous voulez. Nos experts sourcent pour vous.',
      icon: '🛍️',
      color: 'bg-[#163365]'
    },
    { 
      num: '03', 
      title: 'Nous gérons tout', 
      desc: 'Achat, expédition, douane, livraison. Suivi en temps réel via WhatsApp.',
      icon: '📦',
      color: 'bg-[#163365]'
    },
    { 
      num: '04', 
      title: 'Vendez & prospérez', 
      desc: 'Réceptionnez vos marchandises, vendez et réinvestissez. Votre commerce grandit.',
      icon: '📈',
      color: 'bg-[#163365]'
    }
  ]

  // Animation au scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = stepsRef.current.findIndex(ref => ref === entry.target)
            if (index !== -1) {
              setTimeout(() => setActiveStep(index), index * 200)
            }
          }
        })
      },
      { threshold: 0.3 }
    )

    stepsRef.current.forEach(ref => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section 
      className="min-h-screen flex items-center justify-center px-[5%] py-16"
      style={{ backgroundColor: '#EFC7B3' }}
      id="howitworks"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block bg-[#163365]/10 text-[#163365] text-xs font-bold tracking-[3px] uppercase px-4 py-1.5 rounded-full mb-4">
            🚀 Processus simple
          </span>
          <h2 className="font-bold text-[#163365] text-3xl md:text-4xl mb-4">
            Votre importation<br />
            <span className="text-orange-600">en 4 étapes</span>
          </h2>
          <div className="w-20 h-1 bg-orange-500 mx-auto rounded-full mb-4"></div>
          <p className="text-[#163365]/70 text-sm max-w-md mx-auto">
            Pas besoin d'expérience. Nous vous guidons de A à Z.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Timeline Section */}
          <div className="relative">
            {/* Ligne de temps verticale */}
            <div className="absolute left-5 top-8 bottom-8 w-0.5 bg-[#163365]/20 hidden md:block"></div>
            
            <div className="space-y-6">
              {steps.map((step, index) => (
                <div
                  key={index}
                  ref={el => stepsRef.current[index] = el}
                  className={`relative flex gap-5 transition-all duration-500 transform ${
                    activeStep >= index ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'
                  }`}
                >
                  {/* Timeline node */}
                  <div className="relative z-10">
                    <div 
                      className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm text-white transition-all duration-300 ${
                        activeStep >= index ? step.color : 'bg-[#163365]/40'
                      }`}
                      style={{
                        boxShadow: activeStep >= index ? '0 0 0 4px rgba(249,115,22,0.2)' : 'none'
                      }}
                    >
                      {step.num}
                    </div>
                    {index < steps.length - 1 && (
                      <div className="absolute top-12 left-5 w-0.5 h-12 bg-[#163365]/20 md:hidden"></div>
                    )}
                  </div>

                  {/* Contenu */}
                  <div className="flex-1 pb-6">
                    <div className="bg-white/90 backdrop-blur-sm rounded-xl p-5 shadow-md hover:shadow-lg transition-all duration-300 border border-white/50 hover:border-orange-200">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-2xl">{step.icon}</span>
                        <h4 className="font-bold text-[#163365]">{step.title}</h4>
                      </div>
                      <p className="text-sm text-[#163365]/70 leading-relaxed">{step.desc}</p>
                      
                      {/* Petit indicateur de progression */}
                      {activeStep >= index && (
                        <div className="mt-3 flex items-center gap-2">
                          <div className="w-16 h-1 bg-orange-200 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-orange-500 rounded-full transition-all duration-1000"
                              style={{ width: activeStep === index ? '100%' : '0%' }}
                            />
                          </div>
                          <span className="text-[10px] text-orange-600 font-medium">
                            {activeStep === index ? 'En cours' : '✓ Terminé'}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Offre de bienvenue améliorée - GRATUIT SANS PRIX BARRÉ */}
          <div className="relative lg:sticky lg:top-24">
            {/* Badge de promo */}
            <div className="absolute -top-3 -right-3 z-20">
              <div className="bg-orange-500 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-lg animate-pulse">
                🎁 100% GRATUIT
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-xl border-2 border-orange-100 relative overflow-hidden">
              {/* Décoration de fond */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-orange-500/5 rounded-full"></div>
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-orange-500/5 rounded-full"></div>
              
              <div className="relative z-10">
                {/* En-tête offre */}
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">🎁</span>
                  <span className="inline-block bg-orange-500 text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide">
                    Offre de bienvenue
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-[#163365] mb-3">
                  Première importation ?
                  <br />
                  <span className="text-orange-500">On vous accompagne gratuitement !</span>
                </h3>
                
                <p className="text-gray-500 text-sm mb-6">
                  Rejoignez Zouwor et bénéficiez d'un accompagnement personnalisé pour votre première commande, quel que soit votre budget.
                </p>

                {/* Avantages avec icônes */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-xl">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-sm flex-shrink-0">💬</div>
                    <div>
                      <div className="font-semibold text-[#163365] text-sm">Consultation gratuite</div>
                      <div className="text-xs text-gray-500">Avec un expert import</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-xl">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-sm flex-shrink-0">📱</div>
                    <div>
                      <div className="font-semibold text-[#163365] text-sm">Suivi WhatsApp dédié</div>
                      <div className="text-xs text-gray-500">En français, 6j/7</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-xl">
                    <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-sm flex-shrink-0">📦</div>
                    <div>
                      <div className="font-semibold text-[#163365] text-sm">Groupements d'achat</div>
                      <div className="text-xs text-gray-500">Jusqu'à -30% sur le transport</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-xl">
                    <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-sm flex-shrink-0">💰</div>
                    <div>
                      <div className="font-semibold text-[#163365] text-sm">Budget dès 50 000 FCFA</div>
                      <div className="text-xs text-gray-500">Accessible à tous les commerçants</div>
                    </div>
                  </div>
                </div>

                {/* CTA GRATUIT */}
                <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-4 mb-4 text-center">
                  <div className="text-white text-3xl font-bold">GRATUIT</div>
                  <div className="text-white/80 text-xs">Inscription sans engagement • 100% gratuit</div>
                </div>

                <button 
                  onClick={() => window.openModal && window.openModal()}
                  className="w-full py-3.5 rounded-xl font-bold text-white bg-[#163365] hover:bg-orange-500 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center justify-center gap-2 group"
                >
                  <span>Je rejoins Zouwor maintenant</span>
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>

                <p className="text-center text-[10px] text-gray-400 mt-3">
                  🔒 Inscription gratuite • Sans engagement • Annulation possible
                </p>
              </div>
            </div>

            {/* Témoignage éclair */}
            <div className="mt-4 flex items-center justify-center gap-2 text-xs text-[#163365]/60">
              <div className="flex -space-x-2">
                <div className="w-6 h-6 rounded-full bg-[#163365]/20 border-2 border-white flex items-center justify-center text-[8px]">👤</div>
                <div className="w-6 h-6 rounded-full bg-[#163365]/20 border-2 border-white flex items-center justify-center text-[8px]">👤</div>
                <div className="w-6 h-6 rounded-full bg-[#163365]/20 border-2 border-white flex items-center justify-center text-[8px]">👤</div>
              </div>
              <span>+500 commerçants nous font confiance</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HowItWorks