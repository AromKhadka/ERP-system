'use client'

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export default function Summary2Page() {
  const kpi = {
    inventoryItems: 1200,
    expired: 25,
    lowStock: 40,
  }

  const barChartData = {
    labels: ['OTC', 'Prescription'],
    datasets: [
      {
        label: 'Sales ($)',
        data: [3200, 1800],
        backgroundColor: ['#6366F1', '#10B981'],
      },
    ],
  }

  const topProducts = [
    { name: 'Paracetamol', unitsSold: 320 },
    { name: 'Vitamin C', unitsSold: 280 },
    { name: 'Cough Syrup', unitsSold: 250 },
    { name: 'Antibiotic A', unitsSold: 200 },
    { name: 'Pain Relief Gel', unitsSold: 170 },
  ]

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Report Summary 2</h1>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <div className="bg-white shadow p-4 rounded">
          <p className="text-gray-600 text-sm">Inventory Items</p>
          <p className="text-2xl font-bold text-indigo-700">{kpi.inventoryItems}</p>
        </div>
        <div className="bg-white shadow p-4 rounded">
          <p className="text-gray-600 text-sm">Expired Items</p>
          <p className="text-2xl font-bold text-red-600">{kpi.expired}</p>
        </div>
        <div className="bg-white shadow p-4 rounded">
          <p className="text-gray-600 text-sm">Low Stock Alerts</p>
          <p className="text-2xl font-bold text-yellow-500">{kpi.lowStock}</p>
        </div>
      </div>

      {/* Bar Chart */}
      <div className="bg-white shadow rounded p-6">
        <h2 className="text-lg font-semibold mb-4">OTC vs Prescription Sales</h2>
        <div className="h-72">
          <Bar data={barChartData} />
        </div>
      </div>

      {/* Top Products Table */}
      <div className="bg-white shadow rounded p-6">
        <h2 className="text-lg font-semibold mb-4">Top-Selling Products</h2>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Product</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Units Sold</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {topProducts.map((product, idx) => (
              <tr key={idx}>
                <td className="px-4 py-2 text-sm text-gray-700">{product.name}</td>
                <td className="px-4 py-2 text-sm text-gray-700">{product.unitsSold}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
