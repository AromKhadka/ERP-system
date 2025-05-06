'use client'

import { useState } from 'react'

type Supplier = {
  id: number
  name: string
  contact: string
  email: string
  address: string
}

export default function SuppliersPage() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([
    {
      id: 1,
      name: 'Global Pharma Ltd',
      contact: '9876543210',
      email: 'contact@globalpharma.com',
      address: 'Kathmandu, Nepal',
    },
    {
      id: 2,
      name: 'HealthLine Suppliers',
      contact: '9123456780',
      email: 'info@healthline.com',
      address: 'Bhaktapur, Nepal',
    },
  ])

  const [form, setForm] = useState({
    name: '',
    contact: '',
    email: '',
    address: '',
  })

  const [selectedSupplierId, setSelectedSupplierId] = useState<number | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleAddOrUpdateSupplier = () => {
    if (!form.name || !form.contact || !form.email || !form.address) {
      alert('Please fill in all fields')
      return
    }

    if (selectedSupplierId !== null) {
      // Update existing
      setSuppliers((prev) =>
        prev.map((s) =>
          s.id === selectedSupplierId ? { ...s, ...form } : s
        )
      )
      setSelectedSupplierId(null)
    } else {
      // Add new
      const newSupplier: Supplier = {
        id: suppliers.length + 1,
        ...form,
      }
      setSuppliers([...suppliers, newSupplier])
    }

    // Clear form
    setForm({ name: '', contact: '', email: '', address: '' })
  }

  const handleEdit = (supplier: Supplier) => {
    setForm({
      name: supplier.name,
      contact: supplier.contact,
      email: supplier.email,
      address: supplier.address,
    })
    setSelectedSupplierId(supplier.id)
  }

  const handleDelete = (id: number) => {
    setSuppliers((prev) => prev.filter((s) => s.id !== id))
    if (selectedSupplierId === id) {
      setSelectedSupplierId(null)
      setForm({ name: '', contact: '', email: '', address: '' })
    }
  }

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-bold text-gray-800">Supplier Management</h1>

      {/* Supplier Table */}
      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left px-4 py-2">Name</th>
              <th className="text-left px-4 py-2">Contact</th>
              <th className="text-left px-4 py-2">Email</th>
              <th className="text-left px-4 py-2">Address</th>
              <th className="text-center px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {suppliers.map((supplier) => (
              <tr key={supplier.id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-2">{supplier.name}</td>
                <td className="px-4 py-2">{supplier.contact}</td>
                <td className="px-4 py-2">{supplier.email}</td>
                <td className="px-4 py-2">{supplier.address}</td>
                <td className="px-4 py-2 text-center space-x-2">
                  <button
                    className="text-blue-600 hover:underline"
                    onClick={() => handleEdit(supplier)}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-600 hover:underline"
                    onClick={() => handleDelete(supplier.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add / Edit Form */}
      <div className="bg-white p-6 rounded-lg shadow max-w-3xl">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          {selectedSupplierId ? 'Edit Supplier' : 'Add New Supplier'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleInputChange}
            placeholder="Supplier Name"
            className="border px-3 py-2 rounded w-full"
          />
          <input
            type="text"
            name="contact"
            value={form.contact}
            onChange={handleInputChange}
            placeholder="Contact Number"
            className="border px-3 py-2 rounded w-full"
          />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleInputChange}
            placeholder="Email Address"
            className="border px-3 py-2 rounded w-full"
          />
          <input
            type="text"
            name="address"
            value={form.address}
            onChange={handleInputChange}
            placeholder="Physical Address"
            className="border px-3 py-2 rounded w-full"
          />
        </div>
        <button
          onClick={handleAddOrUpdateSupplier}
          className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
        >
          {selectedSupplierId ? 'Update Supplier' : 'Add Supplier'}
        </button>
      </div>
    </div>
  )
}
