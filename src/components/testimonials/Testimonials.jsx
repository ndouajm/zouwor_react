import { useState, useEffect, useRef } from 'react'

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)

  const testimonials = [
    { 
      name: 'Adjoua Kouamé', 
      role: 'Commerçante, Yopougon', 
      text: 'Grâce à Zouwor, j\'ai pu importer mes premiers téléphones depuis la Chine sans rien connaître au commerce international. Tout a été géré pour moi.', 
      initials: 'AK',
      rating: 5,
      image: null,
      product: '📱 Téléphones'
    },
    { 
      name: 'Boubacar Traoré', 
      role: 'Importateur, Bouaké', 
      text: 'Le suivi WhatsApp est vraiment excellent. Je savais exactement où était ma marchandise à chaque étape. Je recommande fortement Zouwor à tous mes collègues.', 
      initials: 'BT',
      rating: 5,
      image: null,
      product: '📦 Électronique'
    },
    { 
      name: 'Marie-Claire Diallo', 
      role: 'Boutique mode, Cocody', 
      text: 'J\'avais peur du dédouanement, mais l\'équipe a tout géré. En 3 semaines, mes produits étaient dans mon magasin à Cocody. Un vrai gain de temps !', 
      initials: 'MD',
      rating: 5,
      image: null,
      product: '👗 Mode'
    }
  ]

  // Animation au scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  // Rotation automatique des témoignages (optionnel)
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length)
    }, 8000)
    return () => clearInterval(timer)
  }, [testimonials.length])

  return (
    <section ref={sectionRef} className="py-20 px-[5%] bg-white" id="testimonials">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block bg-orange-100 text-orange-600 text-xs font-bold tracking-[3px] uppercase px-4 py-1.5 rounded-full mb-4">
            💬 Témoignages
          </span>
          <h2 className="font-bold text-gray-900 text-3xl md:text-4xl mb-4">
            Ils font confiance à <span className="text-[#163365]">Zouwor</span>
          </h2>
          <div className="w-20 h-1 bg-orange-500 mx-auto rounded-full mb-4"></div>
          <p className="text-gray-500 text-sm max-w-md mx-auto">
            Découvrez les expériences de nos commerçants partenaires
          </p>
        </div>

        {/* Version Desktop - Grille */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-8">
          {testimonials.map((t, index) => (
            <div
              key={index}
              className={`group relative bg-white rounded-2xl p-6 transition-all duration-500 hover:shadow-2xl cursor-pointer ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
              style={{
                transitionDelay: `${index * 150}ms`,
                border: '1px solid #f0f0f0',
                boxShadow: '0 4px 20px rgba(0,0,0,0.05)'
              }}
            >
              {/* Badge produit */}
              <div className="absolute -top-3 -right-3 z-10">
                <span className="bg-orange-500 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-lg">
                  {t.product}
                </span>
              </div>

              {/* Citation icon */}
              <div className="absolute top-6 right-6 text-6xl text-orange-100 font-serif">"</div>

              {/* Étoiles */}
              <div className="flex gap-1 mb-4">
                {[...Array(t.rating)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-amber-400 fill-current" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
              </div>

              {/* Texte */}
              <p className="text-gray-600 text-sm leading-relaxed mb-6 relative z-10 min-h-[100px]">
                "{t.text}"
              </p>

              {/* Séparateur */}
              <div className="border-t border-gray-100 my-4"></div>

              {/* Auteur */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#163365] to-orange-500 text-white flex items-center justify-center font-bold text-sm flex-shrink-0 shadow-md">
                  {t.initials}
                </div>
                <div>
                  <div className="font-bold text-gray-900">{t.name}</div>
                  <div className="text-xs text-gray-400">{t.role}</div>
                </div>
              </div>

              {/* Ligne décorative au survol */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#163365] to-orange-500 rounded-b-2xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </div>
          ))}
        </div>

        {/* Version Mobile - Slider */}
        <div className="lg:hidden relative">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {testimonials.map((t, index) => (
                <div key={index} className="w-full flex-shrink-0 px-2">
                  <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                    <div className="absolute -top-3 -right-3">
                      <span className="bg-orange-500 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-lg">
                        {t.product}
                      </span>
                    </div>
                    <div className="flex gap-1 mb-4">
                      {[...Array(t.rating)].map((_, i) => (
                        <svg key={i} className="w-5 h-5 text-amber-400 fill-current" viewBox="0 0 24 24">
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed mb-6 min-h-[100px]">
                      "{t.text}"
                    </p>
                    <div className="border-t border-gray-100 my-4"></div>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#163365] to-orange-500 text-white flex items-center justify-center font-bold text-sm">
                        {t.initials}
                      </div>
                      <div>
                        <div className="font-bold text-gray-900">{t.name}</div>
                        <div className="text-xs text-gray-400">{t.role}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots navigation */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`transition-all duration-300 ${
                  activeIndex === index
                    ? 'w-8 h-2 bg-orange-500 rounded-full'
                    : 'w-2 h-2 bg-gray-300 rounded-full'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Statistiques de confiance */}
        <div className="mt-16 pt-8 border-t border-gray-100">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-2xl font-bold text-[#163365]">500+</div>
              <div className="text-xs text-gray-400">Commerçants actifs</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-[#163365]">98%</div>
              <div className="text-xs text-gray-400">Satisfaction client</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-[#163365]">50+</div>
              <div className="text-xs text-gray-400">Villes desservies</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-[#163365]">24/7</div>
              <div className="text-xs text-gray-400">Support disponible</div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <button 
            onClick={() => window.openModal && window.openModal()}
            className="inline-flex items-center gap-2 bg-[#163365] hover:bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            📢 Rejoignez nos commerçants satisfaits
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}

export default Testimonials