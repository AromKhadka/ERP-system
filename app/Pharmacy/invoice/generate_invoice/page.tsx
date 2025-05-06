'use client'

import React, { useState, ChangeEvent, FormEvent } from 'react'

type InvoiceDetails = {
  billToName: string
  billToAddress: string
  billToPhone: string
  billToEmail: string
  invoiceNo: string
  invoiceDate: string
  poNumber: string
  dueDate: string
}

type ProductLine = {
  description: string
  quantity: number
  rate: number
}

export default function InvoiceGenerator() {
  const [details, setDetails] = useState<InvoiceDetails>({
    billToName: '',
    billToAddress: '',
    billToPhone: '',
    billToEmail: '',
    invoiceNo: '',
    invoiceDate: '',
    poNumber: '',
    dueDate: '',
  })

  const [products, setProducts] = useState<ProductLine[]>([
    { description: '', quantity: 1, rate: 0 },
  ])

  const [showInvoice, setShowInvoice] = useState(false)

  const handleDetailChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setDetails(prev => ({ ...prev, [name]: value }))
  }

  const handleProductChange = (
    idx: number,
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target
    setProducts(prev =>
      prev.map((p, i) =>
        i === idx
          ? {
              ...p,
              [name]:
                name === 'description'
                  ? value
                  : parseFloat(value) || 0,
            }
          : p
      )
    )
  }

  const addProduct = () => {
    setProducts(prev => [...prev, { description: '', quantity: 1, rate: 0 }])
  }

  const generateInvoice = (e: FormEvent) => {
    e.preventDefault()
    setShowInvoice(true)
  }

  const total = products.reduce((sum, p) => sum + p.quantity * p.rate, 0)

  const printInvoice = () => window.print()

  const saveInvoice = () => {
    const data = { details, products, total }
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: 'application/json',
    })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `invoice-${details.invoiceNo || 'untitled'}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <>
      {/* Print‐only CSS */}
      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #invoice-preview,
          #invoice-preview * {
            visibility: visible;
          }
          #invoice-preview {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
          }
          /* Hide the print/save buttons themselves */
          #invoice-preview .no-print {
            display: none;
          }
        }
      `}</style>

      <div className="max-w-4xl mx-auto px-6 py-12 space-y-12">
        {/* === Form Section === */}
        <form
          onSubmit={generateInvoice}
          className="bg-white p-6 rounded-md shadow-md space-y-8 print:hidden"
        >
          <h2 className="text-2xl font-semibold">Create Invoice</h2>

          {/* Top Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Bill To */}
            <div className="space-y-4">
              <h3 className="font-medium">Bill To</h3>
              {[
                { label: 'Name', name: 'billToName', type: 'text' },
                { label: 'Address', name: 'billToAddress', type: 'text' },
                { label: 'Phone', name: 'billToPhone', type: 'tel' },
                { label: 'Email', name: 'billToEmail', type: 'email' },
              ].map(field => (
                <label key={field.name} className="block">
                  <span className="block text-sm font-medium">{field.label}</span>
                  <input
                    name={field.name}
                    type={field.type}
                    value={details[field.name as keyof InvoiceDetails]}
                    onChange={handleDetailChange}
                    required
                    className="mt-1 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 w-full"
                  />
                </label>
              ))}
            </div>

            {/* Invoice Metadata */}
            <div className="space-y-4">
              <h3 className="font-medium">Invoice Details</h3>
              {[
                { label: 'Invoice No', name: 'invoiceNo', type: 'text' },
                { label: 'Invoice Date', name: 'invoiceDate', type: 'date' },
                { label: 'P.O. Number', name: 'poNumber', type: 'text' },
                { label: 'Due Date', name: 'dueDate', type: 'date' },
              ].map(field => (
                <label key={field.name} className="block">
                  <span className="block text-sm font-medium">{field.label}</span>
                  <input
                    name={field.name}
                    type={field.type}
                    value={details[field.name as keyof InvoiceDetails]}
                    onChange={handleDetailChange}
                    required
                    className="mt-1 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 w-full"
                  />
                </label>
              ))}
            </div>
          </div>

          {/* Products Table */}
          <div className="space-y-4">
            <h3 className="font-medium">Products / Services</h3>
            <table className="w-full table-auto border border-gray-300 text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border px-3 py-2 text-left">Description</th>
                  <th className="border px-3 py-2 text-center">Qty</th>
                  <th className="border px-3 py-2 text-right">Rate (NPR)</th>
                  <th className="border px-3 py-2 text-right">Amount</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p, i) => (
                  <tr key={i} className="border-t">
                    <td className="px-3 py-2">
                      <input
                        name="description"
                        value={p.description}
                        onChange={e => handleProductChange(i, e)}
                        required
                        className="w-full p-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                      />
                    </td>
                    <td className="px-3 py-2">
                      <input
                        name="quantity"
                        type="number"
                        min="1"
                        value={p.quantity}
                        onChange={e => handleProductChange(i, e)}
                        required
                        className="w-16 p-1 border border-gray-300 rounded text-center focus:ring-2 focus:ring-blue-500"
                      />
                    </td>
                    <td className="px-3 py-2">
                      <input
                        name="rate"
                        type="number"
                        step="0.01"
                        value={p.rate}
                        onChange={e => handleProductChange(i, e)}
                        required
                        className="w-24 p-1 border border-gray-300 rounded text-right focus:ring-2 focus:ring-blue-500"
                      />
                    </td>
                    <td className="px-3 py-2 text-right">
                      {(p.quantity * p.rate).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-gray-100 font-semibold">
                  <td colSpan={3} className="px-3 py-2 text-right">
                    Total
                  </td>
                  <td className="px-3 py-2 text-right">
                    {total.toFixed(2)}
                  </td>
                </tr>
              </tfoot>
            </table>

            <button
              type="button"
              onClick={addProduct}
              className="bg-gray-200 text-gray-800 px-4 py-1 rounded hover:bg-gray-300 transition"
            >
              + Add Product
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Generate Invoice
          </button>
        </form>

        {/* === Invoice Preview === */}
        {showInvoice && (
          <div
            id="invoice-preview"
            className="bg-white p-8 rounded-md shadow-md space-y-6"
          >
            {/* Header */}
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold text-blue-600">Invoice</h1>
              <div className="text-sm text-right">
                <p>
                  <span className="font-medium">No:</span> {details.invoiceNo}
                </p>
                <p>
                  <span className="font-medium">Date:</span>{' '}
                  {new Date(details.invoiceDate).toLocaleDateString()}
                </p>
                <p>
                  <span className="font-medium">P.O.:</span> {details.poNumber}
                </p>
                <p>
                  <span className="font-medium">Due:</span>{' '}
                  {new Date(details.dueDate).toLocaleDateString()}
                </p>
              </div>
            </div>

            {/* Billing Info */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h2 className="font-semibold mb-1">Billed To:</h2>
                <p>{details.billToName}</p>
                <p>{details.billToAddress}</p>
                <p>{details.billToPhone}</p>
                <p>{details.billToEmail}</p>
              </div>
              <div className="text-right">
                <h2 className="font-semibold mb-1">From:</h2>
                <p className="font-medium">LotusSoft Pvt. Ltd.</p>
                <p>123 Tech Park, Kathmandu</p>
                <p>+977-9800000000</p>
                <p>info@lotussoft.com</p>
              </div>
            </div>

            {/* Items Table */}
            <table className="w-full table-auto text-sm border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border px-4 py-2 text-left">Description</th>
                  <th className="border px-4 py-2 text-center">Qty</th>
                  <th className="border px-4 py-2 text-right">Rate (NPR)</th>
                  <th className="border px-4 py-2 text-right">Amount</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p, i) => (
                  <tr key={i} className="border-t">
                    <td className="px-4 py-2">{p.description}</td>
                    <td className="px-4 py-2 text-center">{p.quantity}</td>
                    <td className="px-4 py-2 text-right">
                      {p.rate.toFixed(2)}
                    </td>
                    <td className="px-4 py-2 text-right">
                      {(p.quantity * p.rate).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-gray-100 font-semibold">
                  <td colSpan={3} className="px-4 py-2 text-right">
                    Total
                  </td>
                  <td className="px-4 py-2 text-right">
                    {total.toFixed(2)}
                  </td>
                </tr>
              </tfoot>
            </table>

            {/* Actions */}
            <div className="flex justify-end gap-4 no-print">
              <button
                onClick={printInvoice}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
              >
                Print Invoice
              </button>
              <button
                onClick={saveInvoice}
                className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
              >
                Save Invoice
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
