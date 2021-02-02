import React, { useEffect, useState } from 'react'
import './App.css'
import Navbar from './components/navbar/Navbar'
import Products from './components/products/Products'
import { commerce } from './lib/commerce'

function App() {
  const [products, setProducts] = useState([])

  const fetchProducts = async () => {
    try {
      const { data } = await commerce.products.list();

      setProducts(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  console.log(products);

  return (
    <div className="">
      <Navbar />
      <Products />
    </div>
  );
}

export default App;
