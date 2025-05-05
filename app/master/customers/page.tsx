'use client'

import { useState } from 'react'

type Customer = {
  id: number
  name: string
  email: string
  phone: string
  address: string
}

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([
    {
      id: 1,
      name: 'Rahul Gautam',
      email: 'rahul@gmail.com',
      phone: '9876543210',
      address: 'Mustang, Nepal',
    },
    {
      id: 2,
      name: 'Anjali Lamichane',
      email: 'lamichane@gmail.com',
      phone: '9123456780',
      address: 'Kupondool, Lalitput, Nepal',
    },
  ])

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  })

  const [selectedCustomerId, setSelectedCustomerId] = useState<number | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleAddOrUpdateCustomer = () => {
    if (!form.name || !form.email || !form.phone || !form.address)
      return alert('Please fill in all fields')

    if (selectedCustomerId !== null) {
      // Update existing customer
      setCustomers(prev =>
        prev.map(c =>
          c.id === selectedCustomerId ? { ...c, ...form } : c
        )
      )
      setSelectedCustomerId(null)
    } else {
      // Add new customer
      const newCustomer: Customer = {
        id: customers.length + 1,
        name: form.name,
        email: form.email,
        phone: form.phone,
        address: form.address,
      }
      setCustomers([...customers, newCustomer])
    }

    setForm({ name: '', email: '', phone: '', address: '' })
  }

  const handleEdit = (customer: Customer) => {
    setForm({
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
      address: customer.address,
    })
    setSelectedCustomerId(customer.id)
  }

  const handleDelete = (id: number) => {
    setCustomers(customers.filter((c) => c.id !== id))
    if (selectedCustomerId === id) {
      setSelectedCustomerId(null)
      setForm({ name: '', email: '', phone: '', address: '' })
    }
  }

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-bold text-gray-800">Customer Management</h1>

      {/* Customer Table */}
      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left px-4 py-2">Name</th>
              <th className="text-left px-4 py-2">Email</th>
              <th className="text-left px-4 py-2">Phone</th>
              <th className="text-left px-4 py-2">Address</th>
              <th className="text-center px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-2">{customer.name}</td>
                <td className="px-4 py-2">{customer.email}</td>
                <td className="px-4 py-2">{customer.phone}</td>
                <td className="px-4 py-2">{customer.address}</td>
                <td className="px-4 py-2 text-center space-x-2">
                  <button
                    onClick={() => handleEdit(customer)}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(customer.id)}
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

      {/* Add/Edit Customer Form */}
      <div className="bg-white p-6 rounded-lg shadow max-w-3xl">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          {selectedCustomerId ? 'Edit Customer' : 'Add New Customer'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleInputChange}
            placeholder="Full Name"
            className="border px-3 py-2 rounded w-full"
          />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleInputChange}
            placeholder="Email"
            className="border px-3 py-2 rounded w-full"
          />
          <input
            type="text"
            name="phone"
            value={form.phone}
            onChange={handleInputChange}
            placeholder="Phone"
            className="border px-3 py-2 rounded w-full"
          />
          <input
            type="text"
            name="address"
            value={form.address}
            onChange={handleInputChange}
            placeholder="Address"
            className="border px-3 py-2 rounded w-full"
          />
        </div>
        <button
          onClick={handleAddOrUpdateCustomer}
          className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
        >
          {selectedCustomerId ? 'Update Customer' : 'Add Customer'}
        </button>
      </div>
    </div>
  )
}
