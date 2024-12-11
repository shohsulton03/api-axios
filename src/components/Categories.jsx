import React, { useEffect, useState } from 'react'
import { useSelector } from "react-redux";
import { request } from '../api';

const Categories = () => {
    const token = useSelector((s) => s.token.value);
    const [categories, setCategories] = useState()
    const [statusCreate, setStatusCreate] = useState(true)
    const [editValues, setEditValue] = useState({
        id: 0,
        name:"",
        description:""
    })

    const categoryItems = categories?.map((category) => (
        <div key={category.id} className='shadow-lg rounded-lg p-3'>
            <h3 className='text-2xl'>{category.name}</h3>
            <p>{category.description}</p>
            <div className='flex gap-3'>
                <button onClick={() => handleDelete(category.id)} className='px-3 py-2 bg-red-500 mt-2 rounded-lg text-white'>Delete</button>
                <button onClick={() => handleEdit(category)} className='px-3 py-2 bg-blue-500 mt-2 rounded-lg text-white'>Edit</button>
            </div>
        </div>
    ))

    useEffect(() => {
        request
            .get("/product-category/get")
            .then(res => setCategories(res.data))
    }, [])

    const handleCreateCategory = e => {
        e.preventDefault();
        let formData = new FormData(e.target);
        const category = Object.fromEntries(formData);
        if (statusCreate){

            request.post("/product-category/create", category, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
        }else{
            request
              .patch(`/product-category/update/${editValues.id}`, category, {
                headers: { Authorization: `Bearer ${token}` },
              })
              .then(() => {
                alert("Category updated successfully");
              })
              .catch((err) => console.error("Failed to update category:", err));

            setStatusCreate(true);
        }
        
        e.target.reset()
    }

    const handleDelete = (id) => {
        request
          .delete(`/product-category/delete/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then(() => alert("Category deleted succesfully"))
          .catch((err) =>
            alert(
              "Cannot delete category because it is still referenced by products."
            )
          );
    }


    const handleEdit = (category) => {
        setStatusCreate(false)
        setEditValue({
            id: category.id,
            name: category.name,
            description: category.description
        })

    }
    
  return (
    <div>
      <h3>Categories</h3>
      <form
        onSubmit={handleCreateCategory}
        action=""
        className="flex flex-col gap-3 max-w-[500px] mx-auto my-[50px]"
      >
        <input
          className="border py-2 px-4"
          type="text"
          name="name"
          placeholder="Enter category name"
        />
        <textarea
          className="border py-2 px-4"
          name="description"
          id=""
          placeholder="Descripe category"
        ></textarea>
        <button className="border bg-blue-600 text-white py-2 px-4">
          { statusCreate ? "Create" : "Update" }
        </button>
      </form>
      <div className='grid grid-cols-8'>
        {categoryItems}
      </div>
    </div>
  );
}

export default Categories