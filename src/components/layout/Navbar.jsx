import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Vérifier si on est sur la page d'accueil pour les ancres
  const isHomePage = location.pathname === '/'

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-[900] h-[80px] flex items-center justify-between px-[5%] transition-all duration-300 ${
        scrolled ? 'bg-white/98 backdrop-blur-lg shadow-md border-b border-gray-100' : 'bg-transparent'
      }`}>
        <Link to="/" className="flex items-center gap-2 no-underline min-w-[110px]">
          <img src="/img/logo.png" alt="Logo" className="w-36 h-20 object-contain" />
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex gap-10 list-none items-center">
          <li>
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                `no-underline text-base font-semibold transition-colors relative group ${
                  scrolled ? 'text-gray-800' : 'text-white drop-shadow-lg'
                } ${isActive ? 'text-orange-500' : ''}`
              }
              end
            >
              Accueil
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 transition-all duration-300 group-hover:w-full rounded-sm"></span>
            </NavLink>
          </li>
          <li>
            {isHomePage ? (
              <a 
                href="#services" 
                className={`no-underline text-base font-semibold transition-colors relative group ${
                  scrolled ? 'text-gray-800' : 'text-white drop-shadow-lg'
                }`}
                onClick={(e) => {
                  e.preventDefault()
                  document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                Services
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 transition-all duration-300 group-hover:w-full rounded-sm"></span>
              </a>
            ) : (
              <Link 
                to="/#services" 
                className={`no-underline text-base font-semibold transition-colors relative group ${
                  scrolled ? 'text-gray-800' : 'text-white drop-shadow-lg'
                }`}
              >
                Services
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 transition-all duration-300 group-hover:w-full rounded-sm"></span>
              </Link>
            )}
          </li>
          <li>
            {isHomePage ? (
              <a 
                href="#contact" 
                className={`no-underline text-base font-semibold transition-colors relative group ${
                  scrolled ? 'text-gray-800' : 'text-white drop-shadow-lg'
                }`}
                onClick={(e) => {
                  e.preventDefault()
                  document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                Contact
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 transition-all duration-300 group-hover:w-full rounded-sm"></span>
              </a>
            ) : (
              <Link 
                to="/#contact" 
                className={`no-underline text-base font-semibold transition-colors relative group ${
                  scrolled ? 'text-gray-800' : 'text-white drop-shadow-lg'
                }`}
              >
                Contact
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 transition-all duration-300 group-hover:w-full rounded-sm"></span>
              </Link>
            )}
          </li>
          <li>
            <NavLink 
              to="/shop" 
              className={({ isActive }) => 
                `no-underline text-base font-semibold transition-colors relative group ${
                  scrolled ? 'text-gray-800' : 'text-white drop-shadow-lg'
                } ${isActive ? 'text-orange-500' : ''}`
              }
            >
              🛍️ Boutique
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 transition-all duration-300 group-hover:w-full rounded-sm"></span>
            </NavLink>
          </li>
        </ul>

        {/* Bouton Rejoindre - PLUS GROS ET VISIBLE */}
        <button 
          onClick={() => window.openModal ? window.openModal() : alert('Formulaire à venir')}
          className="hidden md:inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-7 py-3 rounded-xl text-sm font-bold transition-all duration-300 shadow-lg shadow-orange-500/50 hover:shadow-orange-500/70 hover:-translate-y-0.5 border border-orange-400"
        >
          🚀 Rejoindre Zouwor
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </button>

        {/* Mobile menu button */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden flex flex-col gap-1.5 bg-none border-none p-1 z-[1001] relative"
        >
          <span className={`block w-6 h-0.5 rounded-sm transition-all duration-300 ${
            scrolled ? 'bg-gray-800' : 'bg-white drop-shadow-md'
          } ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
          <span className={`block w-6 h-0.5 rounded-sm transition-all duration-300 ${
            scrolled ? 'bg-gray-800' : 'bg-white drop-shadow-md'
          } ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
          <span className={`block w-6 h-0.5 rounded-sm transition-all duration-300 ${
            scrolled ? 'bg-gray-800' : 'bg-white drop-shadow-md'
          } ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
        </button>
      </nav>

      {/* Mobile menu panel */}
      <div className={`fixed top-0 right-0 bottom-0 w-[82%] max-w-[340px] bg-white z-[1000] shadow-2xl transition-transform duration-350 overflow-y-auto ${
        mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <img src="/img/logo.png" alt="Logo" className="w-28 h-14 object-contain" />
          <button onClick={() => setMobileMenuOpen(false)} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-red-50 hover:text-red-500 transition-colors text-lg">
            ×
          </button>
        </div>
        
        <div className="px-5 py-4 border-b border-gray-100">
          <p className="text-xs uppercase tracking-widest text-gray-400 font-semibold mb-3">Navigation</p>
          <div className="flex flex-col gap-2">
            <NavLink 
              to="/" 
              onClick={() => setMobileMenuOpen(false)} 
              className={({ isActive }) => 
                `flex items-center gap-3 px-3 py-3 rounded-lg font-medium text-sm transition-colors ${
                  isActive ? 'bg-orange-50 text-orange-600' : 'text-gray-700 hover:bg-orange-50 hover:text-orange-600'
                }`
              }
              end
            >
              🏠 Accueil
            </NavLink>
            {isHomePage ? (
              <a 
                href="#services" 
                onClick={() => setMobileMenuOpen(false)} 
                className="flex items-center gap-3 px-3 py-3 rounded-lg text-gray-700 font-medium text-sm hover:bg-orange-50 hover:text-orange-600 transition-colors"
              >
                📦 Services
              </a>
            ) : (
              <Link 
                to="/#services" 
                onClick={() => setMobileMenuOpen(false)} 
                className="flex items-center gap-3 px-3 py-3 rounded-lg text-gray-700 font-medium text-sm hover:bg-orange-50 hover:text-orange-600 transition-colors"
              >
                📦 Services
              </Link>
            )}
            {isHomePage ? (
              <a 
                href="#contact" 
                onClick={() => setMobileMenuOpen(false)} 
                className="flex items-center gap-3 px-3 py-3 rounded-lg text-gray-700 font-medium text-sm hover:bg-orange-50 hover:text-orange-600 transition-colors"
              >
                📞 Contact
              </a>
            ) : (
              <Link 
                to="/#contact" 
                onClick={() => setMobileMenuOpen(false)} 
                className="flex items-center gap-3 px-3 py-3 rounded-lg text-gray-700 font-medium text-sm hover:bg-orange-50 hover:text-orange-600 transition-colors"
              >
                📞 Contact
              </Link>
            )}
            <NavLink 
              to="/shop" 
              onClick={() => setMobileMenuOpen(false)} 
              className={({ isActive }) => 
                `flex items-center gap-3 px-3 py-3 rounded-lg font-medium text-sm transition-colors ${
                  isActive ? 'bg-orange-50 text-orange-600' : 'text-gray-700 hover:bg-orange-50 hover:text-orange-600'
                }`
              }
            >
              🛍️ Boutique
            </NavLink>
          </div>
        </div>

        <div className="px-5 py-6 border-b border-gray-100">
          <button 
            onClick={() => {
              window.openModal ? window.openModal() : alert('Formulaire à venir')
              setMobileMenuOpen(false)
            }}
            className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-4 rounded-xl font-bold text-base shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
          >
            🚀 Rejoindre Zouwor
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>

        {/* Contact rapide dans menu mobile */}
        <div className="px-5 py-4">
          <p className="text-xs uppercase tracking-widest text-gray-400 font-semibold mb-3">Contact rapide</p>
          <a 
            href="https://wa.me/2250711041386" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-3 py-3 rounded-lg bg-green-50 text-green-700 font-medium text-sm"
          >
            💬 WhatsApp : +225 07 11 04 13 86
          </a>
        </div>
      </div>

      {/* Overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-[999] animate-fadeIn"
          onClick={() => setMobileMenuOpen(false)}
        ></div>
      )}
    </>
  )
}

export default Navbar