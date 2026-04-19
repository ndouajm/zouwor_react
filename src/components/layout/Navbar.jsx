import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-[900] h-[68px] flex items-center justify-between px-[5%] transition-all duration-300 ${
        scrolled ? 'bg-white/97 backdrop-blur-lg shadow-md border-b border-gray-100' : 'bg-transparent'
      }`}>
        <Link to="/" className="flex items-center gap-2 no-underline min-w-[110px]">
          <img src="/img/logo.png" alt="Logo" className="w-32 h-16 object-contain" />
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex gap-8 list-none items-center">
          <li>
            <Link to="/" className={`no-underline text-sm font-medium transition-colors relative group ${
              scrolled ? 'text-gray-800' : 'text-white drop-shadow-lg'
            }`}>
              Accueil
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 transition-all duration-300 group-hover:w-full rounded-sm"></span>
            </Link>
          </li>
          <li>
            <a href="#services" className={`no-underline text-sm font-medium transition-colors relative group ${
              scrolled ? 'text-gray-800' : 'text-white drop-shadow-lg'
            }`}>
              Services
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 transition-all duration-300 group-hover:w-full rounded-sm"></span>
            </a>
          </li>
          <li>
            <a href="#contact" className={`no-underline text-sm font-medium transition-colors relative group ${
              scrolled ? 'text-gray-800' : 'text-white drop-shadow-lg'
            }`}>
              Contact
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 transition-all duration-300 group-hover:w-full rounded-sm"></span>
            </a>
          </li>
        </ul>

        <button 
          onClick={() => window.openModal ? window.openModal() : alert('Formulaire à venir')}
          className="hidden md:inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-5 py-2.5 rounded-md text-xs font-bold transition-all duration-300 shadow-lg shadow-orange-500/40 hover:shadow-orange-500/60 hover:-translate-y-0.5"
        >
          Rejoignez-nous →
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
          <div className="flex flex-col gap-1">
            <Link to="/" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-700 font-medium text-sm hover:bg-orange-50 hover:text-orange-600 transition-colors">
              🏠 Accueil
            </Link>
            <a href="#services" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-700 font-medium text-sm hover:bg-orange-50 hover:text-orange-600 transition-colors">
              📦 Services
            </a>
            <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-700 font-medium text-sm hover:bg-orange-50 hover:text-orange-600 transition-colors">
              📞 Contact
            </a>
          </div>
        </div>

        <div className="px-5 py-4 border-b border-gray-100">
          <button 
            onClick={() => {
              window.openModal ? window.openModal() : alert('Formulaire à venir')
              setMobileMenuOpen(false)
            }}
            className="w-full bg-gradient-to-r from-[#163365] to-orange-500 text-white py-3 rounded-lg font-bold text-sm shadow-lg hover:opacity-90 transition-opacity"
          >
            🛍️ Rejoindre Zouwor →
          </button>
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