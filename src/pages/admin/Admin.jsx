import React from 'react'
import ProductCreate from '../../components/ProductCreate';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  const navigate = useNavigate()
  return (
    <div>
      <h2>Admin</h2>
      <div className='flex gap-3 items-center'>
        <button className='bg-blue-600 py-2 px-4 text-white mt-2' onClick={() => navigate("/create/product")}>Product</button>
        <button className='bg-blue-600 py-2 px-4 text-white mt-2' onClick={() => navigate("/create/category")}>Categories</button>
      </div>
      {/* <ProductCreate /> */}
    </div>
  );
}

export default Admin