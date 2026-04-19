import { useState, useEffect } from 'react'

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const API_URL = import.meta.env.VITE_API_URL

  const slides = [
    'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1920&q=85',
    'https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&w=1920&q=85',
    'https://images.unsplash.com/photo-1566647302664-9d4d06c64b98?q=80&w=1170&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1920&q=85'
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [slides.length])

  const downloadCatalogue = async () => {
    try {
      await fetch(`${API_URL}/api/downloads/catalogue`, { method: 'POST' })
      window.open('/files/catalogue.pdf', '_blank')
    } catch (error) {
      window.open('/files/catalogue.pdf', '_blank')
    }
  }

  return (
    <header className="relative h-screen min-h-[560px] overflow-hidden" id="accueil">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out bg-cover bg-center ${
            index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
          style={{ backgroundImage: `url('${slide}')` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/20"></div>
        </div>
      ))}

      {/* Contenu texte - identique à avant */}
      <div className="absolute inset-0 z-20 flex flex-col justify-center items-start px-[6%]">
        <div className="anim-1 bg-navy/80 backdrop-blur-sm border border-white/15 rounded-2xl p-8 md:p-10 max-w-[580px] shadow-2xl">
          <div className="anim-1 inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full text-orange-200 text-xs font-bold tracking-widest uppercase bg-orange-500/20 border border-orange-500/45">
            🇨🇳 Chine → 🇨🇮 Côte d'Ivoire
          </div>
          <h1 className="anim-2 text-white font-bold leading-tight mb-3 text-[clamp(1.75rem,3.8vw,2.9rem)] tracking-tight">
            Moins de risques,<br /><span className="text-orange-400">plus de profits.</span>
          </h1>
          <p className="anim-3 text-white/85 text-sm leading-7 mb-7">
            Zouwor vous met en relation avec les meilleurs fournisseurs et gère toute la logistique de transport et de livraison jusqu'à votre porte en Côte d'Ivoire.
          </p>
          <div className="anim-4 flex gap-3 flex-wrap">
            <button
              onClick={downloadCatalogue}
              className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-7 py-3 rounded-md text-xs font-bold transition-all shadow-lg shadow-orange-500/40 hover:shadow-orange-500/60 hover:-translate-y-0.5"
            >
              Télécharger notre Catalogue 📘
            </button>
          </div>
        </div>
      </div>

      {/* Points de navigation */}
      <div className="absolute right-[3%] top-1/2 -translate-y-1/2 z-20 flex flex-col gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`transition-all duration-300 ${
              index === currentSlide
                ? 'bg-orange-500 h-6 w-2 rounded-md'
                : 'bg-white/50 w-2 h-2 rounded-full'
            }`}
          />
        ))}
      </div>

      {/* Flèches */}
      <button
        onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
        className="hidden md:flex absolute left-[2%] top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full items-center justify-center text-white bg-black/30 backdrop-blur-sm border border-white/35 hover:bg-orange-500 transition-all"
      >
        ←
      </button>
      <button
        onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
        className="hidden md:flex absolute right-[2%] top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full items-center justify-center text-white bg-black/30 backdrop-blur-sm border border-white/35 hover:bg-orange-500 transition-all"
      >
        →
      </button>

      {/* Barre de statistiques */}
      <div className="absolute bottom-0 left-0 right-0 z-20 flex flex-wrap bg-navy/80 backdrop-blur-sm border-t border-white/10">
        <div className="flex-1 flex flex-col items-center py-4 border-r border-white/10">
          <span className="text-xl font-bold text-white">500<span className="text-orange-500">+</span></span>
          <span className="text-[11px] text-gray-300">Membres actifs</span>
        </div>
        <div className="flex-1 flex flex-col items-center py-4 border-r border-white/10">
          <span className="text-xl font-bold text-white">5 ⭐</span>
          <span className="text-[11px] text-gray-300">Satisfaction client</span>
        </div>
        <div className="flex-1 flex flex-col items-center py-4 border-r border-white/10">
          <span className="text-xl font-bold text-white">12<span className="text-sm">h</span></span>
          <span className="text-[11px] text-gray-300">Délai de réponse</span>
        </div>
        <div className="flex-1 flex flex-col items-center py-4">
          <span className="text-xl font-bold text-white">100<span className="text-orange-500">%</span></span>
          <span className="text-[11px] text-gray-300">Dédouanement géré</span>
        </div>
      </div>
    </header>
  )
}

export default Hero