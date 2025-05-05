// app/pharmacy/dashboard/page.tsx
'use client'

import { useState } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Line, Bar, Doughnut } from 'react-chartjs-2'

// Register the necessary Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
)

export default function PharmacyDashboardPage() {
  // --- State & Dummy Data ---
  const [filter, setFilter] = useState<'Daily' | 'Weekly' | 'Monthly'>('Daily')

  const sales = {
    daily: 200,
    weekly: 1200,
    monthly: 4800,
    revenueOTC: 3000,
    revenueRx: 1800,
  }

  const inventoryAlerts = [
    { label: 'Low Stock', count: 12 },
    { label: 'Out of Stock', count: 4 },
    { label: 'Expiring Soon', count: 8 },
    { label: 'Expired', count: 2 },
  ]

  const prescriptionStats = { pending: 25, fulfilled: 175 }
  const customerStats = { totalCustomers: 450, loyaltyActive: 120, topBuyers: 10 }
  const procurementStats = { pendingPO: 5, avgLeadTime: '3d', costTrend: '↑5%' }
  const financialStats = { grossMargin: '65%', AR: '$12K', AP: '$8K', cashFlow: '+$4K' }
  const complianceAlerts = ['Recall: Drug A', 'Audit overdue', 'Controlled substances log']
  const employeeStats = { prescriptionsPerHour: 20, upsellRate: '15%', attendance: '98%' }
  const operationStats = { peakHour: '2–3 PM', avgProcessTime: '2m 30s', returns: 3 }

  // --- Chart Data & Options ---

  // 1. Sales Line Chart
  const salesLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  const salesData = {
    labels: salesLabels,
    datasets: [
      {
        label: 'Sales',
        data: salesLabels.map((_, i) => {
          const base =
            filter === 'Daily'
              ? sales.daily
              : filter === 'Weekly'
              ? sales.weekly
              : sales.monthly
          return Math.round((base * (i + 1)) / 7)
        }),
        borderColor: 'rgba(59, 130, 246, 1)',
        backgroundColor: 'rgba(59, 130, 246, 0.3)',
      },
    ],
  }
  const salesOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' as const },
      title: { display: true, text: `${filter} Sales Trend` },
    },
  }

  // 2. Inventory Bar Chart
  const invLabels = inventoryAlerts.map((a) => a.label)
  const invData = {
    labels: invLabels,
    datasets: [
      {
        label: 'Alerts',
        data: inventoryAlerts.map((a) => a.count),
        backgroundColor: ['#fecaca', '#fee2e2', '#fde68a', '#fef08a'],
      },
    ],
  }
  const invOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: true, text: 'Inventory Alerts' },
    },
  }

  // 3. Prescription Doughnut Chart
  const prescData = {
    labels: ['Pending', 'Fulfilled'],
    datasets: [
      {
        data: [prescriptionStats.pending, prescriptionStats.fulfilled],
        backgroundColor: ['#c4b5fd', '#a5b4fc'],
      },
    ],
  }
  const prescOptions = {
    responsive: true,
    plugins: { title: { display: true, text: 'Prescription Status' } },
  }

  // 4. Customer Doughnut Chart
  const custData = {
    labels: ['Total', 'Loyalty', 'Top Buyers'],
    datasets: [
      {
        data: [
          customerStats.totalCustomers,
          customerStats.loyaltyActive,
          customerStats.topBuyers,
        ],
        backgroundColor: ['#6ee7b7', '#34d399', '#10b981'],
      },
    ],
  }
  const custOptions = {
    responsive: true,
    plugins: { title: { display: true, text: 'Customer Insights' } },
  }

  return (
    <div className="p-4 sm:p-6 space-y-8">
      <h1 className="text-2xl font-bold text-gray-800">Pharmacy Dashboard</h1>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="text-gray-700">View:</div>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value as any)}
          className="border px-3 py-2 rounded"
        >
          {['Daily', 'Weekly', 'Monthly'].map((f) => (
            <option key={f} value={f}>
              {f}
            </option>
          ))}
        </select>
      </div>

      {/* Sales & Inventory */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Chart */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-lg font-semibold mb-4">Sales & Revenue Overview</h2>
          <div className="h-64">
            <Line data={salesData} options={salesOptions} />
          </div>
        </div>

        {/* Inventory Chart */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-lg font-semibold mb-4">Inventory Management</h2>
          <div className="h-64">
            <Bar data={invData} options={invOptions} />
          </div>
        </div>
      </div>

      {/* Prescription & Customer */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <Doughnut data={prescData} options={prescOptions} />
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <Doughnut data={custData} options={custOptions} />
        </div>
      </div>

      {/* Remaining Sections */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="font-semibold mb-2">Procurement & Supplier</h3>
          <p>Pending POs: {procurementStats.pendingPO}</p>
          <p>Avg Lead: {procurementStats.avgLeadTime}</p>
          <p>Cost Trend: {procurementStats.costTrend}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="font-semibold mb-2">Financial Metrics</h3>
          <p>Gross Margin: {financialStats.grossMargin}</p>
          <p>AR: {financialStats.AR}</p>
          <p>AP: {financialStats.AP}</p>
          <p>Cash Flow: {financialStats.cashFlow}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="font-semibold mb-2">Compliance & Alerts</h3>
          <ul className="list-disc pl-5 space-y-1">
            {complianceAlerts.map((a, i) => (
              <li key={i}>{a}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
