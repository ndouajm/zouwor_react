import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-[#0d1b2a] text-white/70 py-12 px-[5%] pb-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-10 pb-8 border-b border-white/5">
        <div>
          <Link to="/" className="text-xl font-bold text-white no-underline inline-block mb-3">
            <img src="/img/logo.png" alt="Logo" className="w-32 h-16 object-contain" />
          </Link>
          <p className="text-xs leading-7 mb-4 max-w-[240px]">Votre centrale d'achat pour importer depuis la Chine vers la Côte d'Ivoire. Sourcing, transport, dédouanement et livraison gérés de A à Z.</p>
          <div className="flex gap-2">
            <a href="https://chat.whatsapp.com/GfNhdBTDh6A4a1sF5ufGmC" className="w-9 h-9 rounded-lg flex items-center justify-center text-white/60 hover:bg-green-500 hover:text-white transition-all" style={{background: 'rgba(255,255,255,.07)', border: '1px solid rgba(255,255,255,.1)'}}>
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            </a>
            <a href="#" className="w-9 h-9 rounded-lg flex items-center justify-center text-white/60 hover:bg-blue-600 hover:text-white transition-all" style={{background: 'rgba(255,255,255,.07)', border: '1px solid rgba(255,255,255,.1)'}}>
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </a>
            <a href="https://t.me/+WRsFr0iIEFMyZDY0" className="w-9 h-9 rounded-lg flex items-center justify-center text-white/60 hover:bg-[#26A5E4] hover:text-white transition-all" style={{background: 'rgba(255,255,255,.07)', border: '1px solid rgba(255,255,255,.1)'}}>
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.13-.06-.18-.07-.05-.17-.03-.25-.02-.11.02-1.93 1.23-5.44 3.6-.51.35-.98.52-1.4.51-.46-.01-1.35-.26-2.01-.48-.81-.27-1.46-.41-1.4-.87.03-.24.36-.48.99-.74 2.15-.94 3.86-1.56 5.14-1.87 2.45-.58 2.96-.68 3.29-.68.07 0 .23.02.33.12.09.1.11.23.11.34 0 .08.01.18-.02.28z"/></svg>
            </a>
          </div>
        </div>
        
        <div>
          <h4 className="text-[11px] font-bold text-white uppercase tracking-wider mb-3">Services</h4>
          <ul className="list-none flex flex-col gap-2">
            <li><a href="#services" className="text-xs text-white/55 no-underline hover:text-white transition-colors flex items-center gap-1.5 before:content-['›'] before:text-orange-500 before:font-bold">Sourcing en Chine</a></li>
            <li><a href="#services" className="text-xs text-white/55 no-underline hover:text-white transition-colors flex items-center gap-1.5 before:content-['›'] before:text-orange-500 before:font-bold">Fret Maritime & Aérien</a></li>
            <li><a href="#services" className="text-xs text-white/55 no-underline hover:text-white transition-colors flex items-center gap-1.5 before:content-['›'] before:text-orange-500 before:font-bold">Dédouanement</a></li>
            <li><a href="#services" className="text-xs text-white/55 no-underline hover:text-white transition-colors flex items-center gap-1.5 before:content-['›'] before:text-orange-500 before:font-bold">Livraison Locale</a></li>
          </ul>
        </div>
        
        <div>
          <h4 className="text-[11px] font-bold text-white uppercase tracking-wider mb-3">Liens rapides</h4>
          <ul className="list-none flex flex-col gap-2">
            <li><a href="#" className="text-xs text-white/55 no-underline hover:text-white transition-colors flex items-center gap-1.5 before:content-['›'] before:text-orange-500 before:font-bold">Accueil</a></li>
            <li><a href="#services" className="text-xs text-white/55 no-underline hover:text-white transition-colors flex items-center gap-1.5 before:content-['›'] before:text-orange-500 before:font-bold">Nos services</a></li>
            <li><a href="#contact" className="text-xs text-white/55 no-underline hover:text-white transition-colors flex items-center gap-1.5 before:content-['›'] before:text-orange-500 before:font-bold">Contact</a></li>
          </ul>
        </div>
        
        <div>
          <h4 className="text-[11px] font-bold text-white uppercase tracking-wider mb-3">Contact</h4>
          <ul className="list-none flex flex-col gap-2">
            <li><span className="text-xs text-white/55 flex items-center gap-1.5 before:content-['›'] before:text-orange-500 before:font-bold">📍 Abidjan, Côte d'Ivoire</span></li>
            <li><a href="tel:+2250711041386" className="text-xs text-white/55 no-underline hover:text-white transition-colors flex items-center gap-1.5 before:content-['›'] before:text-orange-500 before:font-bold">📞 +225 07 11 04 13 86</a></li>
            <li><a href="mailto:equipezouwor@gmail.com" className="text-xs text-white/55 no-underline hover:text-white transition-colors flex items-center gap-1.5 before:content-['›'] before:text-orange-500 before:font-bold">📧 equipezouwor@gmail.com</a></li>
          </ul>
        </div>
      </div>
      <div className="text-center text-[11px] text-white/30">
        © 2026 Zouwor. Tous droits réservés. Import–Export Chine–Côte d'Ivoire.
      </div>
    </footer>
  )
}

export default Footer