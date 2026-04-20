import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Hero from './components/home/Hero'
import ServicesSection from './components/services/ServicesSection'
import HowItWorks from './components/howItWorks/HowItWorks'
import Testimonials from './components/testimonials/Testimonials'
import ContactSection from './components/contact/ContactSection'
import WhatsAppFab from './components/common/WhatsAppFab'
import ScrollTop from './components/layout/ScrollTop'
import InscriptionModal from './components/modal/InscriptionModal'
import AdminPage from './pages/AdminPage'

function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Enregistrer la visite
  useEffect(() => {
    fetch(`/api/stats/visit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ page: 'home' })
    }).catch(err => console.log('Stats error:', err))
  }, [])

  // Vérifier l'URL pour ouvrir automatiquement le modal (?form=open)
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    if (urlParams.get('form') === 'open') {
      setIsModalOpen(true)
      window.history.replaceState({}, document.title, window.location.pathname)
    }
  }, [])

  // Rendre la fonction openModal accessible globalement
  useEffect(() => {
    window.openModal = () => setIsModalOpen(true)
    return () => {
      delete window.openModal
    }
  }, [])

  return (
    <div className="font-sans text-sm text-gray-600 bg-white overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <ServicesSection />
        <HowItWorks />
        <Testimonials />
        <ContactSection />
      </main>
      <Footer />
      <WhatsAppFab />
      <ScrollTop />
      
      <InscriptionModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App