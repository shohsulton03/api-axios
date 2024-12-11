import { request } from '@/api'
import React, { useEffect, useState } from 'react'
import Products from '@/components/Products'

const Home = () => {
  const [products, setProducts] = useState(null)
  useEffect(()=>{
    request
      .get("/product/get")
      .then(res => setProducts(res.data))
  }, [])
  return (
    <div>
      <p>Home</p>
      <Products data={products}/>
    </div>
  )
}

export default Home