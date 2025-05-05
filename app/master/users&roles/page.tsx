'use client'

import { useState } from 'react'

type Role = 'Admin' | 'Manager' | 'Cashier' | 'Pharmacist'

type User = {
  id: number
  name: string
  email: string
  role: Role
}

export default function UsersAndRolesPage() {
  const [users, setUsers] = useState<User[]>([
    { id: 1, name: 'Sujan Sharma', email: 'sujan@erp.com', role: 'Admin' },
    { id: 2, name: 'Meena Karki', email: 'meena@erp.com', role: 'Pharmacist' },
  ])

  const [roles, setRoles] = useState<Role[]>(['Admin', 'Manager', 'Cashier', 'Pharmacist'])

  const [form, setForm] = useState({
    name: '',
    email: '',
    role: 'Admin' as Role,
  })

  const [newRole, setNewRole] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleAddUser = () => {
    if (!form.name || !form.email) return alert('All fields are required.')
    const newUser: User = {
      id: users.length + 1,
      name: form.name,
      email: form.email,
      role: form.role,
    }
    setUsers([...users, newUser])
    setForm({ name: '', email: '', role: 'Admin' })
  }

  const handleDeleteUser = (id: number) => {
    setUsers(users.filter((u) => u.id !== id))
  }

  const handleAddRole = () => {
    if (!newRole.trim()) return
    if (roles.includes(newRole as Role)) return alert('Role already exists.')
    setRoles([...roles, newRole as Role])
    setNewRole('')
  }

  const handleDeleteRole = (role: Role) => {
    setRoles(roles.filter((r) => r !== role))
    setUsers(users.map((u) => (u.role === role ? { ...u, role: 'Admin' } : u)))
  }

  return (
    <div className="p-4 sm:p-6 space-y-10">
      <h1 className="text-2xl font-bold text-gray-800">Users & Roles Management</h1>

      {/* Users Table */}
      <div className="bg-white shadow rounded-lg p-4 overflow-x-auto">
        <h2 className="text-lg font-semibold mb-3 text-gray-700">Users</h2>
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="px-4 py-2 whitespace-nowrap">Name</th>
              <th className="px-4 py-2 whitespace-nowrap">Email</th>
              <th className="px-4 py-2 whitespace-nowrap">Role</th>
              <th className="px-4 py-2 whitespace-nowrap">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-2">{user.name}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2">{user.role}</td>
                <td className="px-4 py-2 space-x-2">
                  <button className="text-blue-600 hover:underline text-sm">Edit</button>
                  <button
                    onClick={() => handleDeleteUser(user.id)}
                    className="text-red-600 hover:underline text-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add User Form */}
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow max-w-4xl w-full mx-auto">
        <h2 className="text-lg font-semibold mb-4 text-gray-700">Add New User</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
          <select
            name="role"
            value={form.role}
            onChange={handleInputChange}
            className="border px-3 py-2 rounded w-full"
          >
            {roles.map((role, i) => (
              <option key={i} value={role}>
                {role}
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={handleAddUser}
          className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
        >
          Add User
        </button>
      </div>

      {/* Roles Section */}
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow max-w-2xl w-full mx-auto">
        <h2 className="text-lg font-semibold mb-4 text-gray-700">Manage Roles</h2>
        <ul className="space-y-2 mb-4">
          {roles.map((role, i) => (
            <li key={i} className="flex justify-between items-center bg-gray-100 px-4 py-2 rounded">
              <span className="text-sm">{role}</span>
              <button
                onClick={() => handleDeleteRole(role)}
                className="text-red-600 hover:underline text-sm"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            placeholder="New Role"
            value={newRole}
            onChange={(e) => setNewRole(e.target.value)}
            className="border px-3 py-2 rounded w-full"
          />
          <button
            onClick={handleAddRole}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          >
            Add Role
          </button>
        </div>
      </div>
    </div>
  )
}
