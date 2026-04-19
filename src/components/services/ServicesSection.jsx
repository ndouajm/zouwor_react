import { useState } from 'react'

const ServicesSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null)

  const services = [
    { 
      icon: '🔍', 
      title: 'Sourcing & Négociation', 
      desc: 'Identification des meilleurs fournisseurs chinois, vérification qualité et négociation des prix compétitifs.',
      tag: 'Chine',
      features: ['✅ Fournisseurs vérifiés', '✅ Prix négociés']
    },
    { 
      icon: '🚢', 
      title: 'Fret Maritime & Aérien', 
      desc: 'Solutions flexibles — conteneur FCL, groupage LCL ou fret aérien express selon vos délais.',
      tag: 'Transport',
      features: ['✅ Départ Chine', '✅ Arrivée Abidjan']
    },
    { 
      icon: '📑', 
      title: 'Dédouanement Abidjan', 
      desc: 'Prise en charge complète des formalités douanières au port d\'Abidjan. Zéro blocage.',
      tag: 'Douane',
      features: ['✅ Documents préparés', '✅ Suivi en temps réel']
    },
    { 
      icon: '📦', 
      title: 'Entreposage Sécurisé', 
      desc: 'Entrepôts sécurisés en Chine et à Abidjan avant livraison finale.',
      tag: 'Stockage',
      features: ['✅ 24h/24 surveillance', '✅ Assurance incluse']
    },
    { 
      icon: '🚚', 
      title: 'Livraison Porte-à-Porte', 
      desc: 'Acheminement depuis le port d\'Abidjan jusqu\'à votre boutique, partout en Côte d\'Ivoire.',
      tag: 'Livraison CI',
      features: ['✅ Partout en CI', '✅ Livraison express']
    },
    { 
      icon: '💬', 
      title: 'Accompagnement WhatsApp', 
      desc: 'Suivi personnalisé en français à chaque étape. Un expert dédié vous répond rapidement.',
      tag: 'Support',
      features: ['✅ Réponse < 12h', '✅ Support 6j/7']
    }
  ]

  return (
    <section className="py-20 px-[5%] bg-gradient-to-b from-white to-orange-50/30" id="services">
      <div className="text-center mb-12">
        <span className="inline-block text-orange-500 text-xs font-bold tracking-[3px] uppercase mb-3">Nos services</span>
        <h2 className="font-bold text-gray-900 text-3xl md:text-4xl mb-4">
          Tout votre import géré,<br />
          <span className="text-[#163365]">de A à Z.</span>
        </h2>
        <div className="w-20 h-1 bg-orange-500 mx-auto rounded-full mb-4"></div>
        <p className="text-gray-500 text-sm max-w-lg mx-auto">
          De la recherche du fournisseur jusqu'à votre porte, Zouwor prend en charge chaque étape.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {services.map((service, index) => (
          <div
            key={index}
            className="group relative bg-white rounded-2xl p-6 transition-all duration-300 cursor-pointer overflow-hidden"
            style={{
              boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
              border: '1px solid #eef2f6'
            }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {/* Fond orange au survol - animation douce */}
            <div 
              className="absolute inset-0 bg-orange-500 transition-all duration-500 ease-out"
              style={{
                transform: hoveredIndex === index ? 'translateY(0)' : 'translateY(100%)',
                opacity: hoveredIndex === index ? 1 : 0
              }}
            />
            
            {/* Contenu */}
            <div className="relative z-10 transition-all duration-300">
              {/* Icône */}
              <div 
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-5 transition-all duration-300"
                style={{
                  backgroundColor: hoveredIndex === index ? 'rgba(255,255,255,0.2)' : '#FFF3E6',
                  transform: hoveredIndex === index ? 'scale(1.05)' : 'scale(1)'
                }}
              >
                <span className={hoveredIndex === index ? 'text-white' : 'text-orange-500'}>
                  {service.icon}
                </span>
              </div>

              {/* Titre */}
              <h3 
                className="font-bold text-lg mb-3 transition-colors duration-300"
                style={{ color: hoveredIndex === index ? '#FFFFFF' : '#1a1a2e' }}
              >
                {service.title}
              </h3>

              {/* Description */}
              <p 
                className="text-sm leading-relaxed mb-4 transition-colors duration-300"
                style={{ color: hoveredIndex === index ? 'rgba(255,255,255,0.85)' : '#666666' }}
              >
                {service.desc}
              </p>

              {/* Features list */}
              <div className="space-y-1.5 mb-4">
                {service.features.map((feature, fIndex) => (
                  <div 
                    key={fIndex} 
                    className="flex items-center gap-2 text-xs transition-colors duration-300"
                    style={{ color: hoveredIndex === index ? 'rgba(255,255,255,0.7)' : '#888888' }}
                  >
                    <span className={hoveredIndex === index ? 'text-white' : 'text-orange-500'}>
                      {feature.split('✅')[0] + '✓'}
                    </span>
                    <span>{feature.replace('✅ ', '')}</span>
                  </div>
                ))}
              </div>

              {/* Tag */}
              <div className="pt-3 border-t" style={{ borderColor: hoveredIndex === index ? 'rgba(255,255,255,0.2)' : '#f0f0f0' }}>
                <span 
                  className="inline-block text-[10px] font-bold px-3 py-1 rounded-full transition-all duration-300"
                  style={{
                    backgroundColor: hoveredIndex === index ? 'rgba(255,255,255,0.2)' : '#FFF3E6',
                    color: hoveredIndex === index ? '#FFFFFF' : '#F97316'
                  }}
                >
                  {service.tag}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CTA supplémentaire */}
      <div className="text-center mt-12">
        <button 
          onClick={() => window.openModal && window.openModal()}
          className="inline-flex items-center gap-2 bg-[#163365] hover:bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
        >
          📞 Discuter de votre projet
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </button>
      </div>
    </section>
  )
}

export default ServicesSection