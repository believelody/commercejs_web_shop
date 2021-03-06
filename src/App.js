import React, { useEffect, useState } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import './App.css'
import Cart from './components/cart/Cart'
import Checkout from './components/checkout/Checkout'
import Navbar from './components/navbar/Navbar'
import Products from './components/products/Products'
import { commerce } from './lib/commerce'

function App() {
  const [products, setProducts] = useState([])
  const [cart, setCart] = useState(null)
  const [order, setOrder] = useState(null)
  const [errorMessage, setErrorMessage] = useState("")

  const fetchProducts = async () => {
    try {
      const { data } = await commerce.products.list()
      setProducts(data)
    } catch (error) {
      console.log(error)
    }
  }

  const fetchCart = async () => {
    try {
      const res = await commerce.cart.retrieve()
      setCart(res)
      setOrder(null)
    } catch (error) {
      console.log(error)
    }
  }

  const handleAddToCart = async (productId, quantity) => {
    try {
      const { cart } = await commerce.cart.add(productId, quantity);
      setCart(cart)
    } catch (error) {
      console.log(error)
    }
  }

  const handleUpdateCartQty = async (productId, quantity) => {
    try {
      const response = await commerce.cart.update(productId, { quantity })
      setCart(response.cart)
    } catch (error) {
      console.log(error)
    }
  }

  const handleRemoveFromCart = async (productId) => {
    try {
      const { cart } = await commerce.cart.remove(productId)
      setCart(cart)
    } catch (error) {
      console.log(error)
    }
  }

  const handleResetCart = async () => {
    try {
      const { cart } = await commerce.cart.empty()
      setCart(cart)
    } catch (error) {
      console.log(error)
    }
  }

  const resetCart = async () => {
    try {
      const newCart = await commerce.cart.refresh()
      setCart(newCart)
      setOrder(null)
    } catch (err) {
      console.log(err.data.error.message)
      setErrorMessage(err.data.error.message)
    }
  }

  const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
    try {
      const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder)
      setOrder(incomingOrder)
      resetCart()
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchProducts()
    fetchCart()
  }, [])

  return (
    <BrowserRouter>
      <div className="">
        <Navbar totalItems={cart?.total_unique_items} />
        <Switch>
          <Route exact path="/">
            <Products products={products} onAddToCart={handleAddToCart} />
          </Route>
          <Route exact path="/cart">
            <Cart
              cart={cart}
              handleUpdateCartQty={handleUpdateCartQty}
              handleRemoveFromCart={handleRemoveFromCart}
              handleResetCart={handleResetCart}
            />
          </Route>
          <Route exact path="/checkout">
            <Checkout cart={cart} order={order} onCaptureCheckout={handleCaptureCheckout} error={errorMessage} />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
