import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import productsData from '../data/products.json'
import ChatBot from './ChatBot'

const Shop = () => {
  const navigate = useNavigate()
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [cart, setCart] = useState([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [filters, setFilters] = useState({
    category: '',
    type: '',
    search: '',
    priceRange: [0, 300000],
    rating: 0,
    inStock: false
  })

  // Charger le panier depuis localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('zouwor_cart')
    if (savedCart) setCart(JSON.parse(savedCart))
    setProducts(productsData)
    setFilteredProducts(productsData)
  }, [])

  // Sauvegarder le panier dans localStorage
  useEffect(() => {
    localStorage.setItem('zouwor_cart', JSON.stringify(cart))
  }, [cart])

  // Filtrer les produits
  useEffect(() => {
    let filtered = [...products]

    // Filtre recherche
    if (filters.search) {
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        p.description.toLowerCase().includes(filters.search.toLowerCase())
      )
    }

    // Filtre catégorie
    if (filters.category) {
      filtered = filtered.filter(p => p.category === filters.category)
    }

    // Filtre type
    if (filters.type) {
      filtered = filtered.filter(p => p.type === filters.type)
    }

    // Filtre prix
    filtered = filtered.filter(p => 
      p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
    )

    // Filtre note
    if (filters.rating > 0) {
      filtered = filtered.filter(p => p.rating >= filters.rating)
    }

    // Filtre stock
    if (filters.inStock) {
      filtered = filtered.filter(p => p.stock > 0)
    }

    setFilteredProducts(filtered)
  }, [filters, products])

  // Obtenir toutes les catégories et types uniques
  const categories = [...new Set(products.map(p => p.category))]
  const types = [...new Set(products.map(p => p.type))]

  const addToCart = (product) => {
    const existing = cart.find(item => item.id === product.id)
    if (existing) {
      setCart(cart.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item))
    } else {
      setCart([...cart, { ...product, quantity: 1 }])
    }
  }

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id))
  }

  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) return removeFromCart(id)
    setCart(cart.map(item => item.id === id ? { ...item, quantity } : item))
  }

  const totalCart = cart.reduce((acc, item) => acc + item.price * item.quantity, 0)

  const resetFilters = () => {
    setFilters({
      category: '',
      type: '',
      search: '',
      priceRange: [0, 300000],
      rating: 0,
      inStock: false
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* Bannière d'entrée */}
      <div className="bg-gradient-to-r from-navy to-orange-500 text-white py-12 mb-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-4xl font-bold mb-2">🛍️ Bienvenue dans notre boutique</h1>
              <p className="text-white/90 text-lg">Produits en import direct depuis la Chine - Qualité garantie</p>
              <div className="flex gap-4 mt-4">
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm">✓ Livraison rapide</span>
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm">✓ Paiement sécurisé</span>
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm">✓ Satisfait ou remboursé</span>
              </div>
            </div>
            <Link 
              to="/" 
              className="bg-white text-navy px-5 py-2 rounded-full font-semibold hover:bg-gray-100 transition flex items-center gap-2"
            >
              ← Retour au site
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar filtres */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-xl shadow-sm p-5 sticky top-24">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-lg">🔍 Filtres</h3>
                <button onClick={resetFilters} className="text-orange-500 text-sm hover:underline">Réinitialiser</button>
              </div>

              {/* Recherche */}
              <div className="mb-5">
                <label className="block text-sm font-medium mb-2">Recherche</label>
                <input
                  type="text"
                  placeholder="Nom du produit..."
                  className="w-full border rounded-lg px-3 py-2 text-sm"
                  value={filters.search}
                  onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                />
              </div>

              {/* Catégorie */}
              <div className="mb-5">
                <label className="block text-sm font-medium mb-2">Catégorie</label>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="category" value="" checked={filters.category === ''} onChange={() => setFilters({ ...filters, category: '' })} />
                    <span>Toutes</span>
                  </label>
                  {categories.map(cat => (
                    <label key={cat} className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="category" value={cat} checked={filters.category === cat} onChange={() => setFilters({ ...filters, category: cat })} />
                      <span className="capitalize">{cat}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Type */}
              {types.length > 0 && (
                <div className="mb-5">
                  <label className="block text-sm font-medium mb-2">Type</label>
                  <select
                    className="w-full border rounded-lg px-3 py-2 text-sm"
                    value={filters.type}
                    onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                  >
                    <option value="">Tous les types</option>
                    {types.map(type => (
                      <option key={type} value={type} className="capitalize">{type}</option>
                    ))}
                  </select>
                </div>
              )}

              {/* Prix */}
              <div className="mb-5">
                <label className="block text-sm font-medium mb-2">Prix (FCFA)</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    className="w-1/2 border rounded-lg px-2 py-1 text-sm"
                    value={filters.priceRange[0]}
                    onChange={(e) => setFilters({ ...filters, priceRange: [Number(e.target.value), filters.priceRange[1]] })}
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    className="w-1/2 border rounded-lg px-2 py-1 text-sm"
                    value={filters.priceRange[1]}
                    onChange={(e) => setFilters({ ...filters, priceRange: [filters.priceRange[0], Number(e.target.value)] })}
                  />
                </div>
              </div>

              {/* Note minimale */}
              <div className="mb-5">
                <label className="block text-sm font-medium mb-2">Note minimum</label>
                <div className="flex gap-2">
                  {[0, 3, 4, 4.5].map(rating => (
                    <button
                      key={rating}
                      onClick={() => setFilters({ ...filters, rating })}
                      className={`px-3 py-1 rounded-full text-sm ${filters.rating === rating ? 'bg-orange-500 text-white' : 'bg-gray-200'}`}
                    >
                      {rating === 0 ? 'Toutes' : `${rating}+ ⭐`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Stock */}
              <div className="mb-5">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={filters.inStock} onChange={(e) => setFilters({ ...filters, inStock: e.target.checked })} />
                  <span>En stock uniquement</span>
                </label>
              </div>
            </div>
          </div>

          {/* Grille produits */}
          <div className="lg:w-3/4">
            <div className="flex justify-between items-center mb-4">
              <p className="text-gray-500">{filteredProducts.length} produit(s) trouvé(s)</p>
              <button
                onClick={() => setIsCartOpen(true)}
                className="bg-navy text-white px-4 py-2 rounded-xl flex items-center gap-2"
              >
                🛒 Panier ({cart.reduce((a,b)=>a+b.quantity,0)})
              </button>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-400">Aucun produit trouvé</p>
                <button onClick={resetFilters} className="text-orange-500 mt-2">Réinitialiser les filtres</button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
                  <div key={product.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition group relative">
                    {product.isPromo && (
                      <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">-{Math.round((1 - product.price/product.oldPrice)*100)}%</div>
                    )}
                    {product.isNew && (
                      <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">Nouveau</div>
                    )}
                    <img src={product.image} alt={product.name} className="w-full h-48 object-cover group-hover:scale-105 transition duration-500" />
                    <div className="p-4">
                      <div className="flex items-center gap-1 mb-1">
                        <span className="text-amber-400">★</span>
                        <span className="text-sm font-semibold">{product.rating}</span>
                        <span className="text-gray-400 text-xs">({product.reviews})</span>
                      </div>
                      <h3 className="font-bold text-lg line-clamp-1">{product.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <p className="text-orange-500 font-bold">{product.price.toLocaleString()} FCFA</p>
                        {product.oldPrice && <p className="text-gray-400 text-sm line-through">{product.oldPrice.toLocaleString()} FCFA</p>}
                      </div>
                      <p className="text-gray-500 text-sm mt-2 line-clamp-2">{product.description}</p>
                      <div className="flex gap-2 mt-4">
                        <button
                          onClick={() => navigate(`/product/${product.id}`)}
                          className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg text-sm hover:bg-gray-300"
                        >
                          Détails
                        </button>
                        <button
                          onClick={() => addToCart(product)}
                          className="flex-1 bg-orange-500 text-white py-2 rounded-lg text-sm hover:bg-orange-600"
                        >
                          Ajouter
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Panier latéral */}
      {isCartOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex justify-end">
          <div className="bg-white w-full max-w-md h-full overflow-y-auto p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">🛒 Mon panier</h2>
              <button onClick={() => setIsCartOpen(false)} className="text-2xl">&times;</button>
            </div>
            {cart.length === 0 && <p className="text-gray-400">Panier vide</p>}
            {cart.map(item => (
              <div key={item.id} className="border-b py-3 flex justify-between items-center">
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-gray-500">{item.price.toLocaleString()} FCFA</p>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-2 py-1 bg-gray-200 rounded">-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-2 py-1 bg-gray-200 rounded">+</button>
                  <button onClick={() => removeFromCart(item.id)} className="text-red-500 ml-2">🗑️</button>
                </div>
              </div>
            ))}
            {cart.length > 0 && (
              <div className="mt-6">
                <p className="text-xl font-bold">Total : {totalCart.toLocaleString()} FCFA</p>
                <button className="w-full bg-green-500 text-white py-3 rounded-lg mt-4 hover:bg-green-600">Passer la commande</button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ChatBot */}
      <ChatBot />
    </div>
  )
}

export default Shop