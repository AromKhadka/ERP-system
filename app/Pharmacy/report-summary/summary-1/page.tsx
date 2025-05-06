'use client'

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import { useState } from 'react'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

export default function Summary1Page() {
  const [timeRange, setTimeRange] = useState<'Weekly' | 'Monthly'>('Weekly')

  const summaryStats = {
    totalSales: 4800,
    totalPrescriptions: 350,
    revenueOTC: 3200,
    revenueRx: 1600,
  }

  const labels = timeRange === 'Weekly'
    ? ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    : ['Week 1', 'Week 2', 'Week 3', 'Week 4']

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Total Sales',
        data: labels.map(() => Math.floor(Math.random() * 1000)),
        borderColor: 'rgb(99, 102, 241)',
        backgroundColor: 'rgba(99, 102, 241, 0.4)',
      },
    ],
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Report Summary 1</h1>

      {/* Time Filter */}
      <div className="flex items-center gap-2">
        <label className="text-gray-700">Time Range:</label>
        <select
          className="border rounded px-3 py-2"
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value as any)}
        >
          <option value="Weekly">Weekly</option>
          <option value="Monthly">Monthly</option>
        </select>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white shadow p-4 rounded">
          <p className="text-gray-600 text-sm">Total Sales</p>
          <p className="text-2xl font-bold text-indigo-700">${summaryStats.totalSales}</p>
        </div>
        <div className="bg-white shadow p-4 rounded">
          <p className="text-gray-600 text-sm">Prescriptions</p>
          <p className="text-2xl font-bold text-indigo-700">{summaryStats.totalPrescriptions}</p>
        </div>
        <div className="bg-white shadow p-4 rounded">
          <p className="text-gray-600 text-sm">Revenue OTC</p>
          <p className="text-2xl font-bold text-indigo-700">${summaryStats.revenueOTC}</p>
        </div>
        <div className="bg-white shadow p-4 rounded">
          <p className="text-gray-600 text-sm">Revenue Rx</p>
          <p className="text-2xl font-bold text-indigo-700">${summaryStats.revenueRx}</p>
        </div>
      </div>

      {/* Line Chart */}
      <div className="bg-white shadow rounded p-6">
        <h2 className="text-lg font-semibold mb-4">Sales Trend</h2>
        <div className="h-64">
          <Line data={chartData} />
        </div>
      </div>

      {/* Summary Text Sections */}
      <div className="bg-white p-6 rounded shadow space-y-4">
        <h2 className="text-lg font-semibold">Insights</h2>
        <p className="text-gray-700">
          This summary shows an upward trend in sales over the {timeRange.toLowerCase()} period,
          especially in OTC medications which contributed significantly to the revenue.
        </p>
        <p className="text-gray-700">
          The pharmacy also maintained a stable prescription fulfillment rate, indicating operational efficiency.
        </p>
      </div>
    </div>
  )
}
