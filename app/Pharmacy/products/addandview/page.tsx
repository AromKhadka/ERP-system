'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface Product {
  id: number
  name: string
  description: string
  price: number
  category: string
  stock: number
  expiryDate: string
}

const AvailableProducts = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: 0,
    category: '',
    stock: 0,
    expiryDate: '',
  })
  const router = useRouter()

  // Fetch products data (replace with actual API call)
  useEffect(() => {
    const fetchProducts = async () => {
      // Mocked data for now
      const fetchedProducts: Product[] = [
        { id: 1, name: 'Product 1', description: 'Description 1', price: 100, category: 'Pharmacy', stock: 20, expiryDate: '2025-06-01' },
        { id: 2, name: 'Product 2', description: 'Description 2', price: 150, category: 'Pharmacy', stock: 50, expiryDate: '2025-07-15' },
        { id: 3, name: 'Product 3', description: 'Description 3', price: 80, category: 'Pharmacy', stock: 10, expiryDate: '2025-05-01' },
        { id: 4, name: 'Product 4', description: 'Description 4', price: 200, category: 'Pharmacy', stock: 5, expiryDate: '2024-10-10' },
      ]
      setProducts(fetchedProducts)
    }
    fetchProducts()
  }, [])

  // Filter products based on expiry date
  const currentDate = new Date()

  const totalProducts = products.length
  const expiresIn1Month = products.filter(
    (product) => new Date(product.expiryDate) < new Date(currentDate.setMonth(currentDate.getMonth() + 1))
  ).length
  const expiresIn6Months = products.filter(
    (product) => new Date(product.expiryDate) < new Date(currentDate.setMonth(currentDate.getMonth() + 6))
  ).length
  const expiredProducts = products.filter(
    (product) => new Date(product.expiryDate) < new Date()
  ).length

  // Handle input change for the add product form
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  // Handle form submission to add a product
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Mocked API call to add a product
    const newProduct = { ...formData, id: Date.now() }
    setProducts((prevProducts) => [...prevProducts, newProduct])
    // Reset form
    setFormData({
      name: '',
      description: '',
      price: 0,
      category: '',
      stock: 0,
      expiryDate: '',
    })
    alert('Product added successfully!')
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Available Products</h1>

      {/* Product Summary Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="p-4 border rounded shadow-sm">
          <h2 className="font-semibold">Total Products</h2>
          <p>{totalProducts}</p>
        </div>
        <div className="p-4 border rounded shadow-sm">
          <h2 className="font-semibold">Expires in 1 Month</h2>
          <p>{expiresIn1Month}</p>
        </div>
        <div className="p-4 border rounded shadow-sm">
          <h2 className="font-semibold">Expires in 6 Months</h2>
          <p>{expiresIn6Months}</p>
        </div>
        <div className="p-4 border rounded shadow-sm">
          <h2 className="font-semibold">Expired Products</h2>
          <p>{expiredProducts}</p>
        </div>
      </div>

      {/* Product List Section */}
      <div className="overflow-x-auto mb-8">
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 text-left">Name</th>
              <th className="p-2 text-left">Description</th>
              <th className="p-2 text-left">Price</th>
              <th className="p-2 text-left">Stock</th>
              <th className="p-2 text-left">Expiry Date</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b">
                <td className="p-2">{product.name}</td>
                <td className="p-2">{product.description}</td>
                <td className="p-2">{product.price}</td>
                <td className="p-2">{product.stock}</td>
                <td className="p-2">{product.expiryDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Product Form */}
      <h2 className="text-xl font-bold mb-4">Add New Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="name" className="block font-medium">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div>
            <label htmlFor="description" className="block font-medium">Description</label>
            <input
              type="text"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div>
            <label htmlFor="price" className="block font-medium">Price</label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div>
            <label htmlFor="category" className="block font-medium">Category</label>
            <input
              type="text"
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div>
            <label htmlFor="stock" className="block font-medium">Stock</label>
            <input
              type="number"
              id="stock"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div>
            <label htmlFor="expiryDate" className="block font-medium">Expiry Date</label>
            <input
              type="date"
              id="expiryDate"
              name="expiryDate"
              value={formData.expiryDate}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Add Product</button>
      </form>
    </div>
  )
}

export default AvailableProducts
