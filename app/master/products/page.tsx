'use client'

import { useState } from 'react'

type Product = {
  id: number
  name: string
  category: string
  stock: number
  price: number
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      name: 'Paracetamol 500mg',
      category: 'Pain Reliever',
      stock: 120,
      price: 25.5,
    },
    {
      id: 2,
      name: 'Cough Syrup',
      category: 'Cold & Cough',
      stock: 45,
      price: 80,
    },
  ])

  const [form, setForm] = useState({
    name: '',
    category: '',
    stock: '',
    price: '',
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleAddProduct = () => {
    if (!form.name || !form.category || !form.stock || !form.price) return alert('Fill all fields')

    const newProduct: Product = {
      id: products.length + 1,
      name: form.name,
      category: form.category,
      stock: parseInt(form.stock),
      price: parseFloat(form.price),
    }

    setProducts([...products, newProduct])
    setForm({ name: '', category: '', stock: '', price: '' })
  }

  const handleDelete = (id: number) => {
    setProducts(products.filter((p) => p.id !== id))
  }

  return (
    <div className="p-6 space-y-8">
      {/* Page Header */}
      <h1 className="text-2xl font-bold text-gray-800">Product Management</h1>

      {/* Product Table */}
      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left px-4 py-2">Product Name</th>
              <th className="text-left px-4 py-2">Category</th>
              <th className="text-right px-4 py-2">Stock</th>
              <th className="text-right px-4 py-2">Price (₹)</th>
              <th className="text-center px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-2">{product.name}</td>
                <td className="px-4 py-2">{product.category}</td>
                <td className="px-4 py-2 text-right">{product.stock}</td>
                <td className="px-4 py-2 text-right">₹{product.price}</td>
                <td className="px-4 py-2 text-center space-x-2">
                  <button className="text-blue-600 hover:underline">Edit</button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Product Form */}
      <div className="bg-white p-6 rounded-lg shadow max-w-3xl">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Add New Product</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleInputChange}
            placeholder="Product Name"
            className="border px-3 py-2 rounded w-full"
          />
          <input
            type="text"
            name="category"
            value={form.category}
            onChange={handleInputChange}
            placeholder="Category"
            className="border px-3 py-2 rounded w-full"
          />
          <input
            type="number"
            name="stock"
            value={form.stock}
            onChange={handleInputChange}
            placeholder="Stock"
            className="border px-3 py-2 rounded w-full"
          />
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleInputChange}
            placeholder="Price (₹)"
            className="border px-3 py-2 rounded w-full"
          />
        </div>
        <button
          onClick={handleAddProduct}
          className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
        >
          Add Product
        </button>
      </div>
    </div>
  )
}
