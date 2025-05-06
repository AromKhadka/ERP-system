'use client'
export default function Navbar() {
    return (
      <nav className="bg-white px-6 py-4 shadow-md flex items-center justify-between">
        {/* Left - App Name */}
        <div className="text-xl font-semibold text-gray-800">ERP Admin</div>
  
        {/* Center - Search */}
        <div className="flex-1 mx-8">
          <input
            type="text"
            placeholder="Search..."
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
  
        {/* Right - User Info */}
        <div className="flex items-center gap-4">
          <span className="text-gray-700">Welcome, User</span>
          <img
            src="/user-icon.png"
            alt="User"
            className="w-8 h-8 rounded-full border border-gray-300"
          />
        </div>
      </nav>
    )
  }
  