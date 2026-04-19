import { useState, useEffect } from 'react'

const ScrollTop = () => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      setVisible(window.scrollY > 400)
    }
    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-[88px] right-6 w-10 h-10 bg-[#163365] rounded-lg text-white border-none cursor-pointer z-[500] flex items-center justify-center text-sm shadow-lg shadow-navy/30 hover:bg-navy-dark hover:-translate-y-1 transition-all ${
        visible ? 'flex' : 'hidden'
      }`}
    >
      ↑
    </button>
  )
}

export default ScrollTop