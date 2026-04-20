import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import productsData from '../data/products.json'

const ProductPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [activeImage, setActiveImage] = useState(0)
  const [cart, setCart] = useState([])

  useEffect(() => {
    const found = productsData.find(p => p.id === parseInt(id))
    if (found) {
      setProduct(found)
      setActiveImage(0)
    }
  }, [id])

  useEffect(() => {
    const savedCart = localStorage.getItem('zouwor_cart')
    if (savedCart) setCart(JSON.parse(savedCart))
  }, [])

  const addToCart = () => {
    const existing = cart.find(item => item.id === product.id)
    let newCart
    if (existing) {
      newCart = cart.map(item => item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item)
    } else {
      newCart = [...cart, { ...product, quantity }]
    }
    setCart(newCart)
    localStorage.setItem('zouwor_cart', JSON.stringify(newCart))
    alert(`${quantity}x ${product.name} ajouté au panier !`)
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-400">Chargement...</p>
          <Link to="/shop" className="text-orange-500 mt-4 block">← Retour à la boutique</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4">
      <div className="max-w-6xl mx-auto">
        <Link to="/shop" className="inline-flex items-center gap-2 text-navy hover:text-orange-500 mb-6">
          ← Retour à la boutique
        </Link>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8 p-6">
            {/* Images */}
            <div>
              <img src={product.images?.[activeImage] || product.image} alt={product.name} className="w-full h-96 object-cover rounded-xl" />
              {product.images && product.images.length > 1 && (
                <div className="flex gap-2 mt-4">
                  {product.images.map((img, idx) => (
                    <img key={idx} src={img} alt={`${product.name} ${idx+1}`} className={`w-20 h-20 object-cover rounded-lg cursor-pointer border-2 ${activeImage === idx ? 'border-orange-500' : 'border-gray-200'}`} onClick={() => setActiveImage(idx)} />
                  ))}
                </div>
              )}
            </div>

            {/* Infos produit */}
            <div>
              {product.isPromo && (
                <div className="inline-block bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs mb-2">Promotion</div>
              )}
              {product.isNew && (
                <div className="inline-block bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs ml-2 mb-2">Nouveau</div>
              )}
              <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
              <div className="flex items-center gap-2 mt-2">
                <div className="flex items-center">
                  <span className="text-amber-400">★</span>
                  <span className="font-semibold ml-1">{product.rating}</span>
                  <span className="text-gray-400 ml-1">({product.reviews} avis)</span>
                </div>
                <span className="text-gray-300">|</span>
                <span className="text-gray-500">Stock: {product.stock > 0 ? `${product.stock} unités` : 'Rupture'}</span>
              </div>

              <div className="mt-4">
                {product.oldPrice ? (
                  <div>
                    <span className="text-3xl font-bold text-orange-500">{product.price.toLocaleString()} FCFA</span>
                    <span className="text-gray-400 line-through ml-3">{product.oldPrice.toLocaleString()} FCFA</span>
                  </div>
                ) : (
                  <span className="text-3xl font-bold text-orange-500">{product.price.toLocaleString()} FCFA</span>
                )}
              </div>

              <div className="mt-6">
                <h3 className="font-semibold mb-2">Description</h3>
                <p className="text-gray-600">{product.description}</p>
              </div>

              <div className="mt-6">
                <h3 className="font-semibold mb-2">Caractéristiques</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  {product.features?.map((feature, idx) => (
                    <li key={idx}>{feature}</li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 flex items-center gap-4">
                <div className="flex items-center border rounded-lg">
                  <button onClick={() => setQuantity(Math.max(1, quantity-1))} className="px-3 py-2 border-r">-</button>
                  <span className="px-4 py-2">{quantity}</span>
                  <button onClick={() => setQuantity(quantity+1)} className="px-3 py-2 border-l">+</button>
                </div>
                <button onClick={addToCart} className="flex-1 bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600">Ajouter au panier</button>
              </div>

              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-500 flex items-center gap-2">🚚 Livraison rapide sous 7-14 jours</p>
                <p className="text-sm text-gray-500 flex items-center gap-2 mt-2">🔒 Paiement sécurisé (Orange Money, Wave, Carte)</p>
                <p className="text-sm text-gray-500 flex items-center gap-2 mt-2">✅ Satisfait ou remboursé pendant 14 jours</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductPage